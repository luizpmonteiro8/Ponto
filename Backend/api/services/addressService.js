module.exports = (app) => {
  const getAddressById = (id) => {
    app
      .db('address')
      .where({ id: id })
      .then((address) => {
        return address;
      })
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  const save = (address) => {
    delete address.id;
    return app
      .db('address')
      .insert(address)
      .returning('id')
      .then((id) => {
        return id[0];
      })
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  const remove = (id) => {
    app
      .db('address')
      .where({ id })
      .del()
      .then((rowsDeleted) => {
        if (rowsDeleted == 0) {
          throw Error('O id ' + id + ' não foi encontrado');
        }
      })
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  const update = (address) => {
    app
      .db('address')
      .where({ id: address.id })
      .update(address)
      .catch((e) => app.api.services.throwError(e));
  };

  return { getAddressById, save, remove, update };
};
