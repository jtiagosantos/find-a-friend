import { HttpException, HttpStatus } from '@nestjs/common';

export class PetNotFoundException extends HttpException {
  constructor() {
    super('Pet not found', HttpStatus.NOT_FOUND);
  }
}
