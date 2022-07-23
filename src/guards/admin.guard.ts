import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const admin = request.userObj.admin;
    if (admin && admin !== null && typeof admin !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }
}
