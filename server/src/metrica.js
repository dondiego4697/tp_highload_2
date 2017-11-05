const lynx = require('lynx');

const metrics = new lynx('45.55.166.7', 8125);
module.exports = async function sendMetrica(execTime) {
    metrics.gauge('test', execTime);
};