/* eslint-disable no-undef */
const request = require('supertest');
const { createServerForTest } = require('../../utils/cluster/createWorkerInstance');

describe('notFoundRoutController test:', () => {
  it('should return error if get non-existent route', (done) => {
    request(createServerForTest())
      .get('/files')
      .expect('Content-Type', 'text/plain')
      .expect(404, 'Selected route not found!')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return error if post non-existent route', (done) => {
    request(createServerForTest())
      .post('/file')
      .expect('Content-Type', 'text/plain')
      .expect(404, 'Selected route not found!')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
