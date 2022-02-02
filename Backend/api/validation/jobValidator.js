const { check, validationResult } = require('express-validator');

exports.jobValidate = [
  check('name').trim().escape().not().isEmpty().withMessage('Cargo é um campo obrigatório!'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];
