const { Model, Modifiers } = require('objection');

class BuildingEmployee extends Model {
  static get tableName() {
    return 'building_employee';
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    return json;
  }

  static get relationMappings() {
    const Employee = require('./employee');
    const Building = require('./building');
    return {
      employee: {
        relation: Model.HasOneRelation,
        modelClass: Employee,
        join: {
          from: 'building_employee.employee_id',
          to: 'employee.id',
        },
      },
      building: {
        relation: Model.HasManyRelation,
        modelClass: Building,
        join: {
          from: 'building_employee.building_id',
          to: 'building.id',
        },
      },
    };
  }
}

module.exports = BuildingEmployee;
