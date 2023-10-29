const errorMessages = require("../helpers/ErrorMessages");

// class ServerError extends Error {
//   constructor(message, path = "general") {
//     super(message);
//     this.name = message;
//     this.path = path;
//   }
// }

const Error = (code, path = "general") => {
  const message = errorMessages[code] || code;
  const type = "error";
  return {
    message,
    path,
    type, // TODO: Check if this is needed
  };
};

module.exports = Error;
