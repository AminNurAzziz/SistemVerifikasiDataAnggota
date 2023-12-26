var express = require('express');
var router = express.Router();
const warga = require('../controllers/warga-controller');
const rayon = require('../controllers/rayon-controller');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../authmiddleware');


router.route('/')
  .get(isLoggedIn, catchAsync(warga.dashboardAdmin));


router.route('/warga')
  .get(isLoggedIn, catchAsync(warga.getAllWarga));

router.route('/warga/add')
  .get(isLoggedIn, catchAsync(warga.formCreate))
  .post(isLoggedIn, catchAsync(warga.create));


router.route('/warga/:id')
  .put(isLoggedIn, catchAsync(warga.update))
  .delete(isLoggedIn, catchAsync(warga.delete));

router.route('/rayon')
  .get(isLoggedIn, catchAsync(rayon.getAllRayon));

router.route('/rayon/add')
  .get(isLoggedIn, catchAsync(rayon.formCreate))
  .post(isLoggedIn, catchAsync(rayon.create));

router.route('/rayon/:id')
  .patch(isLoggedIn, catchAsync(rayon.update))
  .delete(isLoggedIn, catchAsync(rayon.delete));



module.exports = router;
