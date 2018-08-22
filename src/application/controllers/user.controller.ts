import {Body, Controller, Get, Post, Put, Req, Res, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {CreateTokenDto} from '../dto/auth.dto';
import {CreateUserDto, UpdateUserDto} from '../dto/user.dto';
import {pick} from 'lodash';
import {ApiUseTags} from '@nestjs/swagger';

import {nodemailer} from 'nodemailer';
import {AdminGuard} from "../guard/admin.guard";
import {AuditInterceptor} from "../interceptor/audit.interceptor";

@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userservice: UserService,
                private readonly authservice: AuthService) {
    }

    @Get('all')
   // @UseInterceptors(AuditInterceptor)
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    findAll(@Res() res, @Req() req) {
        this.userservice.getAllUser().then(response => {
            // const feedback = pick(response, ['firstName', 'lastName', 'middleName', 'phone', 'username', 'email', 'profession', '_id'])
            res.status(200).send(response);

        }).catch(error => {
            res.status(400).send(error);
        });
    }

    @Get()
    // @UseGuards(AuthGuard('jwt'))
    findUser(@Res() res, @Req() req) {
        this.userservice.findOneByUsername(req.headers.portaluser).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

    @Get('user')
    findUserClient(@Res() res, @Req() req) {
        this.userservice.findOneByUsername(req.headers.named).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

    @Post()
    createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
        this.userservice.create(createUserDto).then((response) => {
            const feedback = pick(response, ['firstName', 'lastName', 'middleName', 'phone', 'username', 'email', 'profession', '_id']);
            res.status(200).send(feedback);
        }).catch((error) => {
            if (error && error.code === 11000) {
                res.status(400).send({message: `${createUserDto.email} already exist`});
            } else {
                res.status(400).send({message: error.message});
            }
        });
    }

    @Put()
    @UseGuards(AuthGuard('jwt'))
    updateUser(@Body() updateUserDto: UpdateUserDto, @Res() res, @Req() req) {
        this.userservice.updateUser(req.headers.authorization, updateUserDto).then(response => {
            res.status(200).send(response);

        }).catch(error => {
            res.status(400).send(error);
        });
    }

    @Put('toggle')
    @UseGuards(AuthGuard('jwt'))
    toggleUser(@Body() updateUserDto: UpdateUserDto, @Res() res, @Req() req) {
        this.userservice.toggleUser(updateUserDto).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

    @Put('admin')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    adminUser(@Body() updateUserDto: UpdateUserDto, @Res() res, @Req() req) {
        this.userservice.toggleAdmin(updateUserDto).then(response => {
            res.status(200).send(response);

        }).catch(error => {
            res.status(400).send(error);
        });
    }
}
