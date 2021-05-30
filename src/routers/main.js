const express = require('express');
const router = express.Router();

const list = require('../utils/list');

router.get('/', (req, res) => {
  res.send({
    creator: 'dimasandhk (Github)',
    endpoints: {
      masjid: { path: '/api/masjid/:provinsi', contoh: '/api/masjid/jakarta?page=1' },
      mushalla: { path: '/api/mushalla:provinsi', contoh: '/api/mushalla/jakarta?page=1' }
    },
    query: {
      page: { required: true },
      detail: { required: false, default: true, note: 'Di Endpoint Mushalla tidak terdapat detail karena sebagian besar detail mushalla kosong' }
    },
    listProvinsi: list
  });
});

router.get('/list-provinsi', (req, res) => {
  res.send({ list });
});

module.exports = router;