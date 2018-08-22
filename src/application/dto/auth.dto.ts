import {ApiModelProperty} from '@nestjs/swagger';

export class CreateTokenDto {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;
}