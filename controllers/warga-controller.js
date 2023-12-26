const Warga = require('../models/warga-schema');
const Rayon = require('../models/rayon-schema');
const moment = require('moment');
class wargaController {
    static async dashboardAdmin(req, res, next) {

        const warga = await Warga.find({}).populate('rayon');
        const rayon = await Rayon.find({});
        console.log(warga);
        res.render('dashboard', { warga, rayon });
    }

    static async getAllWarga(req, res, next) {
        const warga = await Warga.find({}).populate('rayon');
        const tahunPengesahan = moment(warga.tahunPengesahan).format('YYYY');
        const tanggalLahir = moment(warga.tanggalLahir).format('DD-MM-YYYY');

        const formattedWargaArray = warga.map((warga) => {
            const tahunPengesahan = moment(warga.tahunPengesahan).format('YYYY');
            const tanggalLahir = moment(warga.tanggalLahir).format('DD-MM-YYYY');
            return {
                ...warga._doc,
                tahunPengesahan,
                tanggalLahir,
            };
        });
        res.render('get-all-warga', { warga: formattedWargaArray });
    }

    static async create(req, res, next) {
        const warga = new Warga(req.body);

        await warga.save();
        req.flash('success', 'Successfully made a new warga!');
        res.redirect(`/admin/warga`);
        // res.redirect(`/warga/${warga._id}`);
    }

    static async formCreate(req, res, next) {
        const rayon = await Rayon.find({});
        res.render('form-add-warga', { rayon });
    }

    static async update(req, res, next) {
        const wargaUpadte = req.body;
        const { id } = req.params;
        const updatee = await Warga.findByIdAndUpdate(id, wargaUpadte, { new: true });
        if (!updatee) {
            res.status(404).json({ message: 'Warga not found' });
        }
        req.flash('success', 'Successfully updated warga!');
        res.redirect(`/admin/warga`);
    }

    static async delete(req, res, next) {
        console.log("masuk delete");
        const { id } = req.params;
        const deleted = await Warga.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({ message: 'Warga not found' });
        }
        req.flash('success', 'Successfully deleted warga!');
        res.redirect('/admin/warga');
    }


    static async getOne(req, res, next) {
        const niw = req.query.niw || '0';
        if (niw === '0') {
            res.render('verifikasi', { warga: "empty" });
        } else {
            try {
                const warga = await Warga.findOne({ niw }).populate('rayon');

                if (!warga) {
                    console.log('Warga not found');
                    res.render('verifikasi', { warga: null });
                } else {
                    // Memformat tahunPengesahan ke format tahun saja
                    const tahunPengesahan = moment(warga.tahunPengesahan).format('YYYY');

                    // Memformat tanggal lahir ke format dd-mm-yyyy
                    const tanggalLahir = moment(warga.tanggalLahir).format('DD-MM-YYYY');

                    const formattedWarga = {
                        ...warga._doc,
                        tahunPengesahan,
                        tanggalLahir,
                    };

                    console.log(formattedWarga);
                    res.render('verifikasi', { warga: formattedWarga });
                }
            } catch (error) {
                console.error(error);
                next(error);
            }
        }
    }
}

module.exports = wargaController;