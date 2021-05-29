const express = require('express');
const router = express.Router();

const list = require('../utils/list');

router.get('/', (req, res) => {
  res.send({
    creator: 'dimasandhk (Github)',
    endpoints: {
      masjid: { path: '/api/masjid/:provinsi' },
      mushalla: { path: '/api/mushalla:provinsi' }
    },
    query: {
      page: { eg: "/api/masjid/dkijakarta?page=21" }
    },
    listProvinsi: list
  });
});

module.exports = router;