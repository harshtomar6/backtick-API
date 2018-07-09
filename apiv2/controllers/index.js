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
  getCollegeDepartments,
  getGroupStudents,
  joinGroup 
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

const {
  getAllPosts,
  getPostById,
  getPostsByPage,
  addPost,
  modifyPost,
  deletePost,
  likePost,
  commentOnPost
} = require('./postController');

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
  getSuperuser,
  getGroupStudents,
  getAllPosts,
  getPostById,
  getPostsByPage,
  addPost,
  modifyPost,
  likePost,
  deletePost,
  joinGroup,
  commentOnPost
}