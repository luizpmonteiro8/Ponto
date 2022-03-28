const request = require('supertest');
const app = require('../index');
const service1 = require('../api/services/jobService');

let mockErrorService = false;

jest.mock('../api/services/jobService', () => {
  const service = jest.requireActual('../api/services/jobService');
  const getAllJob = () => {
    if (mockErrorService) {
      throw Error('Error');
    }
    return [{ id: 1, name: 'Pedreiro' }];
  };
  const save = () => {
    if (mockErrorService) {
      throw Error('Cargo já cadastrada!');
    }
    return [{ id: 1 }];
  };
  const remove = () => {
    if (mockErrorService) {
      throw Error('Id não encontrado');
    }
    return null;
  };
  const update = () => {
    if (mockErrorService) {
      throw Error('Id não encontrado');
    }
    return null;
  };

  const mockService = () => {
    return { getAllJob, save, remove, update };
  };

  return mockService;
});

const credential = {
  email: 'teste@teste.com.br',
  password: '12345678',
};

let token;

describe('Test the root path', () => {
  beforeAll(async () => {
    const response = await request('http://localhost:8080')
      .post('/signin')
      .send(credential)
      .set('Accept', 'application/json');
    token = response.header.authorization;
  });

  test('It should response the GET method', async () => {
    const response = await request('http://localhost:8080').get('/job').set('authorization', token);
    expect(response.statusCode).toBe(200);
  });

  test('It should response the SAVE method', async () => {
    const response = await request('http://localhost:8080')
      .post('/job')
      .send({ name: 'Servente' })
      .set('authorization', token);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ id: 1 });
  });

  test('It should response the UPDATE method', async () => {
    const response = await request('http://localhost:8080')
      .put('/job/1')
      .send({ name: 'Servente' })
      .set('authorization', token);
    expect(response.statusCode).toBe(204);
  });
  test('It should response the REMOVE method', async () => {
    const response = await request('http://localhost:8080')
      .delete('/job/1')
      .set('authorization', token);
    expect(response.statusCode).toBe(204);
  });

  test('It should throw error the GET method', async () => {
    mockErrorService = true;
    const response = await request('http://localhost:8080').get('/job').set('authorization', token);
    expect(response.statusCode).toBe(400);
  });

  test('It should throw error the SAVE method', async () => {
    mockErrorService = true;
    const response = await request('http://localhost:8080')
      .post('/job')
      .send({ name: 'Servente' })
      .set('authorization', token);
    expect(response.statusCode).toBe(400);
  });

  test('It should throw error the UPDATE method', async () => {
    mockErrorService = true;
    const response = await request('http://localhost:8080')
      .put('/job/1')
      .send({ name: 'Servente' })
      .set('authorization', token);
    expect(response.statusCode).toBe(400);
  });

  test('It should throw error the REMOVE method', async () => {
    mockErrorService = true;
    const response = await request('http://localhost:8080')
      .delete('/job/1')
      .set('authorization', token);
    expect(response.statusCode).toBe(400);
  });
});
