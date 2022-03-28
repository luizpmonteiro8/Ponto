const request = require('supertest');
const app = require('../index');
const db = require('../config/db');
const config = require('../knexfile.js');
const error = require('../api/services/throwError');
const { getTracker } = require('knex-mock-client');

//db.context.raw = () => {};
app.db = db;
app.api = () => {};
app.api.services = () => {};
app.api.services.throwError = error;

const service = require('../api/services/jobService')(app);

jest.mock('../config/db', () => {
  const { Model } = require('objection');
  const knex = require('knex')({ client: require('knex-mock-client').MockClient });
  Model.knex(knex);
  module.exports = knex;
  return knex;
});

describe('Test the root path', () => {
  let tracker;

  beforeAll(() => {
    tracker = getTracker();
  });

  afterEach(() => {
    tracker.reset();
  });

  test('It should response the GET method', async () => {
    tracker.on.select('job').response({ id: 1, name: 'Servente' });
    const result = await service.getAllJob();
    expect(result).toStrictEqual({ id: 1, name: 'Servente' });
  });

  test('It should response the SAVE method', async () => {
    tracker.on.insert('job').response({ id: 1 });
    const result = await service.save({ name: 'Pedreiro' });
    expect(result).toStrictEqual({ id: 1 });

    const insertHistory = tracker.history.insert;

    expect(insertHistory).toHaveLength(1);
    expect(insertHistory[0].method).toEqual('insert');
    expect(insertHistory[0].bindings).toEqual(['Pedreiro']);
  });

  test('It should response the UPDATE method', async () => {
    tracker.on.update('job').response([]);
    const result = await service.update({ id: 1, name: 'Pedreiro' });
    expect(result).toStrictEqual(undefined);

    const updateHistory = tracker.history.update;

    expect(updateHistory).toHaveLength(1);
    expect(updateHistory[0].method).toEqual('update');
    expect(updateHistory[0].bindings).toEqual([1, 'Pedreiro', 1]);
  });

  test('It should response the REMOVE method', async () => {
    tracker.on.delete('job').response();
    const result = await service.getAllJob();
    expect(result).toStrictEqual(undefined);
  });
});
