const express = require('express');
const {createSchool, getAllSchools, getSchool, updateSchool, deleteSchool} = require("./school.controller");
const {createSchoolValidator, updateSchoolValidator} = require("./school.validator");
const {protect, restrictTo} = require("../auth/auth.controller");
const router = express.Router();


router.use(protect);
router.route('').post(restrictTo(['superadmin']),createSchoolValidator ,createSchool);

router.route('').get(restrictTo(['superadmin']), getAllSchools);
router.route('/:id').get(restrictTo(['superadmin']), getSchool);

router.route('/:id').put(restrictTo(['superadmin']),updateSchoolValidator ,updateSchool);

router.route('/:id').delete(restrictTo(['superadmin']) ,deleteSchool);

module.exports = router;