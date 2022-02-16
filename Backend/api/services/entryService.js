const moment = require('moment');
const Entry = require('../models/entry');

module.exports = (app) => {
  const getAllEntry = () => {
    return Entry.query()
      .withGraphJoined('employee')
      .orderBy('id')
      .catch((e) => app.api.services.throwError(e));
  };

  const getEntryByEmployeeId = async (employeeId) => {
    const result = await Entry.query()
      .withGraphJoined('employee')
      .where('employee_id', '=', employeeId)
      .orderBy('id')
      .catch((e) => {
        app.api.services.throwError(e);
      });
    return result;
  };

  const getEntryByEmployeeIdAndBuildingId = async (buildingId, employeeId) => {
    const result = await Entry.query()
      .withGraphJoined('employee')
      .where('employee_id', '=', employeeId)
      .where('building_id', '=', buildingId)
      .catch((e) => {
        app.api.services.throwError(e);
      });
    return result;
  };

  const getEntryByEmployeeWithDate = async (employeeId, date1) => {
    var date = new Date(date1);
    const finalDayMonth = new Date(date.getFullYear(), date.getMonth() + 2, 0);

    const result = await Entry.query()
      .withGraphJoined('employee')
      .where('employee_id', '=', employeeId)
      .whereBetween('date_time', [date, finalDayMonth])
      .orderBy('id')
      .catch((e) => {
        app.api.services.throwError(e);
      });
    return result;
  };

  const save = (body) => {
    const entry = {
      type: body.type,
      date_time: body.dateTime,
      obs: body.obs,
      employee_id: body.employeeId,
      building_id: body.buildingId,
    };

    return app
      .db('entry')
      .insert(entry)
      .returning('id')
      .catch((e) => app.api.services.throwError(e));
  };

  const remove = (id) => {
    app
      .db('entry')
      .where({ id })
      .del()
      .then((rowsDeleted) => {
        if (rowsDeleted == 0) {
          throw Error('O id ' + id + ' não foi encontrado');
        }
      })
      .catch((e) => app.api.services.throwError(e));
  };

  const update = (body) => {
    const entry = {
      id: body.id,
      type: body.type,
      obs: body.obs,
      date_time: body.dateTime,
      employee_id: body.employeeId,
      building_id: body.buildingId,
    };

    return app
      .db('entry')
      .where({ id: entry.id })
      .update(entry)
      .then((result) => {
        if (result == 0) throw Error('O id ' + entry.id + ' não foi encontrado');
      })
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  return {
    getAllEntry,
    getEntryByEmployeeId,
    getEntryByEmployeeWithDate,
    getEntryByEmployeeIdAndBuildingId,
    save,
    remove,
    update,
  };
};
