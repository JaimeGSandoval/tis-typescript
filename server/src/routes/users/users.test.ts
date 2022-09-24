import supertest from 'supertest';
import app from '../../app';

describe('Users API endpoint', () => {
  test('GET /v1/users should have a status code of 200', async () => {
    await supertest(app).get('/v1/users').expect(200);
  });

  test('GET /v1/users should have a content type of json', async () => {
    await supertest(app).get('/v1/users').expect('Content-Type', /json/);
  });
});
