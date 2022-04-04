const { VM } = require('vm2');

const createVM = () => new VM({
  timeout: 3000,
  sandbox: {},
  eval: false,
});
module.exports = ({ createVM });
