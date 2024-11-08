import { ExecutionContext, Injectable, UnauthorizedException, Logger, LoggerService, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorator/public.decorator';
import { ROLES_KEY } from 'src/common/decorator/role.decorator';
import { Role } from 'src/user/enum/user.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UserService,
    @Inject(Logger) private logger: LoggerService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const http = context.switchToHttp();
    const { url, headers } = http.getRequest<Request>();
    const token = headers.authorization?.split(' ')[1];
    const decoded = this.jwtService.decode(token);

    if (url !== '/api/auth/refresh' && decoded['tokenType'] === 'refresh') {
      const error = new UnauthorizedException('access token is required');
      this.logger.error(error.message, error.stack);
      throw error;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles) {
      const userId = decoded['sub'];
      return this.userService.checkUserIsAdmin(userId);
    }

    return super.canActivate(context);
  }
}
