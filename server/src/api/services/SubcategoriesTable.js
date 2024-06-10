const { pool } = require("../helpers/Database");
const Error = require("../helpers/Error");
const errorMessages = require("../helpers/ErrorMessages");

const QueryAllSubcategories = async () => {
  const [res] = await pool.execute(
    `SELECT subcategories.id ,subcategory_name, category_name FROM subcategories LEFT JOIN categories on categories.id = subcategories.category_id`
  );
  return res;
};

module.exports = { QueryAllSubcategories };
