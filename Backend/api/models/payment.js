const { Model, Modifiers, lodash } = require('objection');

class Payment extends Model {
  static get tableName() {
    return 'payment';
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.building_id;
    delete json.day_of_payment;
    delete json.total_salary;
    delete json.building.employeeList;
    return json;
  }

  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson(json);

    Object.keys(json).forEach((prop) => {
      const value = json[prop];

      console.log(prop);

      if (prop == 'day_of_payment') {
        json.dayOfPayment = value;
      }

      if (prop == 'total_salary') {
        json.totalSalary = Number(value).toFixed(2);
      }
    });

    return json;
  }

  static get relationMappings() {
    const PaymentItem = require('./paymentItem');
    const Employee = require('./employee');
    const Building = require('./building');

    return {
      building: {
        relation: Model.HasOneRelation,
        modelClass: Building,
        join: {
          from: 'payment.building_id',
          to: 'building.id',
        },
      },
      paymentItem: {
        relation: Model.HasManyRelation,
        modelClass: PaymentItem,
        join: {
          from: 'payment.id',
          to: 'payment_item.payment_id',
        },
      },
    };
  }
}

module.exports = Payment;
