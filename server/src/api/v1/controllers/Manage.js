const { InsertService } = require("../services/ServicesTable");

const CreateService = async (req, res) => {
  req.body = { ...req.body, created_by: req.userData.id };
  const result = await InsertService(req.body);
  if (result.insertID) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
};

module.exports = { CreateService };
