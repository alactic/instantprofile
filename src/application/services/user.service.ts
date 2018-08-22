import {HttpException, HttpStatus, Inject, Injectable, Res} from '@nestjs/common';
import {Model} from 'mongoose';
import {CreateUserDto, UpdateUserDto} from '../dto/user.dto';
import {genSalt, hash} from 'bcryptjs';

import {ModelName, SecreytKey} from '../utils/constants';
import {retrieveFromToken} from '../utils/retrieveFromToken';
import {User} from '../interfaces/user.interface';
import {myMail, new_user_message, subject} from "../utils/message";
import {sendmail} from "../utils/sendMail";

@Injectable()
export class UserService {
    constructor(@Inject(ModelName) private readonly userModel: Model<User>) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userModel.findOne({_id: createUserDto['_id']}).exec();
        if (!user) {
            const salt = await genSalt(10);
            createUserDto['password'] = await hash(createUserDto.password, salt);
            createUserDto['activate'] = false;
            createUserDto['admin1'] = false;
            createUserDto['admin2'] = false;
            sendmail(myMail, 'bluecard1992@yahoo.com', subject, new_user_message(createUserDto['username']));
            const createdUser = new this.userModel(createUserDto);
            return createdUser.save();
        } else {
            const update = await this.userModel.findOneAndUpdate({_id: createUserDto['_id']}, {
                $set: {
                    firstName: createUserDto['firstName'],
                    lastName: createUserDto['lastName'],
                    phone: createUserDto['phone'],
                    username: createUserDto['username'],
                    email: createUserDto['email'],
                    address: createUserDto['address'],
                    habit: createUserDto['habit'],
                    hobby: createUserDto['hobby'],
                    profession: createUserDto['profession'],
                },
            }, {new: true}).exec();
            return await update;
        }


    }

    async getAllUser(): Promise<any> {
        const users = await this.userModel.paginate({}, {page: 1, limit: 10});
        if (users) {
            return users;
        }
    }

    async findOneByUsername(username): Promise<any> {
        return await this.userModel.findOne({username: username}).exec();
    }

    async findUserByEmail(email): Promise<any> {
        return await this.userModel.findOne({email: email}).exec();
    }

    async updateUser(authorization: string, updateUserDto: UpdateUserDto) {
        const decoded = retrieveFromToken(authorization);
        const update = await this.userModel.findOneAndUpdate({email: decoded.email}, {
            $set: {
                firstName: updateUserDto['firstName'],
                lastName: updateUserDto['lastName'],
                phone: updateUserDto['phone'],
                username: updateUserDto['username'],
                email: updateUserDto['email'],
                address: updateUserDto['address'],
                habit: updateUserDto['habit'],
                hobby: updateUserDto['hobby'],
                profession: updateUserDto['profession'],
            },
        }, {new: true}).exec();
        return await update;
    }

    async toggleUser(updateUserDto: UpdateUserDto) {
        const user = await this.userModel.findOne({_id: updateUserDto['_id']}).exec();
        if (user) {
            const update = await this.userModel.findOneAndUpdate({_id: updateUserDto['_id']}, {
                $set: {
                    activate: !user['activate'],
                },
            }, {new: true}).exec();
            return await update;
        }
    }

    async toggleAdmin(updateUserDto: UpdateUserDto) {
        const user = await this.userModel.findOne({_id: updateUserDto['_id']}).exec();
        if (user) {
            const update = await this.userModel.findOneAndUpdate({_id: updateUserDto['_id']}, {
                $set: {
                    admin2: !user['admin2'],
                },
            }, {new: true}).exec();
            return await update;
        }
    }
}