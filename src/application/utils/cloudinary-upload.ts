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

export const deleteCloudFile = (file_id) => {
    console.log('file id :: ', file_id);
    const promise = new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(file_id,
            (error, result) => {
                console.log('result :: ', result, 'error :: ', error);
                if (result) {
                    resolve(result);
                }
                if (error) {
                    reject(error);
                }
            });
    });

    return promise;
};
