const { check, validationResult } = require('express-validator');

exports.entryValidator = [
  check('type').trim().escape().not().isEmpty().withMessage('Tipo é obrigátorio!'),
  check('dateTime').isISO8601().toDate().not().isEmpty().withMessage('Data é obrigátorio!'),
  check('employeeId').isNumeric().withMessage('O cargo é um campo obrigatório'),
  check('buildingId').isNumeric().withMessage('O obra é um campo obrigatório'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];
