"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: 'softloft',
    api_key: 314466682599661,
    api_secret: 'o_fyN55i7DXY4lSt6a4QN2CpGH8',
});
exports.cloud = (files) => {
    const promise = new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream((result) => {
            resolve(result);
        }).end(files);
    });
    return promise;
};
//# sourceMappingURL=cloudinary-upload.js.map