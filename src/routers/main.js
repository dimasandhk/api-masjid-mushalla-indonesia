const express = require('express');
const routes = express.Router();

const list = require('../utils/list');

routes.get('/', (req, res) => {
  res.send({
    error: false,
    endpoints: {
      masjid: { path: '/api/masjid/:provinsi' },
      mushalla: { path: '/api/mushalla:provinsi' }
    },
    query: {
      page: { eg: "/api/masjid/dkijakarta?p=21" }
    },
    listProvinsi: list
  });
});

module.exports = routes;