// Dependencies
const { 
  getAllColleges,
  addCollege, 
  addDepartment,
  getCollege, 
  getCollegeDepartments 
} = require('./groupController');

const {
  addAdmin,
  addStaff,
  addStudent,
  getUserById,
  getAllStudents,
  addSuperuser,
  getSuperuser
} = require('./userController');

module.exports = {
  getAllColleges,
  addCollege,
  addDepartment,
  getCollege,
  getCollegeDepartments,
  addAdmin,
  addStaff,
  addStudent,
  getUserById,
  getAllStudents,
  addSuperuser,
  getSuperuser
}