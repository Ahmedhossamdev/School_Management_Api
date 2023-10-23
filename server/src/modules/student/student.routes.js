const express = require('express');
const {addStudentToSchool,getStudent , deleteStudent , updateStudent, getAllStudentsInSchool} = require("./student.controller");
const {protect, restrictTo} = require("../auth/auth.controller");
const {createStudentValidator, updateStudentValidator} = require("./student.validator");


const router = express.Router();


router.use(protect);



// POST Methods
router.route('').post(restrictTo(['admin']), createStudentValidator, addStudentToSchool);

// GET Methods
router.route('/school/:id').get(restrictTo(['admin']), getAllStudentsInSchool);
router.route('/:id').get(restrictTo(['admin']), getStudent);

// PUT Methods
router.route('/:id').put(restrictTo(['admin']),updateStudentValidator ,updateStudent);

// DELETE Methods
router.route('/:id').delete(restrictTo(['admin']) ,deleteStudent);


module.exports = router;