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

module.exports = { patternTwoDigisAfterComma, isValidFileType, isBase64Image };
