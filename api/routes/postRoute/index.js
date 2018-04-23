const express = require('express');
const router = express.Router();
const postController = require('./../../controllers/postController');
const config = require('./../../../config');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// '/post' route
router.get('/', (req, res, next) => {
  postController.getAllPosts((err, data) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: data});
  });
});

// Test post route
router.get('/test', (req, res, next) => {
  postController.getTestPosts((err, data) => {
    if(err){
      console.log('sd');
      console.log(err);
      res.status(500).json({err: err, data: null});
    }else
      res.status(200).json({err: null, data: data});
  })
});

// '/post/:postid' route
router.get('/:postid', config.validateRequest, (req, res, next) => {
  postController.getPostById(req.params.postid, (err, data) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: data});
  })
});

// '/post' route to create new post
router.post('/', config.validateRequest, (req, res, next) => {
  console.log(req.body);
  postController.addPost(req.body, req.headers['x-key'], (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// '/post/:postid' route to delete post
router.delete('/:postid', config.validateRequest, (req, res, next) => {
  postController.deletePost(req.params.postid, (err, data) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: data});
  })
});



module.exports = router;