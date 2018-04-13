BACKTICK API
============

This is the official API of BACKTICK APP.

Documentation Reference
-----------------------
There are basic following resources - 
* College
* Department
* Class
* Student
* Staff
* Post
* Comment
* Announcement

This API follows REST terminology.

Yo


REAL TIME POST REFERENCE
------------------------

This document explains how to add a post and like a particular post, ALL REAL-TIME.

To see it in action, Open [project link](https://backtick-api.herokuapp.com/) in two seperate windows and try adding a new post or like existing one.

Events to listen in client side
================================

'new-post' Event 
----------------
This event returns the newly created post.
Post has following attributes - _id, text, postedAt, likes

Example

```javascript
socket.on('new-post', function(data){
  console.log(data);
});
```

'post-liked' Event
------------------
This event return the number of likes of a post after a post has been liked along with its _id.
It has following attributes = _id, likes

Example

```javascript
socket.on('post-liked', function(data){
  console.log(data);
  //let span = document.getElementById('span'+data._id);
  //span.innerText = 'Likes: '+data.likes;
});
```

Events to emit in client side
=============================

'add-post' Event
----------------
This event adds a new post.
It needs 'text' as a parameter to emit.

Example
```javascript
socket.emit('add-post', {text: 'hello'});
```

'like-post' Event
-----------------
This event likes a post.
It needs 'id' of the post as a parameter.

Example
```javascript
socket.emit('like-post', id);
``` 