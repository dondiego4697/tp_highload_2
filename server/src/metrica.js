const lynx = require('lynx');

const metrics = new lynx('45.55.166.7', 8125);
module.exports = async function sendMetrica(execTime, cpu) {
    metrics.timing(`${process.env.ADDRESSX || '159_89_1_23'}.rps.collections`, execTime);
    metrics.gauge(`${process.env.ADDRESSX || '159_89_1_23'}.cpu.collections`, cpu);
};