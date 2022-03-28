module.exports = (app) => {
  const getAllJob = () => {
    return app
      .db('job')
      .orderBy('id')
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  const save = (job) => {
    delete job.id;

    return app
      .db('job')
      .insert(job)
      .returning('id')
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  const remove = (id) => {
    return app
      .db('job')
      .where({ id })
      .del()
      .then((rowsDeleted) => {
        if (rowsDeleted == 0) throw Error('O id ' + id + ' não foi encontrado');
      })
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  const update = (job) => {
    return app
      .db('job')
      .where({ id: job.id })
      .update(job)
      .then((result) => {
        if (result == 0) throw Error('O id ' + job.id + ' não foi encontrado');
      })
      .catch((e) => {
        app.api.services.throwError(e);
      });
  };

  return { getAllJob, save, remove, update };
};
