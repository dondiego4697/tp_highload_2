'use strict';

const fs = require('fs');
const PORT = process.env.PORT || 3000;
const express = require('express');
const hardRequestMiddleware = require('./middlewares/hardrequest');

const app = express()
    .get('/ping', (req, res) => {
        res
            .set('Content-Type', 'text/plain')
            .status(200)
            .send('ok');
    })
    .use('/hardrequest/', hardRequestMiddleware)
    .get('/clear-log', (req, res) => {
        fs.unlink(__dirname + '/../log-data.log', (err) => {
            let result = 'ok';
            if (err) result = err;
            res
                .set('Content-Type', 'text/plain')
                .status(200)
                .send(result);
        });
    });

const server = app.listen(PORT, () => {
    console.log(`Server listen ${PORT} port`);
});
const int = require('os').networkInterfaces();
process.env.ADDRESSX = int[Object.keys(int)[0]][0].address.split('.').join('_');
console.log(process.env.ADDRESSX);
