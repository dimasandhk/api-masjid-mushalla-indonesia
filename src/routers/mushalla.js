const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

const Provinsi = require('../utils/list');

router.get('/api/mushalla/:provinsi', (req, res) => {
  const { provinsi } = req.params;
  const { page } = req.query;

  if (!provinsi || !page) return res.send({
    error: 'Query Page dan atau Parameter Provinsi tidak boleh kosong'
  });

  const isValidProvince = Provinsi.find(prov => prov == provinsi);
  if (!isValidProvince) return res.send({
    error: 'Provinsi tidak ditemukan tolong cek list provinsi di endpoint utama (/)'
  });

  res.send({
    status: 'OK'
  });
});

module.exports = router;