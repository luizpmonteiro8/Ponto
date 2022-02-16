const BuildingEmployee = require('../models/buildingEmployee');

module.exports = (app) => {
  const service = require('../services/buildingEmployeeService')(app);

  const getEmployeeByBuildingId = async (req, res) => {
    try {
      const result = await service.getEmployeeByBuildingId(req.params.id);
      res.status(202).json(result).send();
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  };

  const save = async (req, res) => {
    try {
      const result = await service.save(req.body);
      res.status(202).json(result[0]).send();
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  };

  const remove = async (req, res) => {
    try {
      await service.remove(req.params.id);
      res.status(204).send();
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  };

  return { getEmployeeByBuildingId, save, remove };
};
