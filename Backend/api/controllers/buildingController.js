module.exports = (app) => {
  const service = require('../services/buildingService')(app);

  const getAllBuilding = async (req, res) => {
    try {
      return res.status(200).json(await service.getAllBuilding());
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  };

  const save = async (req, res) => {
    try {
      const result = await service.save(req.body);
      res.status(200).send(result[0]);
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

  const update = async (req, res) => {
    try {
      await service.update(req.body);
      res.status(204).send();
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  };

  return { getAllBuilding, save, remove, update };
};
