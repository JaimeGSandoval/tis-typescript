import supertest from 'supertest';
import app from './app';

describe('Health check for server', () => {
  test('A GET request to / should have a status code of 200', async () => {
    await supertest(app).get('/v1/health-check').expect(200);
  });
});
