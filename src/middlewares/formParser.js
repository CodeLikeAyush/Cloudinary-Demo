const Busboy = require("busboy");
const path = require("path");

const { upload_to_cloudinary } = require("../../utils/cloudinary-upload.js");

const formParser = async (req, res, next) => {
  const uploadPromises = [];
  const formFields = [];

  const bb = Busboy({ headers: req.headers });

  // Event: File
  bb.on("file", async (fieldname, fileStream, fileInfo) => {
    uploadPromises.push(upload_to_cloudinary(fileStream, fileInfo));
  });

  // Event: Field
  bb.on("field", (fieldname, fieldValue) => {
    const data = { [fieldname]: fieldValue };
    console.log(data);
    formFields.push(data);
  });

  // Event: Finish
  bb.on("finish", () => {
    req.formData = formFields;
    Promise.all(uploadPromises).then((urls) => {
      console.log(urls);
      req.files_urls = urls;
      console.log("finished parsing");
      next();
    });
  });

  // Event: Error
  bb.on("error", (error) => {
    console.error("Error parsing form:", error);
    res
      .status(500)
      .json({ message: "Something went wrong during form parsing" });
  });

  req.pipe(bb);
};

module.exports = { formParser };
