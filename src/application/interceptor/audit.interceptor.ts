import {Injectable, NestInterceptor, ExecutionContext, Inject} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {AuthService} from "../services/auth.service";
import { map } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    constructor(private readonly authservice: AuthService){}
    intercept(
        context: ExecutionContext,
        call$: Observable<any>,
    ): Observable<any> {
        /*const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        // console.log('Before request :: ', request['user']);
        console.log('Before response :: ', response['req']['route']);

        const now = Date.now();
        this.addAudit(response['req']);
        return call$.pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
        );*/
        return call$.pipe(map(data => (this.addAudit(data))));
    }

    addAudit(record) {
      //  console.log('record :: ', record);
        /*this.authservice.addAudit(record).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });*/
    }
}
