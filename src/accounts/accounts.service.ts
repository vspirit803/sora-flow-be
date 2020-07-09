import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizationsService } from 'src/organizations/organizations.service';

import { Account } from './account.schema';
import {
  CreateAccountDto,
  DeleteAccountDto,
  QueryAccountDto,
  UpdateAccountDto,
} from './dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('Account') private accountModel: Model<Account>,
    @Inject(forwardRef(() => OrganizationsService))
    private readonly organizationsService: OrganizationsService,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const {
      organizationId,
      roles = [],
      organizations,
      ...others
    } = createAccountDto;
    const createdAccount = new this.accountModel(others);
    if (organizations) {
      createdAccount.organizations = organizations;
    } else {
      createdAccount.organizations = [
        {
          id: organizationId,
          roles,
        },
      ];
    }
    return createdAccount.save();
  }

  async updateOne(updateAccountDto: UpdateAccountDto);
  async updateOne(updateAccountDto: UpdateAccountDto, organizationId: string);
  async updateOne(updateAccountDto: UpdateAccountDto, organizationId?: string) {
    const { id, roles = [], ...others } = updateAccountDto;
    await this.accountModel.updateOne({ id }, others);
    //更新角色
    if (roles && organizationId) {
      await this.accountModel.updateOne(
        { id, 'organizations.id': organizationId },
        { $set: { 'organizations.$.roles': roles } },
      );
    }
  }

  /**
   * 指定账号加入指定组织
   * @param id 账号id
   * @param organizationId 组织id
   * @param roles 角色id列表
   */
  async joinOrganization(
    id: string,
    organizationId: string,
    roles: Array<string>,
  ) {
    await this.accountModel.updateOne(
      { id },
      { $addToSet: { organizations: { id: organizationId, roles } } },
    );
    await this.organizationsService.addMember(organizationId);
  }

  /**
   * 指定账号退出指定组织
   * @param id 账号id
   * @param organizationId 组织id
   */
  async leaveOrganization(id: string, organizationId: string) {
    await this.accountModel.updateOne(
      { id },
      { $pull: { organizations: { id: organizationId } } },
    );
    await this.organizationsService.removeMember(organizationId);
  }

  async addRole(id: string, organizationId: string, roleId: string) {
    const account = await this.findOne(id);
    if (account.organizations.find((each) => each.id === organizationId)) {
      return this.accountModel.updateOne(
        { id, 'organizations.id': organizationId },
        { $addToSet: { 'organizations.$.roles': roleId } },
      );
    } else {
      return this.joinOrganization(id, organizationId, [roleId]);
    }
  }

  async removeRole(id: string, organizationId: string, roleId: string) {
    const account = await this.findOne(id);
    if (!account) {
      return;
    }
    if (account.organizations.find((each) => each.id === organizationId)) {
      return this.accountModel.updateOne(
        { id, 'organizations.id': organizationId },
        { $pull: { 'organizations.$.roles': roleId } },
      );
    }
  }

  async deleteOne({ id }: DeleteAccountDto) {
    const account = await this.findOne(id);
    //管理的组织
    const superviseOrganizations = await this.organizationsService.findAll({
      supervisorId: id,
    });
    if (superviseOrganizations.length) {
      throw new HttpException(
        `[${account.name}] - [${
          account.nickname
        }]还有管理的的组织${superviseOrganizations
          .map((each) => `[${each.name}]`)
          .join('/')},无法删除该账号`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const organizationIdList = account.organizations.map((each) => each.id);
    await this.organizationsService.deleteAccount(organizationIdList);
    await this.accountModel.deleteOne({ id });
  }

  async findAll(
    query: QueryAccountDto,
    organizationId?: string,
  ): Promise<Account[]> {
    if (!organizationId) {
      return this.accountModel
        .find(query)
        .select({ organizations: false })
        .exec();
      // return this.accountModel.find(query).populate('organizationList').exec();
    }
    return this.accountModel
      .aggregate([
        { $match: query },
        { $unwind: '$organizations' },
        {
          $match: { 'organizations.id': organizationId },
        },
        { $addFields: { roles: '$$ROOT.organizations.roles' } },
        {
          $project: {
            _id: false,
            __v: false,
            password: false,
            organizations: false,
          },
        },
        {
          $lookup: {
            from: 'roles',
            localField: 'roles',
            foreignField: 'id',
            as: 'roles',
          },
        },
        {
          $project: {
            'roles.authorizedOperations': false,
            'roles.organizationId': false,
            'roles.type': false,
            'roles.__v': false,
            'roles._id': false,
          },
        },
      ])
      .exec();
  }

  async findOneByNamePassword(
    name: string,
    password: string,
  ): Promise<Account | undefined> {
    return this.accountModel.findOne({ name, password }).exec();
  }

  async findOne(id: string): Promise<Account | undefined> {
    const account = await this.accountModel
      .findOne({ id })
      .populate('organizationList')
      .populate('organizationRolesList')
      .exec();
    return account;
  }

  async deleteOrganization(id: string) {
    await this.accountModel.updateMany(
      {},
      { $pull: { organizations: { id } } },
    );
  }
}
