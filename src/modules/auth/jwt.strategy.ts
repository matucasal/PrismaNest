import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable,UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserService } from '../users/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  
  async validate(payload: any, done): Promise<boolean> {
    
    const user = await this.usersService.findOne(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    
    // Make a new user payload with roles []
    const userPayload =  { userId: user.id, username: user.username, roles:[user.role] };
    done(null, userPayload);
    return true;
  }
}