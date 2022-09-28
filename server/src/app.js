/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { data } = require('../db/models');

const { sequelize } = require('../db/models');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PORT } = process.env;

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

app.get('/getData', async (req, res) => {
  try {
    const dataQ = await data.findAll({ raw: true });
    res.status(200).send(dataQ);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой установлено!');
  } catch (err) {
    console.log(err, 'Error!');
  }
  console.log(`Сервер поднят на ${PORT} порту!`);
});
