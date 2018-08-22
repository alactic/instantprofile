import {ApiModelProperty} from '@nestjs/swagger';

export class CreatePortifolioDto {
    @ApiModelProperty({type: Object, isArray: true})
    portifolio: any;
}

export class AddCategory {
    @ApiModelProperty()
    category: string;
}

class UpdatePortifolioDto {
    @ApiModelProperty()
    image_name: string;
}
