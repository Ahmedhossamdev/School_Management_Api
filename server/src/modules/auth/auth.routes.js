const express = require('express');
const { signup, signin, refreshToken ,logout} = require("./auth.controller");
const { signupValidator , signInValidator  } = require("./auth.validator");
const router = express.Router();


/**
 * POST Routs
 */
router.route('/signup').post( signupValidator , signup);
router.route('/signin').post( signInValidator , signin);
router.route('/refresh-token').post(refreshToken);



router.route('/logout').delete(logout);



module.exports = router;