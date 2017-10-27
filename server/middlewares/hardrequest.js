const log4js = require('log4js');
const imgGen = require('js-image-generator');

log4js.configure({
    appenders: { data: { type: 'file', filename: 'log-data.log' } },
    categories: { default: { appenders: ['data'], level: 'debug' } }
});
const logger = log4js.getLogger('data');

module.exports = (req, res) => {
    const width = Math.round(Math.random() * (2000 - 500) + 500);
    const height = Math.round(Math.random() * (2000 - 500) + 500);
    const quality = Math.round(Math.random() * (2000 - 500) + 500);
    imgGen.generateImage(width, height, quality, function(err, image) {
        res
            .set('Content-Type', 'image/jpeg')
            .status(200)
            .send(image.data);
    });
};