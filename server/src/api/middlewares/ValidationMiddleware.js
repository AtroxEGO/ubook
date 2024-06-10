const { stripBody } = require("../helpers/Validation");
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

module.exports = validation;
