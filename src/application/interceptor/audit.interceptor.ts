import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        call$: Observable<any>,
    ): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        // console.log('Before request :: ', request['user']);
        console.log('Before response :: ', response['req']['route']);

        const now = Date.now();
        return call$.pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
        );
    }
}