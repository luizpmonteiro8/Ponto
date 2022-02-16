const { Model, Modifiers, lodash } = require('objection');

class PaymentItem extends Model {
  static get tableName() {
    return 'payment_item';
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.employee_id;
    delete json.payment_id;
    delete json.total_with_discont;
    delete json.absent_day;
    return json;
  }

  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson(json);

    Object.keys(json).forEach((prop) => {
      const value = json[prop];
      if (prop == 'total_with_discont') {
        json.totalWithDiscont = Number(value).toFixed(2);
      }

      if (prop == 'absent_day') {
        json.absentDay = value;
      }

      if (prop == 'discont') {
        json.discont = Number(value).toFixed(2);
      }
    });

    return json;
  }

  static get relationMappings() {
    const PaymentItem = require('./paymentItem');
    const Employee = require('./employee');

    return {
      employee: {
        relation: Model.HasOneRelation,
        modelClass: Employee,
        join: {
          from: 'payment_item.employee_id',
          to: 'employee.id',
        },
      },
    };
  }
}

module.exports = PaymentItem;
