import { HttpException, HttpStatus } from '@nestjs/common';

export class OrganizationAlreadyExistsException extends HttpException {
  constructor() {
    super('Already exists an organization with the same email', HttpStatus.CONFLICT);
  }
}
