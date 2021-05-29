const express = require('express');
const router = express.Router();

const Provinsi = require('../utils/list');
const searchMushalla = require('../utils/mushalla');

router.get('/api/mushalla/:provinsi', async (req, res) => {
  const { provinsi } = req.params;
  const { page } = req.query;

  if (!provinsi || !page) return res.send({
    error: 'Query Page dan atau Parameter Provinsi tidak boleh kosong'
  });

  const isValidProvince = Provinsi.find(prov => prov == provinsi);
  if (!isValidProvince) return res.send({
    error: 'Provinsi tidak ditemukan tolong cek list provinsi di endpoint utama (/)'
  });

  const result = await searchMushalla(provinsi, page);

  res.send({ note: 'Semakin tinggi angka pagenya semakin tidak lengkap datanya', error: result.error, provinsi: provinsi, maxPage: result.page, result: result.data, });
});

module.exports = router;