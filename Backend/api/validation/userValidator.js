const { check, validationResult } = require('express-validator');

exports.userValidator = [
  check('name').trim().escape().not().isEmpty().withMessage('Nome é um campo obrigatório!'),
  check('email').isEmail().withMessage('Email inválido!'),
  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage('Senha deve ter no minimo 8 caracteres!'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];
