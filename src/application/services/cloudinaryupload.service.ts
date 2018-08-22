import {Inject, Injectable} from '@nestjs/common';
import * as cloudinary from 'cloudinary';

@Injectable()
export class CloudinaryuploadService {
    constructor() {
        cloudinary.config({
            cloud_name: 'softloft',
            api_key: 314466682599661,
            api_secret: 'o_fyN55i7DXY4lSt6a4QN2CpGH8',
        });
    }

    async bulkUpload(file, i) {
        await cloudinary.uploader.upload_stream((result) => {
            return result;
        }).end(file);
    }

}