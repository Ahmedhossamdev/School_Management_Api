const express = require('express');
const {addStudentToSchool,getStudent , deleteStudent , updateStudent, getAllStudentsInSchool} = require("./student.controller");
const {protect, restrictTo} = require("../auth/auth.controller");
const {createStudentValidator} = require("./student.validator");
const {getAllStudentsInClassroom} = require("../classroom/classRoom.controller");
const router = express.Router();


router.use(protect);


router.route('').post(restrictTo(['admin']), createStudentValidator, addStudentToSchool);
router.route('/school/:id').get(restrictTo(['admin']), getAllStudentsInSchool);
router.route('/:id').get(restrictTo(['admin']), getStudent);


router.route('/:id').put(restrictTo(['admin']),createStudentValidator ,updateStudent);

router.route('/:id').delete(restrictTo(['admin']) ,deleteStudent);


module.exports = router;