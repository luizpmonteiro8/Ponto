const BuildingEmployeeService = require('./buildingEmployeeService')();
const entryService = require('./entryService')();
const Payment = require('../models/payment');

module.exports = (app, res) => {
  const getAllPayment = () => {
    return Payment.query()
      .withGraphJoined('building')
      .withGraphJoined('paymentItem')
      .withGraphJoined('paymentItem.employee')
      .orderBy('id')
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  const getAllPaymentByDateByBuilding = (dayPayment, buildingId) => {
    return app
      .db('payment')
      .where('day_of_payment', '=', dayPayment)
      .where('building_id', '=', buildingId)
      .catch((e) => app.api.services.throwError(e));
  };

  const save = async (body) => {
    const exist = await getAllPaymentByDateByBuilding(body.date + '-05', body.buildingId);

    if (exist.length > 0) {
      app.api.services.throwError('Já cadastrado!');
    } else {
      let totalSalary = 0;
      const payment = {
        day_of_payment: body.date + '-05',
        building_id: body.buildingId,
        total_salary: totalSalary,
      };
      const paymentId = await app
        .db('payment')
        .insert(payment)
        .returning('id')
        .catch((e) => app.api.services.throwError(e));

      const employee = await BuildingEmployeeService.getEmployeeByBuildingId(body.buildingId);

      const result = await employee.map(async (item) => {
        const entry = await entryService.getEntryByEmployeeWithDate(item.id, body.date);

        let absentDay = 0;
        entry.map((entry) => {
          if (entry.type.includes('Faltou')) {
            absentDay++;
          }
        });
        const discont = (item.salary / 30) * absentDay;
        const totalWithDiscont = item.salary - discont;
        totalSalary += totalWithDiscont;

        const paymentItem = {
          absent_day: absentDay,
          discont: discont.toFixed(2),
          total_with_discont: totalWithDiscont.toFixed(2),
          employee_id: item.id,
          payment_id: paymentId[0].id,
        };

        await app
          .db('payment_item')
          .insert(paymentItem)
          .catch((e) => app.api.services.throwError(e));

        payment.id = paymentId[0].id;
        payment.total_salary = totalSalary;

        app
          .db('payment')
          .where('id', '=', paymentId[0].id)
          .update(payment)
          .returning('total_salary')
          .catch((e) => app.api.services.throwError(e));
      });

      return Promise.all(result).then(() => {
        return result;
      });
    } //else
  };

  const remove = (id) => {
    return app
      .db('payment')
      .where({ id })
      .del()
      .then((rowsDeleted) => {
        if (rowsDeleted == 0) throw Error('O id ' + id + ' não foi encontrado');
      })
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  return { getAllPayment, save, remove };
};
