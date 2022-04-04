const convertResultToString = (result) => {
  switch (typeof result) {
    case 'undefined':
      return 'undefined';
    case 'string':
      return result;
    case 'number':
    case 'boolean':
    case 'bigint':
    case 'symbol':
      return result.toString();
    case 'function':
      return result.toString();
    case 'object':
      return JSON.stringify(result);
    default:
      throw new Error(`Cannot render result: Unsupported type "${typeof result}"`);
  }
};
module.exports = ({ convertResultToString });
