const errorMessages = {
  internalError: "Unexpected internal error. Try again later!",
  duplicateEmail: "Email already exists!",
  notAuthorized: "Unauthorized for this request!",
  doesntExist: "Object accessed in your request doesnt exist!",
  invalidAccountType: "Invalid account type for this request!",
  missingData: "Your request is missing data!",
  invalidData: "Data sent in your request is invalid!",
  notAuthorizedOrDoesntExits:
    "Either object you are trying to access doesnt exist or you dont have permission for that!",
  ER_DUP_ENTRY: "Entry already exists!",
  ER_NO_REFERENCED_ROW_2: "Object accesed in your request doesnt exist!",
};

module.exports = errorMessages;
