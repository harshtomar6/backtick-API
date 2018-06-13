// Dependencies
const { 
  getAllColleges,
  addCollege, 
  addDepartment,
  addClass,
  getCollege, 
  getDepartment,
  getDepartmentClass,
  getCollegeClass,
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
  addClass,
  addDepartment,
  getCollege,
  getDepartment,
  getDepartmentClass,
  getCollegeClass,
  getCollegeDepartments,
  addAdmin,
  addStaff,
  addStudent,
  getUserById,
  getAllStudents,
  addSuperuser,
  getSuperuser
}