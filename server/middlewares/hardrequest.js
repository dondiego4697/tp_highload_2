const log4js = require('log4js');
const imgGen = require('js-image-generator');
const sendMetrica = require('../src/metrica');
const cpuLoader = require('../src/cpu-loader');

log4js.configure({
    appenders: { data: { type: 'file', filename: 'log-data.log' } },
    categories: { default: { appenders: ['data'], level: 'debug' } }
});
const logger = log4js.getLogger('data');

module.exports = (req, res) => {
    const date = new Date();
    const currDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}#` +
        `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`;

    const width = Math.round(Math.random() * (800 - 400) + 400);
    const height = Math.round(Math.random() * (800 - 400) + 400);
    const quality = Math.round(Math.random() * (40 - 10) + 10);
    imgGen.generateImage(width, height, quality, (err, image) => {
        res
            .set('Content-Type', 'image/jpeg')
            .status(200)
            .send(image.data);

        cpuLoader().then(res => {
            const result = `${currDate}@${res.percent}@${new Date() - date}`;
            sendMetrica(new Date() - date, res.percent);
            logger.info(result);
        });
    });
};