const { check, validationResult } = require('express-validator');

exports.employeeValidate = [
  check('name').trim().escape().not().isEmpty().withMessage('Nome é um campo obrigatório!'),
  check('salary').isFloat({ min: 0.01 }).withMessage('Salário deve ser informado!'),
  check('cpf').trim().escape().not().isEmpty().withMessage('Cpf é um campo obrigatório!'),
  check('jobId').isNumeric().withMessage('O cargo é um campo obrigatório'),

  check('address.street')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Rua é um campo obrigatório!'),
  check('address.number')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Número é um campo obrigatório!'),
  check('address.district')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Bairro é um campo obrigatório!'),
  check('address.city')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Cidade é um campo obrigatório!'),
  check('address.state')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Estado é um campo obrigatório!'),
  check('address.zipcode')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Cep é um campo obrigatório!'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];
