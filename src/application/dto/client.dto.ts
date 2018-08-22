import {ApiModelProperty} from '@nestjs/swagger';

export class CreateClientDto {
    @ApiModelProperty({type: Object, isArray: true})
    client: any;
}

export class UpdateClientDto {
    @ApiModelProperty({type: Object, isArray: true})
    client: any;
}
