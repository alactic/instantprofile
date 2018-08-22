import {ApiModelProperty} from '@nestjs/swagger';

export class CreateContactDto {
    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    subject: string;

    @ApiModelProperty()
    name: string;

    @ApiModelProperty()
    message: string;
}

class UpdateContactDto {
    @ApiModelProperty()
    image_name: string;
}
