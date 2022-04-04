/* eslint-disable no-undef */
const request = require('supertest');
const { createServerForTest } = require('../../utils/cluster/createWorkerInstance');

describe('postFile test:', () => {
  it('should return error if request without header', (done) => {
    request(createServerForTest())
      .post('/files')
      .send('qwerty')
      .expect('Content-Type', 'text/plain')
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  
  it('should return 201 if header correct', (done) => {
    request(createServerForTest())
      .post('/files')
      .send('qwerty')
      .set('X-Secret-Key', 'pncaskdbvasbvlaslslasfhj')
      .expect('Content-Type', 'text/plain')
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should return 400 if header correct, but body is empty', (done) => {
    request(createServerForTest())
      .post('/files')
      .set('X-Secret-Key', 'pncaskdbvasbvlaslslasfhj')
      .expect('Content-Type', 'text/plain')
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
