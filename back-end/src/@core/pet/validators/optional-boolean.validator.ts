import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'OptionalBooleanValidator', async: false })
export class OptionalBooleanValidator implements ValidatorConstraintInterface {
  validate(value: boolean | undefined) {
    const isBooleanValue = typeof value === 'boolean';
    const isUndefinedValue = typeof value === 'undefined';

    return isUndefinedValue || isBooleanValue;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a boolean`;
  }
}
