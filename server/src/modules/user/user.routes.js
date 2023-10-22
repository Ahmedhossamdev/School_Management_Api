const express = require('express');
const { updateUserRole } = require('./user.controller');
const { protect, restrictTo } = require('../auth/auth.controller');
const router = express.Router();

router.route('/role/:id').put(protect,restrictTo(['superadmin']), updateUserRole);
module.exports = router;
