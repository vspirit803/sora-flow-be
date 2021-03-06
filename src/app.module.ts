import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountsModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationRecordCollectionTasksModule } from './application-record-collection-tasks/application-record-collection-tasks.module';
import { ApplicationRecordsModule } from './application-records/application-records.module';
import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './departments/departments.module';
import { MenusModule } from './menus/menus.module';
import { LoggerLoginMiddleware } from './Middlewares/logger.login.middleware';
import { LoggerMiddleware } from './Middlewares/logger.middleware';
import { OperateLogsModule } from './operate-logs/operate-logs.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ProfileModule } from './profile/profile.module';
import { RolesModule } from './roles/roles.module';
import { TasksModule } from './tasks/tasks.module';
import { VersionsModule } from './versions/versions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
    }),
    AccountsModule,
    AuthModule,
    RolesModule,
    MenusModule,
    OperateLogsModule,
    OrganizationsModule,
    VersionsModule,
    ProfileModule,
    ApplicationsModule,
    ApplicationRecordsModule,
    DepartmentsModule,
    TasksModule,
    ApplicationRecordCollectionTasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(LoggerLoginMiddleware).forRoutes('auth/login');
  }
}
