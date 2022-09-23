import supertest from 'supertest';

import app from './app';

describe('TEST API', () => {
  describe('A GET request to /', () => {
    it('should have a status code of 200', async () => {
      await supertest(app).get('/').expect('Content-Type', /json/).expect(200);
    });
  });
});
