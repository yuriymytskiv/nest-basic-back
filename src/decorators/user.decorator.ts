import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserObj = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.userObj;
    if (user !== null && user !== 'undefined') {
      return user;
    } else {
      return null;
    }
  },
);
