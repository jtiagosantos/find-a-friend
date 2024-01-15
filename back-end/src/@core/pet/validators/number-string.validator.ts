import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'idadeValida', async: false })
export class NumberStringValidator implements ValidatorConstraintInterface {
  validate(idade: number) {
    return !isNaN(idade);
  }

  defaultMessage() {
    return 'age query param must be a number';
  }
}
