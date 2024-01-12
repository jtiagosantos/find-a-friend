import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Organization = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.organization;
});
