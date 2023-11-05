const validFileExtensions = {
  image: ["jpg", "png", "jpeg"],
};

const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

const isValidFileType = (fileName, fileType) => {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
};

const isBase64Image = (base64String) => {
  const imageFormatSignatures = [
    "data:image/jpeg;base64,",
    "data:image/png;base64,",
  ];

  // Check if the base64 string starts with any of the image format signatures
  for (const signature of imageFormatSignatures) {
    if (base64String.startsWith(signature)) {
      return true;
    }
  }

  return false;
};

// Strips body from data that is not in a schema
const stripBody = async (schema, body) => {
  const schemaKeys = Object.keys(schema.describe().fields);
  const strippedBody = {};

  for (const key in body) {
    if (schemaKeys.includes(key)) {
      strippedBody[key] = body[key];
    }
  }

  return strippedBody;
};

module.exports = {
  patternTwoDigisAfterComma,
  stripBody,
  isValidFileType,
  isBase64Image,
};
