import { Module } from '@nestjs/common';
import { ClientController } from '../controllers/client.controller';
import {ClientService} from '../services/client.service';
import {clientProviders} from '../providers/client.provider';
import {UserModule} from "./user.module";

@Module({
  controllers: [ClientController],
    imports: [UserModule],
    providers: [ClientService, ...clientProviders],
})
export class ClientModule {}
