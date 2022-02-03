const bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
  const getHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => callback(hash));
    });
  };

  const save = (req, res) => {
    getHash(req.body.password, (hash) => {
      const password = hash;

      app
        .db('users')
        .insert({
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          password,
        })
        .returning('id')
        .then((id) => res.status(200).send(id[0]))
        .catch((e) =>res.status(400).json({ status: 400, message: e.message }));
    });
  };

  return { save };
};
