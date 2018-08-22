import {
    Body, Controller, FilesInterceptor, Get, Post, Req, Res, UploadedFiles, UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import * as path from 'path';
import {AuthGuard} from '@nestjs/passport';
import * as fs from 'fs';
import {ClientService} from '../services/client.service';
import {CreateClientDto} from '../dto/client.dto';
import {UserService} from "../services/user.service";

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService,
                private readonly userservice: UserService) {
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FilesInterceptor('files', 5))
    createService(@UploadedFiles() files, @Body() createClientDto: CreateClientDto, @Res() res, @Req() req) {
        const clientdata = JSON.parse(createClientDto['data']);
        clientdata.client.forEach((value, i) => {
            value['image_name'] = Date.now() + '-' + 'file.originalname' + i;
        });

        files.forEach((file, i) => {
            const buff = new Buffer(file.buffer, 'base64');
            fs.writeFileSync('./src/public/uploads/' + clientdata.client[i]['image_name'], buff);
        });
        this.clientService.create(clientdata, req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

    /*@Get()
    getDownload(@Res() res) {
        const image = path.join(__dirname, '../../../uploads') + '/' + '1532185120905-20170314_141500.jpg';
        res.sendFile(image);
    }*/

    @Get()
    getService(@Res() res, @Req() req) {
        this.userservice.findOneByUsername(req.headers.named).then(resp => {
            this.clientService.getClient(resp._id).then(response => {
                res.send(response[0]['client']);
            }).catch(error => {
                res.status(400).send(error);
            });
        });
    }
}