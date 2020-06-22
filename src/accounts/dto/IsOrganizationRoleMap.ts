import {
  isMongoId,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsOrganizationRoleMap implements ValidatorConstraintInterface {
  validate(item) {
    if (typeof item !== 'object') {
      return false;
    }
    for (const key in item) {
      if (!isMongoId(key)) {
        return false;
      }
      if (!Array.isArray(item[key])) {
        return false;
      }
      if (!item[key].every((each) => isMongoId(each))) {
        return false;
      }
    }
    return true;
  }
}
