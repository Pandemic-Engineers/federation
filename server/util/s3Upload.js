const utility = require('./utility')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('../../config/config')
const aws_access_key_id = config.aws_access_key_id
const aws_secret_access_key = config.aws_secret_access_key
const aws_bucket = config.aws_bucket
const aws_region = config.aws_region

module.exports.uploadAssetImg = async (req, res) => {
    const AWS = require('aws-sdk');
    AWS.config.update({ accessKeyId: aws_access_key_id, secretAccessKey: aws_secret_access_key });
    AWS.config.update({ region: aws_region });

    const s3 = new AWS.S3({ computeChecksums: true, httpOptions: { timeout: 300000 } });

    const file_name = 'asset_' + utility.generateUnixTimestamp() + '.jpg'
    const s3_key = 'faces/' + file_name
    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: aws_bucket,
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            acl: 'public-read',
            key: function (req, file, cb) {
                cb(null, s3_key)
            }
        })
    }).single('file');

    return await new Promise((resolve, reject) => {
        upload(req, res, function (err) {
            if (err) return reject(err);

            if (!req.file) {
                resolve({ success: false, error_code: 104, error_message: 'File is null' });
                return;
            }
            location = req.file.location
            // s3_key = req.file.key
            resolve({ success: true, location, s3_key });
        });
    });
}





