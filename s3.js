require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const region = process.env.S3_BUCKET_REGION;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

async function uploadFiles(files) {

    const params = files.map(file => {

        const fileStream = fs.createReadStream(file.path);

        return { 
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }})

    return await Promise.all(params.map(param => s3.upload(param).promise()));

    }

    
exports.uploadFiles = uploadFiles