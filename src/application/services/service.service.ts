import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {ServiceModelName} from '../utils/constants';
import {Model} from 'mongoose';
import {CreateServiceDto} from '../dto/service.dto';
import {Service} from '../interfaces/service.interface';
import * as fs from 'fs';
import {retrieveFromToken} from '../utils/retrieveFromToken';

import * as cloudinary from 'cloudinary';
import {async} from "rxjs/internal/scheduler/async";
import {CloudinaryuploadService} from "./cloudinaryupload.service";

@Injectable()
export class ServiceService {
    constructor(@Inject(ServiceModelName) private readonly serviceModel: Model<Service>) {
        cloudinary.config({
            cloud_name: 'softloft',
            api_key: 314466682599661,
            api_secret: 'o_fyN55i7DXY4lSt6a4QN2CpGH8',
        });
    }

    async create(createServiceDto: CreateServiceDto, authorization): Promise<Service> {
        const decoded = retrieveFromToken(authorization);
        createServiceDto['userId'] = decoded._id;
        const service = await this.serviceModel.findOne({userId: decoded._id});
        if (service) {
            service.service.forEach((value, i) => {
                value['name'] = createServiceDto['service'][i]['name'];
                value['description'] = createServiceDto['service'][i]['description'];
            });
            const updatedUser = await this.serviceModel.findOneAndUpdate({userId: decoded._id}, {
                $set: {
                    'service': service.service,
                },
            }, {new: true});
            return updatedUser;
        } else {
            const createdService = new this.serviceModel(createServiceDto);
            return await createdService.save();
        }
    }

    async getService(id): Promise<Service> {
        return await this.serviceModel.find({userId: id});
    }

    async getServiceUser(authorization: string) {
        const decoded = retrieveFromToken(authorization);
        return await this.serviceModel.find({userId: decoded._id});
    }

    async updateImage(createServiceDto, authorization: string, file) {
        const index = +createServiceDto['data'];
        const decoded = retrieveFromToken(authorization);
        const service = await this.serviceModel.findOne({userId: decoded._id});

        let count = 0;
        if (!service) {
            const createdService = new this.serviceModel(createServiceDto);
            return await createdService.save();
        } else {
            service.service.forEach((value, i) => {
                if (i === index) {
                    cloudinary.v2.uploader.destroy(value['image_id'],
                        (error, result) => {
                            console.log('result :: ', result, 'error :: ', error)
                        });
                    value['image_name'] = createServiceDto['image_name'];
                    value['image_id'] = createServiceDto['image_id'];
                }
            });
            const updatedUser = await this.serviceModel.findOneAndUpdate({userId: decoded._id}, {
                $set: {
                    'service': service.service,
                },
            }, {new: true});
            return updatedUser;
        }
    }
}
