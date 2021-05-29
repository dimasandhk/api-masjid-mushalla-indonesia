const cheerio = require('cheerio');
const fetch = require('node-fetch');

const Provinsi = require('./list');
const mushallaEndpoint = 'https://simas.kemenag.go.id/page/search/mushalla/';

const serveMushalla = async (prov, page) => {
  const isValid = Provinsi.filter(nama => nama == prov);
  if (!isValid) return { error: 'Provinsi tidak ditemukan' };

  const index = Provinsi.findIndex(nama => nama == prov);
  const response = await fetch(`${mushallaEndpoint}${index + 1}/0/0/0/?p=${page}`);

  const html = await response.text();
  const $ = cheerio.load(html);

  // Maks Page
  const max = $('.badge-warning').text().split(' ')[0].replace('.', '');
  const maxPage = Math.floor(max / 30);

  if (page > maxPage) return { error: `Kamu telah sampai ke page terakhir` };

  // Link Map
  const mapList = ($('.search-results .btn-secondary').map(function () {
    return $(this).attr('href');
  }).get());

  // Nama Mushalla
  const mushallaName = $('.search-results h4').map(function () {
    return $(this).text();
  }).get();

  // Image Mushalla
  const image = $('.search-results img').map(function () {
    return $(this).attr('src');
  }).get();

  // Alamat
  let alamatList = [];
  $('.search-results p:nth-child(2)').each(function () {
    alamatList.push($(this).text());
  });

  const result = [];

  for (let i = 0; i < alamatList.length; i++) {
    result.push({
      nama: mushallaName[i],
      image: image[i],
      map: mapList[i],
      alamat: alamatList[i]
    });
  }

  return { data: result, page: maxPage };
};

module.exports = serveMushalla;