import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UsernameMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded: any = this.jwtService.decode(token);
    req['userObj'] = decoded;
    next();
  }
}
