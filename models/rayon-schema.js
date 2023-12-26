const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RayonSchema = new Schema({
    ranting: { type: String, required: true },
    namaRayon: { type: String, required: true },
    namaKetuaRayon: { type: String, required: true },
    alamat: { type: String, required: true }
});

module.exports = mongoose.model('Rayon', RayonSchema);