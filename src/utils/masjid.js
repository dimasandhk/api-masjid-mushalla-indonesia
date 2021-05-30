const cheerio = require('cheerio');
const fetch = require('node-fetch');

const Provinsi = require('./list');
const masjidEndpoint = 'https://simas.kemenag.go.id/page/search/masjid/';

const serveMasjid = async (prov, page, detail) => {
  const isValid = Provinsi.filter(nama => nama == prov);

  if (!isValid) return { error: 'Provinsi is not a valid' };

  const index = Provinsi.findIndex(nama => nama == prov);
  const response = await fetch(`${masjidEndpoint}${index + 1}/0/0/0/?p=${page}`);

  const html = await response.text();
  const $ = cheerio.load(html);

  // Maks Page
  const max = $('.badge-success').text().split(' ')[0].replace('.', '');
  const maxPage = Math.floor(max / 30);

  if (page > maxPage) return { error: `Kamu telah sampai ke page terakhir` };

  // // Detail
  const detailURL = $('.search-results .btn-info').map(function () {
    return $(this).attr('href');
  }).get();

  const getAllDetail = async (index) => {
    const detail = await fetch(detailURL[index]);
    const html = await detail.text();

    const _ = cheerio.load(html);
    return {
      detailAlamat: _('.masjid-alamat-location p').text().trim().replace(/\n|\r/g, "").replace(/\t|\s/g, " "),
      tahun: _('.masjid-alamat-calendar p:nth-child(2)').text(),
      telepon: _('.masjid-alamat .masjid-alamat-phone:nth-child(3) p').text(),
      email: _('.masjid-alamat .masjid-alamat-phone:nth-child(4) p').text(),
      website: _('.masjid-alamat .masjid-alamat-phone:nth-child(5) p').text(),
      profil: {
        luasTanah: _('.section-content .section-content-info-wrapper:nth-child(1) .row .col-12:nth-child(1) .row:nth-child(1) .label:nth-child(2)').text(),
        statusTanah: _('.section-content .section-content-info-wrapper:nth-child(1) .row .col-12:nth-child(1) .row:nth-child(2) .label:nth-child(2)').text(),
        luasBangunan: _('.section-content .section-content-info-wrapper:nth-child(1) .row .col-12:nth-child(2) .row:nth-child(1) .label:nth-child(2)').text(),
        dayaTampung: _('.section-content .section-content-info-wrapper:nth-child(1) .row .col-12:nth-child(2) .row:nth-child(2) .label:nth-child(2)').text()
      },
      dataOrang: {
        pengurus: _('.masjid-summary .col:nth-child(1) span').text(),
        imam: _('.masjid-summary .col:nth-child(2) span').text(),
        khatib: _('.masjid-summary .col:nth-child(3) span').text(),
        muadzin: _('.masjid-summary .col:nth-child(4) span').text(),
        remajaMasjid: _('.masjid-summary .col:nth-child(5) span').text(),
      }
    };
  };

  const detailArr = [];
  if (detail) {
    for (let i = 0; i < detailURL.length; i++) {
      detailArr.push(await getAllDetail(i));
    }
  }

  for (let i = 0; i < detailURL.length; i++) { detailArr.push(); }


  // Link Map
  const mapList = ($('.search-results .btn-secondary').map(function () {
    return $(this).attr('href');
  }).get());

  // Nama Masjid
  const masjidName = $('.search-results h4').map(function () {
    return $(this).text();
  }).get();

  // Image Masjid
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
      nama: masjidName[i],
      image: image[i],
      map: mapList[i],
      alamat: alamatList[i],
      detail: detailArr[i]
    });
  }

  return { data: result, page: maxPage };
};

module.exports = serveMasjid;
