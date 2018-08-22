import {
    Body, Controller, FileInterceptor, FilesInterceptor, Get, HttpException, Post, Req, Res, UploadedFile,
    UploadedFiles, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ServiceService} from '../services/service.service';
import {AuthGuard} from '@nestjs/passport';
import {CreateServiceDto} from '../dto/service.dto';
import {ApiUseTags} from '@nestjs/swagger';
import {diskStorage, multer} from 'multer';
import {UserService} from '../services/user.service';
import {cloud} from '../utils/cloudinary-upload';

@ApiUseTags('service')
@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService,
                private readonly userservice: UserService) {
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FilesInterceptor('files'))
    createService(@UploadedFiles() files, @Body() createServiceDto: CreateServiceDto, @Res() res, @Req() req) {
        console.log('files :: ', files);
        const servicedata = JSON.parse(createServiceDto['data']);
        if (servicedata.service.length === files.length) {
            let index = 0;
            files.forEach((file, i) => {
                cloud(file.buffer).then((result) => {
                    index = index + 1;
                    servicedata.service[i]['image_name'] = result['url'];
                    servicedata.service[i]['image_id'] = result['public_id'];
                    if (index === files.length) {
                        this.serviceService.create(servicedata, req.headers.authorization).then(response => {
                            res.send(response);
                        }).catch(error => {
                            res.status(400).send(error);
                        });
                    }
                });
            });
        } else {
            res.status(400).send({message: 'Error occur while uploading, please try again'});
        }
    }

    @Get()
    getService(@Res() res, @Req() req) {
        this.userservice.findOneByUsername(req.headers.named).then(resp => {
            this.serviceService.getService(resp._id).then(response => {
                if (response[0]) {
                    res.send(response[0]['service']);
                } else {
                    res.send(response);
                }
            }).catch(error => {
                res.status(400).send(error);
            });
        });
    }

    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    getServiceUser(@Res() res, @Req() req) {
        this.serviceService.getServiceUser(req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

    @Post('image')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('files'))
    updateProfileImage(@UploadedFile() files, @Res() res, @Req() req, @Body() createServiceDto: CreateServiceDto) {
        cloud(files.buffer).then(result => {
            createServiceDto['image_name'] = result['url'];
            createServiceDto['image_id'] = result['public_id'];
            this.serviceService.updateImage(createServiceDto, req.headers.authorization, files.buffer).then(response => {
                res.send(response);
            }).catch(error => {
                res.status(400).send(error);
            });
        });
    }
}