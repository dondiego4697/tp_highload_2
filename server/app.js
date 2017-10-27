'use strict';

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
    .use('/hardrequest/', hardRequestMiddleware);

app.listen(PORT, () => {
    console.log(`Server listen ${PORT} port`)
});