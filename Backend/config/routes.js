const { userValidator } = require('../api/validation/userValidator');
const { jobValidate } = require('../api/validation/jobValidator');
const { employeeValidate } = require('../api/validation/employeeValidator');
const { buildingValidate } = require('../api/validation/buildingValidator');
const { entryValidate } = require('../api/validation/entryValidator');

module.exports = (app) => {
  app.post('/signup', userValidator, app.api.controllers.userController.save);
  app.post('/signin', app.api.controllers.auth.signin);

  app
    .route('/job')
    .all(app.config.passport.authenticate())
    .get(app.api.controllers.jobController.getAllJob)
    .post(jobValidate, app.api.controllers.jobController.save);
  app
    .route('/job/:id')
    .all(app.config.passport.authenticate())
    .delete(app.api.controllers.jobController.remove)
    .put(jobValidate, app.api.controllers.jobController.update);

  app
    .route('/employee')
    .all(app.config.passport.authenticate())
    .get(app.api.controllers.employeeController.getAllEmployee)
    .post(employeeValidate, app.api.controllers.employeeController.save);
  app
    .route('/employee/:id')
    .all(app.config.passport.authenticate())
    .delete(app.api.controllers.employeeController.remove)
    .put(employeeValidate, app.api.controllers.employeeController.update);

  app
    .route('/building')
    .all(app.config.passport.authenticate())
    .get(app.api.controllers.buildingController.getAllBuilding)
    .post(buildingValidate, app.api.controllers.buildingController.save);
  app
    .route('/building/:id')
    .all(app.config.passport.authenticate())
    .delete(app.api.controllers.buildingController.remove)
    .put(buildingValidate, app.api.controllers.buildingController.update);

  app
    .route('/entry')
    .all(app.config.passport.authenticate())
    .get(app.api.controllers.entryController.getAllEntry)
    .post(app.api.controllers.entryController.save);
  app
    .route('/entry/:id')
    .all(app.config.passport.authenticate())
    .delete(app.api.controllers.entryController.remove)
    .put(app.api.controllers.entryController.update)
    .get(app.api.controllers.entryController.getEntryByEmployeeId);

  app
    .route('/buildingEmployee')
    .all(app.config.passport.authenticate())
    .post(app.api.controllers.buildingEmployeeController.save);

  app
    .route('/buildingEmployee/:id')
    .all(app.config.passport.authenticate())
    .delete(app.api.controllers.buildingEmployeeController.remove)
    .put(app.api.controllers.buildingEmployeeController.update);

  app
    .route('/payment')
    .all(app.config.passport.authenticate())
    .post(app.api.controllers.paymentController.save)
    .get(app.api.controllers.paymentController.getAllPayment);

  app
    .route('/payment/:id')
    .all(app.config.passport.authenticate())
    .delete(app.api.controllers.paymentController.remove);
};
