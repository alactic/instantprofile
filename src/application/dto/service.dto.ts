import {ApiModelProperty} from '@nestjs/swagger';

export class CreateServiceDto {
    @ApiModelProperty({type: Object, isArray: true})
    service: any;
}

class UpdateServiceDto {
    @ApiModelProperty()
    image_name: string;
}
