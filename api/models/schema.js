// Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let collegeSchema = mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  phone: {type: String, required: true},
  website: {type: String, required: true},
  location: {
    lat: {type: Number, required: true},
    lon: {type: Number, required: true}
  },
  meta: {type: Object, required: true}, // Contains info about college
});

let departmentSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  collegeId: {type: String, required: true},
  meta: {type: Object, required: true, default: {}}
});

let classSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  departmentId: {type: String, required: true},
  collegeId: {type: String, required: true},
  classCode: {type: String, required: true, unique: true},
  meta: {type: Object, required: true, default: {}}
});

let studentSchema = mongoose.Schema({
  name: {type: String, default: 'none'},
  email: {type: String, default: 'none'},
  phone: {type: String, default: 'none'},
  password: {type: String, required: true},
  photoURL: {type: String, default: 'none'},
  providerData: {type: Array, default: ['email']},
  regNo: {type: String, default: 'none'},
  academicYear: {type: String, default: 'none'},
  isFresher: {type: Boolean, default: true},
  classId: {type: String, required: true, default: 'not joined'},
  departmentId: {type: String, required: true, default: 'not joined'},
  collegeId: {type: String, required: true, default: 'not joined'},
  isCR: {type: Boolean, requird: true, default: false},
  phoneVerified: {type: Boolean, required: true, default: false},
  emailVerified: {type: Boolean, required: true, default: false},
  termsAndConditions: {type: Boolean, default: false}
});

let staffSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  designation: {type: String, required: true},
  departmentId: {type: String},
  collegeId: {type: String, required: true},
});

let postSchema = mongoose.Schema({
  ownerId: {type: String, required: true},
  classId: {type: String, required: true},
  departmentId: {type: String, required: true},
  collegeId: {type: String, required: true},
  postedBy: {type: String, required: true}, // Should accept either Student or Staff
  likes: {type: Array, required: true, default: []}, // Array of Object id's of either Student or Staff 
  comments: {type: Array, required: true, default: []}, // Array of Comment id's
  text: {type: String, required: true}, // Text
  attachment: {type: Array, default: []}, // Array of {category: string, url: String}
  timestamp: {type: Date, default: Date.now},
  level: {type: Number, required: true, default: 10} // Levels Should accept one of these 10 | 20 | 30
});

let commentSchema = mongoose.Schema({
  text: {type: String, required: true},
  ownerid: {type: String, required: true},
  parentId: {type: String, required: true, default: 'none'},
  childrens: {type: Array, required: true, default: []} // Array of Comment Id's
});

let announcementSchema = mongoose.Schema({
  title: {type: String, required: true},
  level: {type: Number, required: true, default: 10},
  timestamp: {type: Date, default: Date.now},
  deadline: {type: Date},
  ownerid: {type: String, required: true}
});

let testPost = mongoose.Schema({
  text: {type: String, required: true},
  postedAt: {type: Date, default: Date.now},
  likes: {type: Number, default: 0}
})

// Hash methods for Students
studentSchema.methods.genHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

studentSchema.methods.compareHash = function(password){
  return bcrypt.compareSync(password, this.password);
}

module.exports = {
  collegeSchema,
  departmentSchema,
  classSchema,
  studentSchema,
  staffSchema,
  postSchema,
  announcementSchema,
  commentSchema,
  testPost
}