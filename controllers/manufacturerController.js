const catchAsyncError = require("../middleware/catchAsyncError");
const Manufacture = require("../model/manufacture");

exports.getManufacturerList = catchAsyncError(async (req, res, next) => {
  const manufacturers = await Manufacture.find({});
  res.status(200).json({ manufacturers })

})

exports.postManufacturer = catchAsyncError(async (req, res, next) => {
  const name = req.body.name;
  const manufacturer = new Manufacture({ name: name })
  await manufacturer.save();
  res.status(200).json({ msg: 'succesfully created' })
})

