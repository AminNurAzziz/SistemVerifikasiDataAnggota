const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WargaSchema = new Schema({
    niw: { type: String, unique: true },
    nama: { type: String, required: true },
    alamat: { type: String, required: true },
    tanggalLahir: { type: Date, required: true },
    tempatLahir: { type: String, required: true },
    jenisKelamin: { type: String, required: true },
    rayon: {
        type: Schema.Types.ObjectId,
        ref: 'Rayon',
        required: true
    },
    tahunPengesahan: { type: Date, required: true },
});

module.exports = mongoose.model('Warga', WargaSchema);

