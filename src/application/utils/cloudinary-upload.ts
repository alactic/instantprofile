import * as cloudinary from 'cloudinary';
import {observable} from "rxjs/index";
import {async} from "rxjs/internal/scheduler/async";

cloudinary.config({
    cloud_name: 'softloft',
    api_key: 314466682599661,
    api_secret: 'o_fyN55i7DXY4lSt6a4QN2CpGH8',
});

export const cloud = (files) => {
    const promise = new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream((result) => {
            resolve(result);
        }).end(files);
    });

    return promise;
};
