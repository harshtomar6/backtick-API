const { 
  getAllClasses,
  getClass,
  addClass,
  getClassStudents,
  joinClass,
  joinClassByCode,
  joinClassStaff
} = require('./classController');

const {
  getAllColleges,
  getCollege,
  addCollege,
  modifyCollege,
  joinCollege,
  joinCollegeStaff,
  getCollegeDepartments,
  getCollegeClasses,
  getCollegeStudents,
  getCollegePosts
} = require('./collegeController');

const {
  getAllDepartments,
  getDepartment,
  getDepartmentClasses,
  getDepartmentStudents,
  addDepartment,
  joinDepartment,
  joinDepartmentStaff
} = require('./departmentController');

const { 
  getAllPosts,
  getPostById,
  getPostsByPage,
  addPost,
  modifyPost,
  deletePost,
  getTestPosts,
  addTestPost,
  likeTestPost,
  getOwnerPosts,
  getClassPosts,
  getDepartmentPosts,
  likePost,
  commentOnPost,
  savePost
} = require('./postController');

const {
  getAllStudents,
  getStudent,
  addStudent,
  addOrFindStudent,
  modifyStudent,
  setCR
} = require('./studentController');

const {
  getAllStaff,
  getStaff,
  addStaff,
  addOrFindStaff,
  modifyStaff
} = require('./staffController');

module.exports = {
  getAllClasses,
  getClass,
  addClass,
  getClassStudents,
  joinClass,
  joinClassStaff,
  joinClassByCode,
  getAllColleges,
  getCollege,
  addCollege,
  modifyCollege,
  joinCollege,
  joinCollegeStaff,
  getCollegeDepartments,
  getCollegeClasses,
  getCollegeStudents,
  getCollegePosts,
  getAllDepartments,
  getDepartment,
  getDepartmentClasses,
  getDepartmentStudents,
  getDepartmentPosts,
  addDepartment,
  joinDepartment,
  joinDepartmentStaff,
  getAllPosts,
  getPostById,
  getPostsByPage,
  addPost,
  modifyPost,
  deletePost,
  getTestPosts,
  addTestPost,
  likeTestPost,
  getOwnerPosts,
  getClassPosts,
  getDepartmentPosts,
  getCollegePosts,
  likePost,
  commentOnPost,
  getAllStudents,
  getStudent,
  addStudent,
  addOrFindStudent,
  modifyStudent,
  setCR,
  savePost,
  getAllStaff,
  getStaff,
  addStaff,
  addOrFindStaff,
  modifyStaff
}