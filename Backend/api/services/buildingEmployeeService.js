const BuildingEmployee = require('../models/buildingEmployee');

module.exports = (app) => {
  const entryService = require('./entryService')(app);

  //id from buildingEmployee
  const getEmployeeBuildingById = async (id) => {
    const result = await BuildingEmployee.query().where('id', '=', id).where('status', '=', true);
    return result[0];
  };

  const getEmployeeByBuildingId = async (buildingId) => {
    const result = await BuildingEmployee.query()
      .withGraphJoined('employee')
      .withGraphJoined('employee.job')
      .where('building_id', '=', buildingId);

    let employeeStatus = [];
    await result.map((item) => {
      let employeeS = item.employee;
      employeeS.status = item.status;
      employeeS.buildingEmployeeId = item.id;
      employeeStatus.push(employeeS);
    });

    return employeeStatus;
  };

  const save = async (body) => {
    const buildingId = body.buildingId;
    const employeeId = body.employeeId;

    await app
      .db('building_employee')
      .where({ employee_id: employeeId, status: true })
      .returning('building_id')
      .then((result) => {
        if (result.length > 0) {
          throw Error('Funcionário já está na obra id:' + result[0].building_id + ' !');
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

  const remove = async (id) => {
    let buildingEmployee = await getEmployeeBuildingById(id);
    const entry = await entryService.getEntryByEmployeeIdAndBuildingId(
      buildingEmployee.building_id,
      buildingEmployee.employee_id,
    );

    if (entry.length > 0) {
      buildingEmployee.status = false;
      app
        .db('building_employee')
        .update(buildingEmployee)
        .where({ id })
        .catch((e) => {
          app.api.services.throwError(e);
        });
    } else {
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
    }
  };

  return { getEmployeeByBuildingId, save, remove };
};
