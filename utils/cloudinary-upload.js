// const { cloudinary } = require("../src/configs/cloudinary");
const { cloudinary } = require("../src/configs/cloudinary.js");

const upload_to_cloudinary = (fileStream, fileInfo) =>
  new Promise((resolve, reject) => {
    const upload_stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "demo-folder" },
      (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          // files.push(result.secure_url);
          resolve(result.secure_url);
        }
      }
    );
    fileStream.pipe(upload_stream);
  });

module.exports = { upload_to_cloudinary };
