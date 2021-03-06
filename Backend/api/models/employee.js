const { Model, Modifiers, lodash } = require('objection');

class Employee extends Model {
  static get tableName() {
    return 'employee';
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.address_id;
    delete json.job_id;
    return json;
  }

  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson(json);

    Object.keys(json).forEach((prop) => {
      const value = json[prop];

      if (prop == 'salary') {
        json.salary = Number(value).toFixed(2);
      }
    });

    return json;
  }

  static get relationMappings() {
    const Address = require('./address');
    const Job = require('./job');
    return {
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: 'employee.address_id',
          to: 'address.id',
        },
      },
      job: {
        relation: Model.HasOneRelation,
        modelClass: Job,
        join: {
          from: 'employee.job_id',
          to: 'job.id',
        },
      },
    };
  }
}

module.exports = Employee;
