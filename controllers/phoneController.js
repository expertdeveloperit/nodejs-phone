const catchAsyncError = require("../middleware/catchAsyncError");
const Phone = require("../model/phone");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");
const fs = require("fs");

exports.getPhones = catchAsyncError(async (req, res, next) => {
  const phones = await Phone.find({}).populate('manufacturer');
  res.json({ phones })
})

exports.postPhone = catchAsyncError(async (req, res, next) => {
  const phone = new Phone(req.body);
  await phone.save();
  res.json({
    msg: 'successfully created',
    phone
  })
})

exports.uploadPhonePhoto = catchAsyncError(async (req, res, next) => {
  const phone = await Phone.findById(req.params.id);
  if (!phone) {
    return new ErrorHandler('Phone not Found', 400);
  }
  if (!req.files) {
    return new ErrorHandler('Please upload mobile picture', 400);
  }
  const file = req.files.file;
  // check file type
  const supportedFiles = /.jpeg|.png/;
  const checkFileType = file.split(".")[1];
  if (!supportedFiles.test(path.extname(file.name))) {
    return next(new ErrorHandler("please upload the document file", 400));
  }
  if (file.size > process.env.MAX_FILE_SIZE) {
    return next(
      new ErrorHandler("Please upload file with size less than 2MB", 400)
    );
  }
  file.mv(`${process.env.UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler("Resume upload failed", 500));
    }
    job.imageFileName = file.name
  })
  res.json({
    msg: 'uploaded succesfully'
  })
})

exports.updatePhoneDetails = catchAsyncError(async (req, res, next) => {
  let phone = await Phone.findById(req.params.id);
  if (!phone) {
    return next(new ErrorHandler("Phone not Found", 404));
  }
  const updatedPhone = await Phone.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    msg: "Phone is updated",
  });
})

exports.deletePhoneDetails = catchAsyncError(async (req, res, next) => {
  const phone = await Phone.findById(req.params.id);
  if (!phone) {
    return new ErrorHandler('Job not Found', 400)
  }
  if (phone.imageFileName) {
    const filepath = `${__dirname}/public/uploads/${phone.imageFileName}`
    fs.unlink(filepath, (err) => {
      if (err) {
        return console.log(err);
      }
    });
  }
  await Phone.findByIdAndDelete(req.params.id);
  res.status(200).json({
    msg: "Record delted succesfully"
  })
})


