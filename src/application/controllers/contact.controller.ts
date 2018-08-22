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
import * as path from 'path';
import * as fs from 'fs';
import {PortifolioService} from '../services/porttifolio.service';
import {CreatePortifolioDto} from "../dto/portifolio.dto";
import {ContactService} from "../services/contact.service";
import {CreateContactDto} from "../dto/contact.dto";

@ApiUseTags('contact')
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {
    }

    @Post()
   //  @UseGuards(AuthGuard('jwt'))
    createService(@Body() createContactDto: CreateContactDto, @Res() res, @Req() req) {
        this.contactService.create(createContactDto).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

}