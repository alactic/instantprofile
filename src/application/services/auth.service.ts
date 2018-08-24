import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {UserService} from './user.service';
import {Model} from 'mongoose';
import * as jwt from 'jsonwebtoken';
import {User} from '../interfaces/user.interface';
import {ModelName, SecreytKey} from '../utils/constants';
import {CreateTokenDto} from '../dto/auth.dto';
import {compare} from 'bcryptjs';
import {genSalt, hash} from 'bcryptjs';
import {JwtPayload} from '../jwt/jwt-payload.interface';
import {myMail, new_user_message, password_reset_message, resetSubject, subject} from "../utils/message";
import {sendmail} from "../utils/sendMail";

@Injectable()
export class AuthService {
    constructor(@Inject(ModelName) private readonly userModel: Model<User>,
                private readonly usersService: UserService) {
    }

    async createToken(createtokendto: any): Promise<any> {
        const user = await this.userModel.findOne({email: createtokendto.email}).exec();
        const isMatch = await compare(createtokendto.password, user['password']);
        if (isMatch) {
            if (user['activate']) {
                return await this.signJWT(user);
            } else {
                throw new HttpException('This User was disabled. Please contact the admin', HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
        }
    }

    async resetPassword(createtokendto: any): Promise<any> {
        const user = await this.userModel.findOne({email: createtokendto.email}).exec();
        if (user) {
            if (user['activate']) {
                const payload = {email: user['email'], _id: user['_id']};
                const token = jwt.sign(payload, SecreytKey, {expiresIn: 3600});
                const recoveryMessage = createtokendto['path'] + token;
                sendmail(myMail, user['email'], resetSubject, password_reset_message(recoveryMessage));
                return await this.signJWT(user);
            } else {
                throw new HttpException('This User was disabled. Please contact the admin', HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new HttpException('The User does not exist', HttpStatus.BAD_REQUEST);
        }
    }

    async recoverPassword(createtokendto: any): Promise<any> {
        const decodedToken = jwt.verify(createtokendto['token'], SecreytKey);
        const user = await this.userModel.findOne({email: decodedToken['email']}).exec();
        if (user) {
            if (user['activate']) {
                const salt = await genSalt(10);
                const update = await this.userModel.findOneAndUpdate({_id: user['_id']}, {
                    $set: {
                        password: await hash(createtokendto['password'], salt),
                    },
                }, {new: true}).exec();
                return await update;
            } else {
                throw new HttpException('This User was disabled. Please contact the admin', HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new HttpException('The User does not exist', HttpStatus.BAD_REQUEST);
        }
    }

    async signJWT(user) {
        const payload = {email: user['email'], _id: user['_id']};
        const token = jwt.sign(payload, SecreytKey, {expiresIn: 3600});
        const updatedUser = await this.userModel.findOneAndUpdate({email: user['email']}, {$set: {token: token}}, {new: true}).exec();

        return updatedUser;
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findUserByEmail(payload.email);
    }

    addAudit(record: any) {
        
    }
}
