const express = require('express');
const { createClassroom,
    getAllClassroomsInSchool,
    getClassroom,
    updateClassroom,
    deleteClassroom,
    addStudentToClass
} = require("./classroom.controller");
const { protect, restrictTo } = require("../auth/auth.controller");
const { createClassroomValidator,
    addStudentToClassValidator,
    removeStudentFromClassValidator,
    updateClassroomValidator,
} = require("./classroom.validator");
const {getAllStudentsInClassroom, removeStudentFromClass} = require("./classroom.controller");

const router = express.Router();

router.use(protect);

router.route('').post(restrictTo(['admin']) , createClassroomValidator ,createClassroom);
router.route('/add-student').post(restrictTo(['admin']) , addStudentToClassValidator ,addStudentToClass);

router.route('/:id/students').get(restrictTo(['admin']), getAllStudentsInClassroom);
router.route('/school/:id').get(restrictTo(['admin']), getAllClassroomsInSchool);
router.route('/:id').get(restrictTo(['admin']), getClassroom);

router.route('/remove-student').put(restrictTo(['admin']) , removeStudentFromClassValidator ,removeStudentFromClass);
router.route('/:id').put(restrictTo(['admin']) , updateClassroomValidator,updateClassroom);

router.route('/:id').delete(restrictTo(['admin']), deleteClassroom);

module.exports = router;
