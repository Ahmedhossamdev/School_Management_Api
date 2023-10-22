const express = require('express');
const { createClassroom, getAllClassrooms, getClassroom, updateClassroom, deleteClassroom, addStudentToClass } = require("./classroom.controller");
const { protect, restrictTo } = require("../auth/auth.controller");
const { createClassroomValidator } = require("./classroom.validator");
const {getAllStudentsInClassroom, removeStudentFromClass} = require("./classRoom.controller");
const router = express.Router();

router.use(protect);

router.route('').post(restrictTo(['admin']) , createClassroom);
router.route('/add-student').post(restrictTo(['admin']) , addStudentToClass);
router.route('/remove-student').put(restrictTo(['admin']) , removeStudentFromClass);
router.route('/:id/students').get(restrictTo(['admin']), getAllStudentsInClassroom);
router.route('/school/:id').get(restrictTo(['admin']), getAllClassrooms);
router.route('/:id').get(restrictTo(['admin']), getClassroom);
router.route('/:id').put(restrictTo(['admin']) , updateClassroom);
router.route('/:id').delete(restrictTo(['admin']), deleteClassroom);

module.exports = router;
