const BuildingEmployee = require('../models/buildingEmployee');

module.exports = (app) => {
  const getEmployeeByBuildingId = async (buildingId) => {
    const result = await BuildingEmployee.query()
      .withGraphJoined('employee')
      .where('building_id', '=', buildingId);

    let employee = [];
    await result.map((item) => {
      employee.push(item.employee);
    });

    return employee;
  };

  const save = async (body) => {
    const buildingId = body.buildingId;
    const employeeId = body.employeeId;

    await app
      .db('building_employee')
      .where({ building_id: buildingId, employee_id: employeeId })
      .then((result) => {
        if (result.length > 0) {
          throw Error('Já está salvo.');
        }
      })
      .catch((e) => {
        app.api.services.throwError(e.message);
      });

    return await app
      .db('building_employee')
      .insert({ building_id: buildingId, employee_id: employeeId, status: true })
      .returning('id')
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  const remove = (id) => {
    app
      .db('building_employee')
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
    const id = body.id;
    const buildingId = body.buildingId;
    const employeeId = body.employeeId;
    const status = body.status;

    return await app
      .db('building_employee')
      .where({ id })
      .update({ id, building_id: buildingId, employee_id: employeeId, status })
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  return { getEmployeeByBuildingId, save, remove, update };
};
