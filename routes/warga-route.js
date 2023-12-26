var express = require('express');
var router = express.Router();
const warga = require('../controllers/warga-controller');
const catchAsync = require('../utils/catchAsync');

router.route('/')
  .get(catchAsync(warga.getOne))

router.route('/warga')
  .get(catchAsync(warga.getOne));



module.exports = router;
