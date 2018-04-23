# POST ROUTE

**Post Route has following functionalities**
* Get all posts
* Get a particular post
* Add a new Post
* Delete a post

**Routes having authentication as true expects headers `X-Access-Token` and `X-Key`**

An Example to communicate with those routes is:

```javascript 
  fetch(url, {
    method: `Route METHOD`,
    headers: {
      'Content-Type' : 'application/json',
      'X-Access-Token' : `your token`,
      'X-Key' : `your key`
    }
  })
```

**Following endpoints are present in Post Route**

## GET '/post' Route

Retrieves all posts in an Array

|Method|Endpoint|URL|Description|Authentication |
|------|--------|---|-----------|---------------|
| GET   | /post |  https://backtick-api.herokuapp.com/post | Returns an Array of all posts | NO

**Sample Response**

```json
{
    "err": null,
    "data": [
        {
            "likes": [],
            "comments": [],
            "attachment": [],
            "level": 10,
            "timestamp": "2018-04-22T13:29:40.766Z",
            "_id": "5adc8e444551eb05d8b43883",
            "text": "This is first post",
            "postedBy": "Student",
            "ownerId": "5adc6f7238e92d231cb40ee6",
            "classId": "5adc89faa865bf26e067fef9",
            "collegeId": "5ad08542a6620251ac0a38c1",
            "departmentId": "5adc87d73dcaa9788ced32de",
            "__v": 0
        }
    ]
}
```

## GET '/post/:postId' Route

Returns a Particular post

|Method|Endpoint|URL|Description|Authentication |
|------|--------|---|-----------|---------------|
| GET   | /post/:postId |  https://backtick-api.herokuapp.com/post/:postId | Returns a post. Returns 404 if no post is found | YES

**Sample Response**

```json
{
    "err": null,
    "data": {
        "likes": [],
        "comments": [],
        "attachment": [],
        "level": 10,
        "timestamp": "2018-04-22T13:29:40.766Z",
        "_id": "5adc8e444551eb05d8b43883",
        "text": "This is first post",
        "postedBy": "Student",
        "ownerId": "5adc6f7238e92d231cb40ee6",
        "classId": "5adc89faa865bf26e067fef9",
        "collegeId": "5ad08542a6620251ac0a38c1",
        "departmentId": "5adc87d73dcaa9788ced32de",
        "__v": 0
    }
}
```

## POST '/post' Route

Adds a New Post

|Method|Endpoint|URL|Description|Authentication |
|------|--------|---|-----------|---------------|
| POST   | /post |  https://backtick-api.herokuapp.com/post/ | Adds a new post and returns it | YES

**Params**