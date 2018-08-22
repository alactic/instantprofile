import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {retrieveFromToken} from '../utils/retrieveFromToken';
import {Aboutme} from '../interfaces/aboutme.interface';
import {CreateAboutMeDto, UpdateAboutMeDto} from '../dto/aboutme.dto';
import {AboutModelName} from '../utils/constants';
import * as fs from 'fs';

@Injectable()
export class AboutmeService {
    constructor(@Inject(AboutModelName) private readonly aboutModel: Model<Aboutme>) {
    }

    async create(createAboutmeDto: CreateAboutMeDto, authorization): Promise<Aboutme> {
        const decoded = retrieveFromToken(authorization);
        createAboutmeDto['userId'] = decoded._id;
        const user = await this.aboutModel.find({userId: decoded._id});
        if (user && user.length > 0 ) {
            const updatedUser = await this.aboutModel.findOneAndUpdate({userId: decoded._id}, {
                $set: {
                    'profession': createAboutmeDto.profession,
                    'city': createAboutmeDto.city,
                    'state': createAboutmeDto.state,
                    'country': createAboutmeDto.country,
                    'dob': createAboutmeDto.dob,
                    'short_description': createAboutmeDto.short_description,
                    'about_me': createAboutmeDto.about_me,
                    'hobby': createAboutmeDto.hobby,
                    'education': createAboutmeDto.education,
                    'skill': createAboutmeDto.skill,
                    'experience': createAboutmeDto.experience,
                },
            }, {new: true});
            return updatedUser;
        } else {
            const createdUser = new this.aboutModel(createAboutmeDto);
            return await createdUser.save();
        }
    }

    async updateCV(createAboutmeDto: CreateAboutMeDto, authorization): Promise<Aboutme> {
        const decoded = retrieveFromToken(authorization);
        createAboutmeDto['userId'] = decoded._id;
        const user = await this.aboutModel.find({userId: decoded._id});
        if (user && user.length > 0 ) {
            const updatedUser = await this.aboutModel.findOneAndUpdate({userId: decoded._id}, {
                $set: {
                    'cv': createAboutmeDto['cv'],
                },
            }, {new: true});
            return updatedUser;
        } else {
            const createdUser = new this.aboutModel(createAboutmeDto);
            return await createdUser.save();
        }
    }

    async updateProfileImage(createAboutmeDto: CreateAboutMeDto, authorization): Promise<Aboutme> {
        const decoded = retrieveFromToken(authorization);
        createAboutmeDto['userId'] = decoded._id;
        const user = await this.aboutModel.find({userId: decoded._id});
        if (user && user.length > 0 ) {
            const path = './src/public/uploads/' + user['profile_image'];
            if (fs.existsSync(path)) {
                fs.unlinkSync('./src/public/uploads/' + user['profile_image']);
            }
            const updatedUser = await this.aboutModel.findOneAndUpdate({userId: decoded._id}, {
                $set: {
                    'profile_image': createAboutmeDto['profile_image'],
                },
            }, {new: true});
            return updatedUser;
        } else {
            const createdUser = new this.aboutModel(createAboutmeDto);
            return await createdUser.save();
        }
    }

    async update(updateAboutmeDto: UpdateAboutMeDto, userId): Promise<Aboutme> {
        // const decoded = retrieveFromToken(authorization);
        const user_Id = await this.aboutModel.find({userId});
        if (user_Id) {
            const updatedUser = await this.aboutModel.findOneAndUpdate({user_Id}, {
                $set: {
                    'profession': updateAboutmeDto.profession,
                    'city': updateAboutmeDto.city,
                    'state': updateAboutmeDto.state,
                    'country': updateAboutmeDto.country,
                    'dob': updateAboutmeDto.dob,
                    'short_description': updateAboutmeDto.short_description,
                    'about_me': updateAboutmeDto.about_me,
                    'hobby': updateAboutmeDto.hobby,
                    'education': updateAboutmeDto.education,
                },
            }, {new: true});
            return updatedUser;
        } else {
            throw new HttpException('User does not Exist',  HttpStatus.BAD_REQUEST);
        }
    }

    async getById(_id): Promise<Aboutme> {
        // const decoded = retrieveFromToken(authorization);
        const user = await this.aboutModel.find({userId: _id});
        if (user) {
            return await this.aboutModel.findOne({userId: _id});
        } else {
            throw new HttpException('User does not Exist', HttpStatus.BAD_REQUEST);
        }
    }

    async getUser(authorization): Promise<Aboutme> {
        const decoded = retrieveFromToken(authorization);
        return await this.aboutModel.find({userId: decoded._id});
        /*if (user) {
            console.log('user :: ', user);
            return await this.aboutModel.find();
        }*/
    }
}