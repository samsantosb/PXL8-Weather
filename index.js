require('dotenv').config();
const express = require('express');

const { envs } = require('./src/envs/api.envs');

const { mainService } = require('./src/services/main.service');

const app = express();

app.use(express.static('assets'));

app.get('/', mainService);

app.listen(envs.PORT, () => {
    console.log(`Example app listening at http://localhost:${envs.PORT}`);
});