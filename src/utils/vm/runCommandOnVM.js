const { createVM } = require('./createVM');
const { convertResultToString } = require('./convertResultToString');

const runCommand = (command) => {
  const vm = createVM();
  try {
    const result = vm.run(command);
    return convertResultToString(result);
  } catch (err) {
    return err?.toString();
  }
};

module.exports = ({ runCommand });
