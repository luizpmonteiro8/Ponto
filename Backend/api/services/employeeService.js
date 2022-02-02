const Employee = require('../models/employee');

module.exports = (app) => {
  const addressService = require('./addressService')(app);
  const getAllEmployee = () => {
    return Employee.query()
      .withGraphJoined('job')
      .withGraphJoined('address')
      .orderBy('id')
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  const save = async (body) => {
    const addressId = await addressService.save(body.address);

    const employee = {
      name: body.name,
      salary: body.salary,
      job_id: body.jobId,
      address_id: addressId.id,
    };

    return app
      .db('employee')
      .insert(employee)
      .returning('id')
      .then((id) => {
        return id;
      })
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  const remove = (id) => {
    return app
      .db('employee')
      .where({ id })
      .del()
      .then((rowsDeleted) => {
        if (rowsDeleted == 0) {
          throw Error('O id ' + id + ' não foi encontrado');
        }
      })
      .catch((e) => app.api.services.throwError(e));
  };

  const update = async (body) => {
    await addressService.update(body.address);

    const employee = {
      id: body.id,
      name: body.name,
      salary: body.salary,
      job_id: body.jobId,
      address_id: body.address.id,
    };

    return app
      .db('employee')
      .where({ id: employee.id })
      .update(employee)
      .catch((e) => app.api.services.throwError(e));
  };

  return { getAllEmployee, save, remove, update };
};
