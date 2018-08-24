import {
    Body, Controller, FileInterceptor, FilesInterceptor, Get, HttpException, Post, Req, Res, UploadedFile,
    UploadedFiles, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags} from '@nestjs/swagger';
import {diskStorage, multer} from 'multer';
import {PortifolioService} from '../services/porttifolio.service';
import {AddCategory, CreatePortifolioDto} from "../dto/portifolio.dto";
import {UserService} from "../services/user.service";
import {cloud} from "../utils/cloudinary-upload";

@ApiUseTags('portifolio')
@Controller('portifolio')
export class PortifolioController {
    constructor(private readonly porttifolioService: PortifolioService,
                private readonly userservice: UserService) {
    }

    @Post()
    // @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FilesInterceptor('files', 10))
    createportifolio(@UploadedFiles() files, @Body() createPortifolioDto: CreatePortifolioDto, @Res() res, @Req() req) {
        const portifoliodata = JSON.parse(createPortifolioDto['data']);
        let index = 0;
        files.forEach((file, i) => {
            cloud(file.buffer).then((result) => {
                index = index + 1;
                portifoliodata.portifolio[i]['image_name'] = result['url'];
                portifoliodata.portifolio[i]['image_id'] = result['public_id'];
                if (index === files.length) {
                    this.porttifolioService.create(portifoliodata, req.headers.authorization).then(response => {
                        res.send(response);
                    }).catch(error => {
                        res.status(400).send(error);
                    });
                }
            });
        });
    }

    @Post('category')
    // @UseGuards(AuthGuard('jwt'))
    addCategory(@Body() addCategory: AddCategory, @Res() res, @Req() req) {
        this.porttifolioService.addCategory(addCategory, req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

    @Get('category')
    // @UseGuards(AuthGuard('jwt'))
    getCategory(@Res() res, @Req() req) {
        this.porttifolioService.getCategory(req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

    @Get('category/user')
    getCategoryUser(@Res() res, @Req() req) {
        this.userservice.findOneByUsername(req.headers.named).then(resp => {
            this.porttifolioService.getCategoryUser(resp._id).then(response => {
                res.send(response);
            }).catch(error => {
                res.status(400).send(error);
            });
        });
    }

    @Get('user')
    getPortifolioUser(@Res() res, @Req() req) {
        this.userservice.findOneByUsername(req.headers.named).then(resp => {
            this.porttifolioService.getPortifolioUser(resp._id).then(response => {
                if (response[0]) {
                    res.send(response[0]['portifolio']);
                } else {
                    res.send(response);
                }
            }).catch(error => {
                res.status(400).send(error);
            });
        });
    }

    @Get()
    // @UseGuards(AuthGuard('jwt'))
    getPortifolio(@Res() res, @Req() req) {
        this.porttifolioService.getPortifolio(req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }

    @Post('image')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('files'))
    updateProfileImage(@UploadedFile() files, @Res() res, @Req() req, @Body() createPortifolioDto: CreatePortifolioDto) {
        /*const name = Date.now() + '-' + files.originalname;
        createPortifolioDto['image'] = name;*/
        /*const buff = new Buffer(files.buffer, 'base64');
        fs.writeFileSync('./src/public/uploads/' + name, buff);*/
        cloud(files.buffer).then((result) => {
            createPortifolioDto['image_name'] = result['url'];
            createPortifolioDto['image_id'] = result['public_id'];
            this.porttifolioService.updateImage(createPortifolioDto, req.headers.authorization).then(response => {
                res.send(response);
            }).catch(error => {
                res.status(400).send(error);
            });
        });
    }

    /*@Get()
    getDownload(@Res() res) {
        const image = path.join(__dirname, '../../../uploads') + '/' + '1532185120905-20170314_141500.jpg';

        const imageAsBase64 = fs.readFileSync(image);
        const imgBase = imageAsBase64.toString('base64').substring(0, 50)
        const img_res = {
            img: 'image',
            img_name: 'imgae service',
        };
        // res.sendFile(image);
        res.send({imageResponse: imgBase});
    }*/
}