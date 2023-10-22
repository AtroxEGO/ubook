const { formatYupError } = require("../validations/UserValidation");

const validation = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    // Validate that body data passes schema requirements
    await schema.validate(body);

    // Strip body from keys that are not in a schema
    req.body = await stripBody(schema, body);

    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(formatYupError(error));
  }
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

module.exports = validation;
