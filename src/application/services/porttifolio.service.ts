import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {CategoryModelName, PortifolioModelName, ServiceModelName} from '../utils/constants';
import {Model} from 'mongoose';
import * as fs from 'fs';
import {CreateServiceDto} from '../dto/service.dto';
import {Service} from '../interfaces/service.interface';
import {retrieveFromToken} from '../utils/retrieveFromToken';
import {Category, Portifolio} from '../interfaces/portifolio.interface';
import {AddCategory, CreatePortifolioDto} from '../dto/portifolio.dto';

@Injectable()
export class PortifolioService {
    constructor(@Inject(PortifolioModelName) private readonly portifolioModel: Model<Portifolio>,
                @Inject(CategoryModelName) private readonly categoryModel: Model<Category>) {
    }

    async create(createPortifolioDto: CreatePortifolioDto, authorization): Promise<Portifolio> {
        const decoded = retrieveFromToken(authorization);
        createPortifolioDto['userId'] = decoded._id;
        const portifolio = await this.portifolioModel.findOne({userId: decoded._id});
        if (portifolio) {
            portifolio.portifolio.forEach((value, i) => {
                value['project_name'] = createPortifolioDto['portifolio'][i]['project_name'];
                value['categoryId'] = createPortifolioDto['portifolio'][i]['categoryId'];
            })
            const updatedUser = await this.portifolioModel.findOneAndUpdate({userId: decoded._id}, {
                $set: {
                    'portifolio': portifolio.portifolio,
                },
            }, {new: true});
            return updatedUser;
        } else {
            const createdPortifolio = new this.portifolioModel(createPortifolioDto);
            return await createdPortifolio.save();
        }
    }

    async addCategory(addCategory: AddCategory, authorization): Promise<Category> {
        const decoded = retrieveFromToken(authorization);
        addCategory['userId'] = decoded._id;
        // const user = await this.portifolioModel.find({userId: decoded._id});
        const createdCategory = new this.categoryModel(addCategory);
        return await createdCategory.save();
    }

    async getCategory(authorization): Promise<Category> {
        const decoded = retrieveFromToken(authorization);
        const category = await this.categoryModel.find({userId: decoded._id});
        if (category) {
            return await this.categoryModel.find();
        }
    }

    async getPortifolio(authorization): Promise<Portifolio> {
        const decoded = retrieveFromToken(authorization);
        return await this.portifolioModel.find({userId: decoded._id});
    }

    async getCategoryUser(id): Promise<Category> {
        return await this.categoryModel.find({userId: id});
    }

    async getPortifolioUser(id): Promise<Portifolio> {
        //  return await this.categoryModel.find({userId: id});
        return await this.portifolioModel.find({userId: id}).populate('portifolio.categoryId');
    }

    async updateImage(createPortfilioDto, authorization: string) {
        const index = +createPortfilioDto['data'];
        const decoded = retrieveFromToken(authorization);
        const portifolio = await this.portifolioModel.findOne({userId: decoded._id});
        if (!portifolio) {
            const createdPortifilio = new this.portifolioModel(createPortfilioDto);
            return await createdPortifilio.save();
        } else {
            portifolio.portifolio.forEach((value, i) => {
                if (i === index) {
                    const path = './src/public/uploads/' + value['image_name'];
                    if (fs.existsSync(path)) {
                        fs.unlinkSync('./src/public/uploads/' + value['image_name']);
                        value['image_name'] = createPortfilioDto['image'];
                    } else {
                        value['image_name'] = createPortfilioDto['image'];
                    }
                }
            });
            const updatedPortifilio = await this.portifolioModel.findOneAndUpdate({userId: decoded._id}, {
                $set: {
                    'portifolio': portifolio.portifolio,
                },
            }, {new: true});
            return updatedPortifilio;
        }
    }
}
