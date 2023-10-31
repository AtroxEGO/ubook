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

module.exports = { patternTwoDigisAfterComma, isValidFileType };
