import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {Client} from '../interfaces/client.interface';
import {ClientModelName} from '../utils/constants';
import {Model} from 'mongoose';
import {CreateClientDto} from '../dto/client.dto';
import {retrieveFromToken} from '../utils/retrieveFromToken';

@Injectable()
export class ClientService {
    constructor(@Inject(ClientModelName) private readonly clientModel: Model<Client>) {
    }

    async create(createClientDto: CreateClientDto, authorization): Promise<Client> {
        const decoded = retrieveFromToken(authorization);
        createClientDto['userId'] = decoded._id;
        const user = await this.clientModel.find({userId: decoded._id});
        console.log('user data :: ', user);
        if (user && user.length > 0) {
            const updatedUser = await this.clientModel.findOneAndUpdate({userId: decoded._id}, {
                $set: {
                    'client': createClientDto.client,
                },
            }, {new: true});
            return updatedUser;
            throw new HttpException('Client already exist, Kindly update if you want to make changes', HttpStatus.BAD_REQUEST);
        } else {
            const createdClient = new this.clientModel(createClientDto);
            return await createdClient.save();
        }
    }

    async getClient(id): Promise<Client> {
        return await this.clientModel.find({userId: id});
    }
}
