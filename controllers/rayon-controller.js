const Rayon = require('../models/rayon-schema');
const Warga = require('../models/warga-schema');

class rayonController {
    static async getAllRayon(req, res, next) {
        const rayon = await Rayon.find({});
        res.render('get-all-rayon', { rayon });
    }

    static async create(req, res, next) {
        const rayon = new Rayon(req.body);
        await rayon.save();
        req.flash('success', 'Successfully made a new rayon!');
        res.redirect(`/rayon/rayon`);
    }

    static async formCreate(req, res, next) {
        res.render('form-add-rayon');
    }

    static async update(req, res, next) {
        const rayonUpadte = req.body;
        const { id } = req.params;
        console.log(rayonUpadte);
        const updatee = await Rayon.findByIdAndUpdate(id, rayonUpadte, { new: true });
        if (!updatee) {
            res.status(404).json({ message: 'Rayon not found' });
        }
        req.flash('success', 'Successfully updated rayon!');
        res.redirect(`/rayon/rayon`);
    }

    static async delete(req, res, next) {
        const { id } = req.params;
        const deleted = await Rayon.findByIdAndDelete(id);
        const deleteWarga = await Warga.deleteMany({ rayon: id });
        if (!deleted) {
            res.status(404).json({ message: 'Rayon not found' });
        }
        req.flash('success', 'Successfully deleted rayon!');
        res.redirect('/rayon/rayon');
    }

}

module.exports = rayonController;