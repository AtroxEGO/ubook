const { pool } = require("../helpers/Database");
const errorMessages = require("../helpers/ErrorMessages");
const Notification = require("../helpers/Notification");
const Error = require("../helpers/Error");

const QueryAllServices = async () => {
  const [services] =
    await pool.execute(`SELECT services.id as serviceID, services.name, description, image_url, price, duration, gap, serviceHourStart, serviceHourEnd,subcategory_name, category_name, businesses.name as creator_name, address, avatar_url, ROUND(COALESCE(AVG(reviews.review), 0), 1) as averageReview, COUNT(reviews.review) as reviewCount
    FROM services
    LEFT JOIN subcategories ON subcategories.id = services.subcategory
    LEFT JOIN categories ON categories.id = subcategories.category_id
    LEFT JOIN businesses ON businesses.id = services.created_by
    LEFT JOIN reviews ON reviews.service_id = services.id
    GROUP BY services.id, services.name, description, image_url, price, duration, gap, serviceHourStart, serviceHourEnd,subcategory_name, category_name, businesses.name, address, avatar_url;`);

  return services;
};

// const QueryAllServices = async () => {
//   // const [res] = await pool.execute("SELECT * FROM SERVICES");
//   const [res] =
//     await pool.execute(`SELECT services.name, description, image_url, price, duration, gap, serviceHourStart, serviceHourEnd,subcategory_name, category_name, businesses.name as creator_name, address, avatar_url  FROM services
//       LEFT JOIN subcategories on subcategories.id = services.subcategory
//       LEFT JOIN categories on categories.id = subcategories.category_id
//       LEFT JOIN businesses on businesses.id = services.created_by;`);
//   return res;
// };

const QueryServicesByIDs = async (serviceIDs) => {
  const [res] = await pool.query("SELECT * FROM services WHERE id IN (?)", [
    serviceIDs,
  ]);
  console.log(res);
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
  QueryServicesByIDs,
  UpdateService,
  DeleteService,
};
