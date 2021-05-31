# ☪ Data Masjid & Mushalla Indonesia
Rest api yang berisi data masjid & mushalla di Indonesia **terlengkap**
<p>
<a href="https://github.com/dimasandhk"><img title="Pembuat" src="https://img.shields.io/badge/Pembuat-Dimas Andhika-informational.svg?style=for-the-badge&logo=github"></a>
</p>
<hr>

## **Documentation**
#### **Note : Semakin tinggi angka pagenya semakin tidak lengkap datanya**
#### URL : `masjid-mushalla-indonesia.herokuapp.com`
<hr>

### **Menu dan Endpoint**

| Menu | Penjelasan | Endpoint | Opsi |
| -------- | ----- | ------ | ---- |
| List Provinsi | Menampilkan List Provinsi yang tersedia untuk data masjid dan mushalla | `/list-provinsi` | - |
| Data Masjid | Menampilkan Data Masjid per Provinsi | `/api/masjid/:provinsi?page={angka}&detail={(Optional)true / false}` | Query Detail, (secara default true) |
| Data Mushalla | Menampilkan Data Mushalla per Provinsi | `/api/mushalla/:provinsi?page={angka}` | Detail Info tidak tersedia |
<hr>

## **Saran**
Kalo ada saran misalnya tampilin masjid berdasarkan kabupaten / kota, dll bisa langsung bikin issue aja. Kalo ada yang nemu bug bisa langsung bikin issue juga atau bisa langsung ajuin pull request
