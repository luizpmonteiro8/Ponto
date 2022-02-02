const Building = require('../models/building');

module.exports = (app) => {
  const addressService = require('./addressService')(app);

  const getAllBuilding = () => {
    return Building.query()
      .withGraphJoined('address')
      .withGraphJoined('employeeList')
      .withGraphJoined('employeeList.employee')
      .orderBy('id')
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  const save = async (body) => {
    const addressId = await addressService.save(body.address);
    const building = {
      name: body.name,
      address_id: addressId.id,
    };

    return app
      .db('building')
      .insert(building)
      .returning('id')
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  const remove = (id) => {
    return app
      .db('building')
      .where({ id })
      .del()
      .then((rowsDeleted) => {
        if (rowsDeleted == 0) {
          throw Error('O id ' + id + ' não foi encontrado');
        }
      })
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  const update = async (body) => {
    await addressService.update(body.address);

    const building = {
      id: body.id,
      name: body.name,
      address_id: body.address.id,
    };

    return app
      .db('building')
      .where({ id: building.id })
      .update(building)
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  return { getAllBuilding, save, remove, update };
};
