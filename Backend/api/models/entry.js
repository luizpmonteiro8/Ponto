const { moment } = require('moment');
const { Model, Modifiers, lodash } = require('objection');

class Entry extends Model {
  static get tableName() {
    return 'entry';
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.employee_id;
    delete json.date_time;
    delete json.building_id;
    return json;
  }

  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson(json);

    Object.keys(json).forEach((prop) => {
      const value = json[prop];

      if (value instanceof Date) {
        let date = value;
        date.setHours(value.getHours() - 3);
        json.dateTime = date.toISOString();
      }
      if (prop == 'building_id') {
        json.buildingId = value;
      }
    });

    return json;
  }

  static get relationMappings() {
    const Employee = require('./employee');
    return {
      employee: {
        relation: Model.HasOneRelation,
        modelClass: Employee,
        join: {
          from: 'entry.employee_id',
          to: 'employee.id',
        },
      },
    };
  }
}

module.exports = Entry;
