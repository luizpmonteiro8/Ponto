const { authSecret } = require('../../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
  const signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ status: 400, message: 'Dados incompletos!' });
    }

    const user = await app.db('users').whereRaw('LOWER(email) = LOWER(?)', req.body.email).first();

    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).send({ status: 400, message: 'A senha informada é inválida!' });
        }

        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        res.set({ 'Access-Control-Expose-Headers': 'authorization' });
        res.set({ authorization: 'Bearer ' + jwt.encode(payload, authSecret) });
        res.sendStatus(204);
      });
    } else {
      res.set({ status: 400, message: 'Usuário não cadastrado!' });
      res.sendStatus(400);
    }
  };

  return { signin };
};
