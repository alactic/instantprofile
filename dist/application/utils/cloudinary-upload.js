"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary = require("cloudinary");
exports.cloud = (files, file, imageName, image_id, i) => {
    cloudinary.config({
        cloud_name: 'softloft',
        api_key: 314466682599661,
        api_secret: 'o_fyN55i7DXY4lSt6a4QN2CpGH8',
    });
    cloudinary.uploader.upload_stream((result) => {
        const index = i + 1;
        imageName = result['url'];
        image_id = result['public_id'];
        if (index === files.length) {
            console.log('length of file :: ', files.length);
            return files.length;
        }
    }).end(file.buffer);
};
//# sourceMappingURL=cloudinary-upload.js.map