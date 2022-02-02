const BuildingEmployeeService = require('./buildingEmployeeService')();
const entryService = require('./entryService')();

module.exports = (app, res) => {
  const getAllPayment = () => {
    return app
      .db('payment')
      .orderBy('id')
      .catch((e) => app.api.services.throwError(e));
  };

  const save = async (body) => {
    const employee = await BuildingEmployeeService.getEmployeeByBuildingId(body.buildingId);

    const result = await employee.map(async (item) => {
      const entry = await entryService.getEntryByEmployeeWithDate(item.id, body.date);
      let absentDay = 0;
      await entry.map((entry) => {
        if (entry.type.includes('Faltou')) {
          absentDay++;
        }
      });
      const discont = (item.salary / 30) * absentDay;
      const totalWithDiscont = item.salary - discont;

      const payment = {
        day_of_payment: body.date + '-05',
        absent_day: absentDay,
        discont: discont.toFixed(2),
        total_with_discont: totalWithDiscont.toFixed(2),
        employee_id: item.id,
        building_id: body.buildingId,
      };
      app
        .db('payment')
        .insert(payment)
        .catch((err) => res.status(400).json(err).send());
    });

    return Promise.all(result).then(() => {
      return result;
    });
  };

  const remove = (body) => {
    return app
      .db('payment')
      .where({ day_of_payment: body.date + '-05', building_id: body.buildingId })
      .del()
      .then((rowsDeleted) => {
        if (rowsDeleted == 0) throw Error('O id ' + body.buildingId + ' não foi encontrado');
      })
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  return { getAllPayment, save, remove };
};
