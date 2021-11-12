/**@module amazonS3Service */
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

//Config info
const s3Endpoint = process.env.AWS_ENDPOINT;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyID = process.env.AWS_ACCESS_KEY;
const secretKeyID = process.env.AWS_SECRET_KEY;
const bucket = process.env.AWS_BUCKET_NAME;

let s3Config = {
  region: region,
  credentials: {
    accessKeyId: accessKeyID,
    secretAccessKey: secretKeyID
  },
  signatureVersion: 'v4'
}

if (s3Endpoint) {
  s3Config.endpoint = `https://${s3Endpoint}`;
}

const s3 = new S3Client(s3Config);

const getFileUrl = (filename) => s3Endpoint ?
  `https://${bucket}.${s3Endpoint}/${filename}` :
  `https://${bucket}.s3.${region}.amazonaws.com/${filename}`;

module.exports = {
  /**
   * This function posts a file in AWS S3
   * @function postFile
   * @param {import('multer').File} file
   * @returns {Object} upload result
   */
  async postFile(file) {
    //Spaces in a file name can be troublesome if we want to use them as ID's
    var fileName = file.originalname.replace(/ /g, '-');

    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: file.buffer,
      ContentType: "image/jpeg"
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const url = getFileUrl(fileName);
    return ({ url });
  },

  /**
   * This function gets a file from AWS S3
   * @function getFile
   * @param {String} file key
   * @returns {Object} upload result
   */
  async getFile(id) {
    const params = {
      Bucket: bucket,
      Key: id,
    };

    const command = new GetObjectCommand(params);
    const image = await s3.send(command);

    if(image.Body.statusCode === 200)
    {
      const url = getFileUrl(id);
      return ({ url: url });
    } else {
      return image;
    }
  },

  /**
   * This function deletes a file from AWS S3
   * @function getFile
   * @param {String} file key
   * @returns {Boolean} if the operation suceeded or not
   */
  async deleteFile(id) {
    const params = {
      Bucket: bucket,
      Key: id
    };

    // try to get the file first, this will throw if the file doesn't exist
    const getCommand = new GetObjectCommand(params);
    await s3.send(getCommand);

    const deleteCommand = new DeleteObjectCommand(params)
    const operation = await s3.send(deleteCommand);

    return (operation.$metadata.httpStatusCode == 204);
  }
};
