import {ApiModelProperty} from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty()
    readonly firstName: string;

    @ApiModelProperty()
    readonly lastName: string;

    @ApiModelProperty()
    readonly middleName: string;

    @ApiModelProperty()
    readonly phone: string;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    password: string;

    @ApiModelProperty()
    readonly profession: string;

    @ApiModelProperty()
    readonly username: string;

    @ApiModelProperty()
    readonly address: string;

    @ApiModelProperty()
    readonly habit: string;

    @ApiModelProperty()
     image_name: string;

    @ApiModelProperty()
     image_id: string;

    @ApiModelProperty()
     activate: boolean;

    @ApiModelProperty()
     admin1: boolean;

    @ApiModelProperty()
     admin2: boolean;

    @ApiModelProperty({type: String, isArray: true})
    readonly hobby: any;
}


export class UpdateUserDto {
    @ApiModelProperty()
    readonly firstName: string;

    @ApiModelProperty()
    readonly lastName: string;

    @ApiModelProperty()
    readonly middleName: string;

    @ApiModelProperty()
    readonly phone: string;

    @ApiModelProperty()
    readonly profession: string;
}