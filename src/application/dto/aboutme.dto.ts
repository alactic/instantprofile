import {ApiModelProperty} from "@nestjs/swagger";

export class CreateAboutMeDto {
    @ApiModelProperty()
     profile_image: string;

    @ApiModelProperty()
     cv: string;

    @ApiModelProperty()
    readonly profession: string;

    @ApiModelProperty()
    readonly city: string;

    @ApiModelProperty()
    readonly state: string;

    @ApiModelProperty()
    readonly country: string;

    @ApiModelProperty()
    readonly dob: string;

    @ApiModelProperty()
    readonly short_description: string;

    @ApiModelProperty()
    readonly about_me: string;

    @ApiModelProperty({type: String, isArray: true})
    readonly hobby: any;

    @ApiModelProperty()
    education: [{
        name: string;
    }];

    @ApiModelProperty()
    experience: [{
        name: string;
    }];

    @ApiModelProperty()
    skill: [{
        name: string;
    }];
}


export class UpdateAboutMeDto {
    @ApiModelProperty()
    readonly profession: string;

    @ApiModelProperty()
    readonly city: string;

    @ApiModelProperty()
    readonly state: string;

    @ApiModelProperty()
    readonly country: string;

    @ApiModelProperty()
    readonly dob: string;

    @ApiModelProperty()
    readonly short_description: string;

    @ApiModelProperty()
    readonly about_me: string;

    @ApiModelProperty({type: String, isArray: true})
    readonly hobby: any;

    @ApiModelProperty()
    education: [{
        name: string;
    }];

    @ApiModelProperty()
    experience: [{
        name: string;
    }];

    @ApiModelProperty()
    skill: [{
        name: string;
    }];
}
