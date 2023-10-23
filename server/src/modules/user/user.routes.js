const express = require('express');
const { updateUser, getUser , getMe, getAllUsers, deleteUser} = require('./user.controller');
const { protect, restrictTo } = require('../auth/auth.controller');
const router = express.Router();




// Protect All Routes
router.use(protect);


// GET Methods

router.route('/me').get(restrictTo(['superadmin' ,'admin' , 'teacher']),getMe, getUser);
router.route('/:id').get(restrictTo(['superadmin']), getUser);
router.route('').get(restrictTo(['superadmin']), getAllUsers)


// PUT Methods
router.route('/:id').put(restrictTo(['superadmin']), updateUser);


// DELETE Methods
router.route('/:id').delete(restrictTo(['superadmin']), deleteUser);





module.exports = router;
