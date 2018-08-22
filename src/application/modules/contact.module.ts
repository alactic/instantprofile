import {Module} from '@nestjs/common';
import {ServiceController} from '../controllers/service.controller';
import {ServiceService} from '../services/service.service';
import {serviceProviders} from '../providers/service.provider';
import {portifolioProviders} from '../providers/portifolio.provider';
import {PortifolioService} from '../services/porttifolio.service';
import {PortifolioController} from '../controllers/portifolio.controller';
import {ContactController} from "../controllers/contact.controller";
import {ContactService} from "../services/contact.service";
import {contactProviders} from "../providers/contact.provider";

@Module({
    controllers: [ContactController],
    providers: [ContactService, ...contactProviders],
})
export class ContactModule {
}
