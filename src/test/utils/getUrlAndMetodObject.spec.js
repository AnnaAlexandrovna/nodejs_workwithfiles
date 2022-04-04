/* eslint-disable no-undef */
const { getUrlAndMethodObject } = require('../../utils/getUrlAndMethodObject');

describe('getUrlAndMetodObject test:', () => {
  it('should return object with array of part url and GET method', () => {
    const req = {
      url: '/files/123',
      method: 'GET',
      headers: {
        host: 'localhost:5001',
      },
    };
    const { url, method } = getUrlAndMethodObject(req);
    expect(url).toStrictEqual(['', 'files', '123']);
    expect(method).toBe('GET');
  });
  it('should return object with array of part url and POST method ', () => {
    const req = {
      url: '/files',
      method: 'POST',
      headers: {
        host: 'localhost:5001',
      },
    };
    const { url, method } = getUrlAndMethodObject(req);
    expect(url).toStrictEqual(['', 'files']);
    expect(method).toBe('POST');
  });
  it('should return object with array [""] and req method', () => {
    const req = {
      url: '',
      method: 'POST',
      headers: {
        host: 'localhost:5001',
      },
    };
    const { url, method } = getUrlAndMethodObject(req);
    expect(url).toStrictEqual(['', '']);
    expect(method).toBe('POST');
  });
});
