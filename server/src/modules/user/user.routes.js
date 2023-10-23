const express = require('express');
const { updateUserRole, getUser , getMe, getAllUsers} = require('./user.controller');
const { protect, restrictTo } = require('../auth/auth.controller');
const router = express.Router();




// Protect All Routes
router.use(protect);


// GET Methods

router.route('/me').get(getMe, getUser);
router.route('/:id').get(restrictTo(['superadmin']), getUser);
router.route('').get(restrictTo(['superadmin']), getAllUsers)


// PUT Methods
router.route('/role/:id').put(restrictTo(['superadmin']), updateUserRole);







module.exports = router;
