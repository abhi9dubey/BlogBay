require('dotenv').config()

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

function uploadFile(fileBuffer, fileName, mimetype) {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype
  }

  return s3Client.send(new PutObjectCommand(uploadParams));
}

async function getObjectSignedUrl(key) {
  const url = `https://${bucketName}.s3.amazonaws.com/${key}`

  return url
}

module.exports = {uploadFile,getObjectSignedUrl}
