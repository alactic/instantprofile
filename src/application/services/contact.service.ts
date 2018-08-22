import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {ContactModelName, PortifolioModelName, ServiceModelName} from '../utils/constants';
import {Model} from 'mongoose';
import {CreateServiceDto} from '../dto/service.dto';
import {Service} from '../interfaces/service.interface';
import {retrieveFromToken} from '../utils/retrieveFromToken';
import {Contact} from '../interfaces/contact.interface';
import {CreateContactDto} from '../dto/contact.dto';

@Injectable()
export class ContactService {
    constructor(@Inject(ContactModelName) private readonly contactModel: Model<Contact>) {
    }

    async create(createContactDto: CreateContactDto): Promise<Service> {
            const createdContact = new this.contactModel(createContactDto);
            return await createdContact.save();
    }
}
