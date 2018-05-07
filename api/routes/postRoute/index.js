const express = require('express');
const router = express.Router();
const controller = require('./../../controllers');
const config = require('./../../../config');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/post' route
router.get('/', (req, res, next) => {
  controller.getAllPosts((err, status, posts) => {
    res.status(status).json({err: err, data: posts});
  })
});

// GET '/post/page/:pageNumber' route to paginate posts
router.get('/page/:pageNumber', (req, res, next) => {
  controller.getPostsByPage(1, (err, posts) => {
    if(err)
      res.status(500).send({err: err, data: null});
    else
      res.status(200).send({err: null, data: posts});
  })
});

// Test post route
//router.get('/test', postController.getTestPosts);

// GET '/post/:postid' route
router.get('/:postid', config.validateRequest, (req, res, next) => {
  controller.getPostById(req.params.postid, (err, data) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: data});
  })
});

// POST '/post' route to create new post
router.post('/', config.validateRequest, (req, res, next) => {
  console.log(req.body);
  controller.addPost(req.body, req.headers['x-key'], (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// PUT '/post/:postId' route to modify a post
router.put('/:postId', config.validateRequest, (req, res, next) => {
  controller.modifyPost(req.params.postId, req.headers['x-key'], req.body, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
});

// DELETE '/post/:postid' route to delete post
router.delete('/:postId', config.validateRequest, (req, res, next) => {
  controller.deletePost(req.params.postId, (err, data) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: data});
  })
});

// POST '/post/:postId/like' route to like a post
router.post('/:postId/like', config.validateRequest, (req, res, next) => {
  controller.likePost(req.params.postId, req.headers['x-key'], (err, status, success) => {
    res.status(status).json({err: err, data: success});
  })
});

// POST '/post/:postId/comment' route to comment on a post
router.post('/:postId/comment', config.validateRequest, (req, res, next) => {
  controller.commentOnPost(req.params.postId, {
      text: req.body.text, 
      ownerid: req.headers['x-key']
    }, (err, status, success) => {
      res.status(status).json({err: err, data: success});
    });
});


module.exports = router;