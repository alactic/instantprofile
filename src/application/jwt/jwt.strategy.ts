import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, RequestTimeoutException, UnauthorizedException} from '@nestjs/common';
import {JwtPayload} from "./jwt-payload.interface";
import {SecreytKey} from "../utils/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: SecreytKey,
        });
    }

    async validate(payload: JwtPayload, done) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            return done(new RequestTimeoutException(), false);
        }

        done(null, user);
    }
}