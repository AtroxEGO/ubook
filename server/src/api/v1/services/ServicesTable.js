const { pool } = require("../helpers/Database");
const errorMessages = require("../helpers/ErrorMessages");
const Notification = require("../helpers/Notification");
const Error = require("../helpers/Error");

const QueryAllServices = async () => {
  const [res] = await pool.execute("SELECT * FROM SERVICES");
  return res;
};

const QueryServiceById = async () => {
  const [res] = await pool.execute("SELECT * FROM SERVICES");
  return res;
};

const InsertService = async (serviceData) => {
  const [res] = await pool.execute(
    `
    INSERT INTO services 
    VALUES (DEFAULT,?,?,?,?,?,?,?,?);`,
    Object.values(serviceData)
  );
  if (res.insertId)
    return {
      insertID: res.insertId,
      response: Notification("Successfully created new service!", "general"),
    };
  else return Error(errorMessages.internalError, "general");
};

module.exports = { QueryAllServices, InsertService, QueryServiceById };
