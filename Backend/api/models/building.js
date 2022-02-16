const { Model, Modifiers, lodash } = require('objection');
const BuildingEmployee = require('./buildingEmployee');

class Building extends Model {
  static get tableName() {
    return 'building';
  }

  $formatJson(json) {
    json = super.$formatJson(json);

    let employeeList = [];
    json.employeeList?.map((item) => {
      if (item.status) {
        employeeList.push(item.employee);
      }
    });
    json.employeeList = employeeList;

    delete json.address_id;
    return json;
  }

  static get relationMappings() {
    const Address = require('./address');
    const Employee = require('./employee');
    const BuildingEmployee = require('./buildingEmployee');
    return {
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: 'building.address_id',
          to: 'address.id',
        },
      },
      employeeList: {
        relation: Model.HasManyRelation,
        modelClass: BuildingEmployee,
        join: {
          from: 'building.id',
          to: 'building_employee.building_id',
        },
      },
    };
  }
}

module.exports = Building;
