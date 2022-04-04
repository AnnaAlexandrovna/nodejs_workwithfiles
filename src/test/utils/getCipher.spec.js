/* eslint-disable no-undef */
const {
  getCipher, ivSize, algorithm, getIV,
} = require('../../utils/getCipher');
const { appConfiguration } = require('../../../appConfiguration');

describe('getCipher test:', () => {
  it('should return cipher with correct key', () => {
    const cipher = getCipher('pncaskdbvasbvlaslslasfhj', getIV());
    expect(cipher).toBeDefined();
  });

  it('should not return cipher with incorrect key', () => {
    let cipher;
    try {
      cipher = getCipher('pncaskdbvasbvlaslslasfh', getIV());
    } catch (e) {
      expect(cipher).toBeUndefined();
    }
  });

  it('should not return cipher without key', () => {
    let cipher;
    try {
      cipher = getCipher(undefined, getIV());
    } catch (e) {
      expect(cipher).toBeUndefined();
    }
  });

  it('should have correct ivSize', () => {
    expect(ivSize).toBe(parseInt(appConfiguration.IV_SIZE, 10));
  });

  it('should have correct algorithm', () => {
    expect(algorithm).toBe(appConfiguration.ALGORITHM);
  });
});
