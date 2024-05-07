const express = require(`express`)
const app = express()
const path = require('path');


const bukuController = require(`../controllers/buku-controller`)
// const { authorize } = require(`../controllers/auth-controller`)

app.use('/cover-image', express.static(path.join(__dirname, '..', 'cover-image')));
app.get(`/buku`, bukuController.getBuku)
app.post(`/buku`, bukuController.addBuku)
app.post(`/buku/find`, bukuController.filterBuku)
app.put(`/buku/:id_buku`, bukuController.updateBuku)
app.delete(`/buku/:id_buku`,bukuController.deleteBuku)

module.exports = app