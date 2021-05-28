const express = require('express');
const router = express.Router();

const list = require('../utils/list');

router.get('/api/masjid/:provinsi', (req, res) => {
  const { provinsi } = req.params;
  if (!provinsi) return res.send({ error: "Parameter provinsi tidak boleh kosong" });

  const isValidProvince = list.find(prov => prov == provinsi);

  if (!isValidProvince) return res.send({
    error: 'Provinsi tidak ditemukan tolong cek list provinsi di endpoint utama (/)'
  });

  res.send({
    msg: provinsi,
    isValidProvince
  });
});

module.exports = router;