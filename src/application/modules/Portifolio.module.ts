import {Module} from '@nestjs/common';
import {ServiceController} from '../controllers/service.controller';
import {ServiceService} from '../services/service.service';
import {serviceProviders} from '../providers/service.provider';
import {categoryProviders, portifolioProviders} from '../providers/portifolio.provider';
import {PortifolioService} from '../services/porttifolio.service';
import {PortifolioController} from '../controllers/portifolio.controller';
import {UserModule} from "./user.module";

@Module({
    controllers: [PortifolioController],
    imports: [UserModule],
    providers: [PortifolioService, ...portifolioProviders, ...categoryProviders],
})
export class PortifolioModule {
}
