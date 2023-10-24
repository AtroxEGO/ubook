const { pool } = require("../helpers/Database");
const errorMessages = require("../helpers/ErrorMessages");
const Notification = require("../helpers/Notification");
const Error = require("../helpers/Error");

const QueryAllServices = async () => {
  const [res] = await pool.execute("SELECT * FROM SERVICES");
  return res;
};

const QueryServiceById = async (serviceID) => {
  const [[res]] = await pool.execute("SELECT * FROM SERVICES WHERE id = ?", [
    serviceID,
  ]);
  return res;
};

const InsertService = async (serviceData) => {
  const [res] = await pool.execute(
    `
    INSERT INTO services 
    VALUES (DEFAULT,?,?,?,?,?,?,?,?,?,?);`,
    Object.values(serviceData)
  );
  if (res.insertId)
    return {
      insertID: res.insertId,
      response: Notification("Successfully created new service!"),
    };
  else return Error(errorMessages.internalError, "general");
};

const UpdateService = async (serviceData) => {
  const [res] = await pool.execute(
    `
    UPDATE services 
    SET 
    name = ?,
    description = ?,
    subcategory = ?,
    image_url = ?,
    price = ?,
    duration = ?,
    gap = ?,
    serviceHourStart = ?,
    serviceHourEnd = ?
    WHERE
    id = ?;`,
    [
      serviceData.name,
      serviceData.description,
      serviceData.subcategory,
      serviceData.image_url,
      serviceData.price,
      serviceData.duration,
      serviceData.gap,
      serviceData.serviceHourStart,
      serviceData.serviceHourEnd,
      serviceData.id,
    ]
  );
  if (res.affectedRows)
    return {
      response: Notification("Successfully updated the service!"),
    };
  else return Error(errorMessages.internalError);
};

const DeleteService = async (serviceID) => {
  const [res] = await pool.execute(
    `
    DELETE FROM services
    WHERE id = ?
    `,
    [serviceID]
  );
  console.log(res);
  if (res.affectedRows)
    return {
      response: Notification("Successfully deleted the service!"),
    };
  else return Error(errorMessages.internalError, "general");
};

module.exports = {
  QueryAllServices,
  InsertService,
  QueryServiceById,
  UpdateService,
  DeleteService,
};
