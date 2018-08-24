import {
    Body, Controller, FileInterceptor, FilesInterceptor, Get, Param, Post, Put, Req, Res, UploadedFile, UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreateAboutMeDto, UpdateAboutMeDto} from '../dto/aboutme.dto';
import {ApiUseTags} from '@nestjs/swagger';
import {AboutmeService} from '../services/aboutme.service';
import {AuthGuard} from '@nestjs/passport';
import {UserService} from '../services/user.service';
import * as path from 'path';
import * as fs from "fs";
import {cloud} from "../utils/cloudinary-upload";

@ApiUseTags('about')
@Controller('about')
export class AboutmeController {
    constructor(private readonly aboutmeService: AboutmeService,
                private readonly userservice: UserService) {
    }

    @Post()
    // @UseGuards(AuthGuard('jwt'))
    createUser(@Res() res, @Req() req, @Body() createAboutMeDto: CreateAboutMeDto) {
        this.aboutmeService.create(createAboutMeDto, req.headers.authorization).then((response) => {
            res.status(200).send(response);
        }).catch((error) => {
            res.status(400).send({message: error.message});
        });
    }

    @Post('cv')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('files'))
    updateCV(@UploadedFile() files, @Res() res, @Req() req, @Body() createAboutMeDto: CreateAboutMeDto) {
        const name = Date.now() + '-' + files.originalname;
        createAboutMeDto['cv'] = name;
        const buff = new Buffer(files.buffer, 'base64');
        fs.writeFileSync('./src/public/uploads/' + name, buff);
        this.aboutmeService.updateCV(createAboutMeDto, req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

    @Post('profile_image')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('files'))
    updateProfileImage(@UploadedFile() files, @Res() res, @Req() req, @Body() createAboutMeDto: CreateAboutMeDto) {
        cloud(files.buffer).then((result) => {
            createAboutMeDto['image_name'] = result['url'];
            createAboutMeDto['image_id'] = result['public_id'];
            this.aboutmeService.updateProfileImage(createAboutMeDto, req.headers.authorization).then(response => {
                res.send(response);
            }).catch(error => {
                res.status(400).send(error);
            });
        });
    }

    @Put()
    //  @UseGuards(AuthGuard('jwt'))
    updateUser(@Res() res, @Req() req, @Body() updateAboutMeDto: UpdateAboutMeDto) {
        this.userservice.findOneByUsername(req.headers.named).then(resp => {
            this.aboutmeService.update(updateAboutMeDto, resp._id).then((response) => {
                res.status(200).send(response);
            }).catch((error) => {
                res.status(400).send({message: error.message});
            });
        });
    }

    @Get()
    // @UseGuards(AuthGuard('jwt'))
    getById(@Res() res, @Req() req) {
        this.userservice.findOneByUsername(req.headers.named).then(resp => {
            this.aboutmeService.getById(resp._id).then((response) => {
                res.status(200).send(response);
            }).catch((error) => {
                res.status(400).send({message: error.message});
            });
        });
    }

    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    getUser(@Res() res, @Req() req) {
        this.aboutmeService.getUser(req.headers.authorization).then((response) => {
            res.status(200).send(response);
        }).catch((error) => {
            res.status(400).send({message: error.message});
        });
    }

    @Get('getCV')
    getDownload(@Param() params, @Res() res, @Req() req) {
        const url = req.query['cv'];
        const image = path.join(__dirname, '../../../src/public/uploads/') + '/' + url;
        res.setHeader('Content-Type', 'application/octet-stream');
        res.sendFile(image);
    }
}
