import {Body, Controller, Post, Res} from '@nestjs/common';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {CreateTokenDto} from '../dto/auth.dto';
import {ApiUseTags} from '@nestjs/swagger';

import {pick} from 'lodash';

@ApiUseTags('login')
@Controller('login')
export class AuthController {
    constructor(private readonly userservice: UserService,
                private readonly authservice: AuthService) {
    }

    @Post()
    findByEmail(@Res() res, @Body() createtokendto: CreateTokenDto) {
        this.authservice.createToken(createtokendto).then(response => {
            if (response.isArray && response.length === 0) {
                res.status(400).send({message: 'Invalid Credentials'});
            } else {
                const feedback = pick(response, ['firstName', 'lastName', 'username', 'middleName', 'phone', 'email', 'profession']);
                res.status(200).send({payload: feedback, token: response['token']});
            }
        }).catch(error => {
            res.status(400).send(error);
        });
    }

    @Post('reset')
    resetPassword(@Res() res, @Body() createtokendto: CreateTokenDto) {
        this.authservice.resetPassword(createtokendto).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

    @Post('recover')
    recoverPassword(@Res() res, @Body() createtokendto: CreateTokenDto) {
        this.authservice.recoverPassword(createtokendto).then(response => {
            console.log('recover response :: ', response)
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
}
