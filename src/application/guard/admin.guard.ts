import {Injectable, CanActivate, ExecutionContext, HttpStatus, HttpException} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        if (request['user']['admin1'] || request['user']['admin2'] || request['body']['admin1'] || request['body']['admin2']) {
            return true;
        } else {
            throw new HttpException('Unauthorize access to this page', HttpStatus.FORBIDDEN)
            return false;
        }
    }

    validateRequest(request) {
        console.log('validate auth :: ', request);
        return true;
    }
}