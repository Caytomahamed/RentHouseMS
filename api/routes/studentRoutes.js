const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.route('/').get(studentController.getAllStudents);

router
  .route('/:id')
  .get(studentController.getStudentById)
  .patch(studentController.updateStudent);

module.exports = router;
