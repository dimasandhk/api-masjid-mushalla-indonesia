const express = require('express');
const router = express.Router();

const list = require('../utils/list');
const searchMasjid = require('../utils/masjid');

router.get('/api/masjid/:provinsi', async (req, res) => {
  const { provinsi } = req.params;
  const { page } = req.query;

  if (!provinsi || !page) return res.send({
    error: 'Query Page dan atau Parameter Provinsi tidak boleh kosong'
  });

  const isValidProvince = list.find(prov => prov == provinsi);
  if (!isValidProvince) return res.send({
    error: 'Provinsi tidak ditemukan tolong cek list provinsi di endpoint utama (/)'
  });

  const result = await searchMasjid(provinsi, page);

  res.send({ note: 'Semakin tinggi angka pagenya semakin tidak lengkap datanya', error: result.error, provinsi: provinsi, maxPage: result.page, result: result.data, });
});

module.exports = router;