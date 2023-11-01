const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");
const sharp = require("sharp");
const { isBase64Image } = require("../helpers/Validation");
const {
  InsertService,
  UpdateService,
  QueryServiceById,
  DeleteService,
} = require("../services/ServicesTable");
const { uploadImage } = require("../helpers/Firebase");
const Notification = require("../helpers/Notification");

//  Create a new service.
const CreateService = async (req, res) => {
  const serviceImageBase64 = req.body.image;

  if (!isBase64Image(serviceImageBase64)) {
    return res.status(400).json(Error(errorMessages.invalidData));
  }

  let serviceImageBuffer = Buffer.from(
    serviceImageBase64.split(",")[1],
    "base64"
  );

  serviceImageBuffer = await sharp(serviceImageBuffer)
    .resize(320, 170)
    .toBuffer();

  try {
    const imageURL = await uploadImage(serviceImageBuffer, "serviceImages");
    req.body = { ...req.body, image: imageURL, created_by: req.userData.id };
  } catch (error) {
    return res.status(500).json(Error(errorMessages.internalServerError));
  }

  const result = await InsertService(req.body);

  if (result.insertID) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
};

// Update Service Data
const UpdateServiceData = async (req, res) => {
  const serviceImageBase64 = req.body.image;

  if (!isBase64Image(serviceImageBase64)) {
    return res.status(400).json(Error(errorMessages.invalidData));
  }

  let serviceImageBuffer = Buffer.from(
    serviceImageBase64.split(",")[1],
    "base64"
  );

  serviceImageBuffer = await sharp(serviceImageBuffer)
    .resize(320, 170)
    .toBuffer();

  try {
    const imageURL = await uploadImage(serviceImageBuffer, "serviceImages");
    req.body = { ...req.body, image: imageURL };
  } catch (error) {
    return res.status(500).json(Error(errorMessages.internalServerError));
  }

  const result = await UpdateService(req.body);
  if (result.response) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
};

const DeleteExistingService = async (req, res) => {
  const serviceID = req.body.serviceID;

  const result = await DeleteService(serviceID);
  if (result.response) {
    res.json(Notification("Successfully deleted this service!"));
  } else {
    res.status(500).json(result);
  }
};

module.exports = { CreateService, UpdateServiceData, DeleteExistingService };
