import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'NumberStringValidator', async: false })
export class NumberStringValidator implements ValidatorConstraintInterface {
  validate(idade: number) {
    return !isNaN(idade);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} query param must be a number`;
  }
}
