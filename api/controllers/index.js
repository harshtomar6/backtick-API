const { 
  getAllClasses,
  getClass,
  addClass,
  getClassStudents,
  joinClass,
  joinClassByCode
} = require('./classController');

const {
  getAllColleges,
  getCollege,
  addCollege,
  modifyCollege,
  joinCollege,
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
  joinDepartment
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

module.exports = {
  getAllClasses,
  getClass,
  addClass,
  getClassStudents,
  joinClass,
  joinClassByCode,
  getAllColleges,
  getCollege,
  addCollege,
  modifyCollege,
  joinCollege,
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
  savePost
}