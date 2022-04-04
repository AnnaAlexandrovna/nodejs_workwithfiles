/* eslint-disable no-undef */
const masterInstance = require('../utils/cluster/createMasterInstance');
const { startApp } = require('../../index');

jest.mock('../utils/cluster/createMasterInstance', () => ({ createMasterInstance: jest.fn() }));
const createMasterInstanceMock = jest.fn();
masterInstance.createMasterInstance.mockImplementation(createMasterInstanceMock);

describe('index test:', () => {
  it('should call createMasterInstance once', () => {
    startApp();
    expect(createMasterInstanceMock).toHaveBeenCalledTimes(1);
  });
});
