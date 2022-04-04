/* eslint-disable no-undef */
const request = require('supertest');
const { createServerForTest } = require('../../utils/cluster/createWorkerInstance');

describe('getFile test:', () => {
  it('should return error if get with empty file name', (done) => {
    request(createServerForTest())
      .get('/files/')
      .expect('Content-Type', 'text/plain')
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
