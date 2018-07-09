// Dependencies
const express = require('express');
const router = express.Router();
const controller = require('./../controllers');
const { validateSuperuser, validateUser } = require('./../config');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/post' route
router.get('/', validateSuperuser, (req, res, next) => {
  controller.getAllPosts((err, status, posts) => {
    res.status(status).json({err: err, data: posts});
  })
});

// GET '/post/page/:pageNumber' route to paginate posts
router.get('/page/:pageNumber', validateSuperuser, (req, res, next) => {
  if(req.params.pageNumber < 1 )
    res.status(400).send({err: 'Please Enter Valid Page Number', data: null});
  else{
    let perPage = req.query.limit>0 ? parseInt(req.query.limit) : 10;
    controller.getPostsByPage(req.params.pageNumber, perPage, (err, posts) => {
      if(err)
        res.status(500).send({err: err, data: null});
      else
        res.status(200).send({err: null, data: posts});
    })
  }
});

// POST '/post' route to add new post
router.post('/', validateUser, (req, res, next) => {
  let {groups} = req.body;
  if(!groups || groups.length<1 || typeof groups == 'string')
    res.status(400).send({err: 'Invalid Group Param', data: null});
  else{
    controller.addPost(req.body, req.headers['x-key'], (err, status, data) => {
      res.status(status).send({err: err, data: data});
    })
  }
});

// PUT '/post/:postId' route to modify a post
router.put('/:postId', validateUser, (req, res, next) => {
  controller.modifyPost(req.params.postId, req.headers['x-key'], req.body, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
});

// DELETE '/post/:postid' route to delete post
router.delete('/:postId', validateUser, (req, res, next) => {
  controller.deletePost(req.params.postId, (err, data) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: data});
  });
});

// POST '/post/:postId/like' route to like a post
router.post('/:postId/like', validateUser, (req, res, next) => {
  controller.likePost(req.params.postId, req.headers['x-key'], (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
});

// POST '/post/:postId/comment' route to comment on a post
router.post('/:postId/comment', validateUser, (req, res, next) => {
  controller.commentOnPost(req.params.postId, req.body, req.headers['x-key'], 
    (err, status, success) => {
      res.status(status).send({err: err, data: success});
  });
});

module.exports = router;