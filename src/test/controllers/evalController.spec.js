/* eslint-disable no-undef */
const request = require('supertest');
const { createServerForTest } = require('../../utils/cluster/createWorkerInstance');
const { longString } = require('./longString');

describe('evalController test:', () => {
  it('should return error if body is empty', (done) => {
    request(createServerForTest())
      .post('/eval')
      .expect('Content-Type', 'text/plain')
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return string if result is number', (done) => {
    request(createServerForTest())
      .post('/eval')
      .send('function addTwoNumbers(firstNumber,lastNumber){ return firstNumber + lastNumber;};addTwoNumbers(20,40);')
      .expect('Content-Type', 'text/plain')
      .expect(200, '60')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return string if result is boolean', (done) => {
    request(createServerForTest())
      .post('/eval')
      .send('1===1')
      .expect('Content-Type', 'text/plain')
      .expect(200, 'true')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return string if result is bigint', (done) => {
    request(createServerForTest())
      .post('/eval')
      .send('const sameBigint = BigInt("1234567890123456789012345678901234567890"); sameBigint;')
      .expect('Content-Type', 'text/plain')
      .expect(200, '1234567890123456789012345678901234567890')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return string if result is undefined', (done) => {
    request(createServerForTest())
      .post('/eval')
      .send('console.log(12)')
      .expect('Content-Type', 'text/plain')
      .expect(200, 'undefined')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return string if result is string', (done) => {
    request(createServerForTest())
      .post('/eval')
      .send('let name = "john doe";name;name+" is a student at Stanford"')
      .expect('Content-Type', 'text/plain')
      .expect(200, 'john doe is a student at Stanford')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return string if result is string', (done) => {
    request(createServerForTest())
      .post('/eval')
      .send('let name = "john doe";name;name+" is a student at Stanford"')
      .expect('Content-Type', 'text/plain')
      .expect(200, 'john doe is a student at Stanford')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return string if result is error', (done) => {
    request(createServerForTest())
      .post('/eval')
      .send('this.constructor.constructor("return process")().exit()')
      .expect('Content-Type', 'text/plain')
      .expect(200, 'EvalError: Code generation from strings disallowed for this context')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return string if timeout error', (done) => {
    request(createServerForTest())
      .post('/eval')
      .send('while(true){1+1;}')
      .expect('Content-Type', 'text/plain')
      .expect(200, 'Error: Script execution timed out after 3000ms')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return string if module is not resolve', (done) => {
    request(createServerForTest())
      .post('/eval')
      .send('execSync(`ps -ef`)')
      .expect('Content-Type', 'text/plain')
      .expect(200, 'ReferenceError: execSync is not defined')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return string if command try to modify process', (done) => {
    request(createServerForTest())
      .post('/eval')
      .send('process.exit(1)')
      .expect('Content-Type', 'text/plain')
      .expect(200, 'ReferenceError: process is not defined')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return string if result is function', (done) => {
    request(createServerForTest())
      .post('/eval')
      .send('function addTwoNumbers(firstNumber,lastNumber){ return firstNumber + lastNumber;};addTwoNumbers')
      .expect('Content-Type', 'text/plain')
      .expect(200, 'function addTwoNumbers(firstNumber,lastNumber){ return firstNumber + lastNumber;}')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return string if result is null', (done) => {
    request(createServerForTest())
      .post('/eval')
      .send('null')
      .expect('Content-Type', 'text/plain')
      .expect(200, 'null')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return string if result is object', (done) => {
    request(createServerForTest())
      .post('/eval')
      .send('let obj = {test: [123, 1, 4], test: [123, 1, 4]}; obj;')
      .expect('Content-Type', 'text/plain')
      .expect(200, '{"test":[123,1,4]}')
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
