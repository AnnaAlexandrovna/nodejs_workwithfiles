/* eslint-disable no-undef */
const { getFileId } = require('../../utils/getFileId');

describe('getFileId test:', () => {
  it('should return correct fileId (/files/562d3767dc9de07748098d2fd787412e)', () => {
    const req = { url: '/files/562d3767dc9de07748098d2fd787412e' };
    const fileId = getFileId(req);
    expect(fileId).toBe('562d3767dc9de07748098d2fd787412e');
  });
  it('should return error if it empty (/files/)', () => {
    const req = { url: '/files/' };
    const fileId = getFileId(req);
    expect(fileId).toBe('');
  });
});
