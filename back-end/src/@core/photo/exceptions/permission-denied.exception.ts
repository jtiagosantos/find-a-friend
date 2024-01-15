import { HttpException, HttpStatus } from '@nestjs/common';

export class PermissionDeniedException extends HttpException {
  constructor() {
    super('Permission denied', HttpStatus.FORBIDDEN);
  }
}
