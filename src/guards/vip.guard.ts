import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class VipGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const vip = request.userObj.vip;
    if (vip && vip !== null && typeof vip !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }
}
