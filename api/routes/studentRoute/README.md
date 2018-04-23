STUDENT ROUTE
=============

**Student route has following functionalities**
* Get information of all students
* Add a New Student
* Add Student through social media 
* Get information about a particular student
* Modify details of existing student
* Get all Posts of a particular student

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

**Following endpoints are present in Student Route**

## 1. GET '/student' Route

Retrieves all the students in an array

|Method|Endpoint|URL|Description|Authentication |
|------|--------|---|-----------|---------------|
| GET   | /student |  https://backtick-api.herokuapp.com/student | Returns an Array of all Students | NO

**Sample Response**

```json 
  {
    "err": null,
    "data": [
        {
            "name": "Harsh Tomar",
            "email": "harshtomar6@gmail.com",
            "phone": "none",
            "photoURL": "none",
            "providerData": [
                "email"
            ],
            "regNo": "none",
            "academicYear": "none",
            "isFresher": true,
            "classId": "5adc89faa865bf26e067fef9",
            "departmentId": "5adc87d73dcaa9788ced32de",
            "collegeId": "5ad08542a6620251ac0a38c1",
            "isCR": false,
            "phoneVerified": false,
            "emailVerified": false,
            "termsAndConditions": false,
            "_id": "5adc6f7238e92d231cb40ee6",
            "password": "$2a$08$D8bphkTy2TTxmXt15GT35eGbX/7CtgBTJHR/zHEqeyOV0PZlgvpCm",
            "__v": 0
        },
        {
            "name": "Sheela Dixit",
            "email": "sheeladixit@gmail.com",
            "phone": "8765342135",
            "photoURL": "none",
            "providerData": [
                "email"
            ],
            "regNo": "none",
            "academicYear": "none",
            "isFresher": true,
            "classId": "not joined",
            "departmentId": "not joined",
            "collegeId": "not joined",
            "isCR": false,
            "phoneVerified": false,
            "emailVerified": false,
            "termsAndConditions": false,
            "_id": "5adc9b80ed1e72037020e7bf",
            "password": "$2a$08$F30aaKVdNk/vrz7taE9gve5N9j2yiGZD6i6kFIJIelK7Kmz3Vo0x6",
            "__v": 0
        }
    ]
}
```
## 2. POST '/student' Route

Adds a new student to database

|Method|Endpoint|URL|Description|Authentication|
|------|--------|---|-----------|--------------|
| POST   | /student |  https://backtick-api.herokuapp.com/student | Adds a new user to the database and returns the added information | NO

 **Params**

|Param Name|Type|Required|Default|
|----------|----|--------|-------|
| name | String | NO | 'none' |
| email | String | NO | 'none' |
| phone | String | NO | 'none' |
| password | String | YES | - |
| photoURL | String | NO | 'none' |
| providerData | Array | NO | ['email'] |
| regNo | String | NO | 'none' |
| academicYear | String | NO | 'none'|
| isFresher | Boolean | NO | 'default' |
| classId | String | NO | 'not joined' |
| departmentId | String | NO | 'not joined' |
| collegeId | String | NO | 'not joined' |
| isCR | Boolean | NO | false |
| phoneVerified | Boolean | NO | false|
| emailVerified | Boolean | NO |false |
| termsAndConditions | Boolean | NO | false |


**Sample Response**
```json 
  {
    err: null,
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjUwMTE5Njg3MjJ9.seaqhYLJ4aLqBRe3JixslUHF274o9tQSNe_Q4gQclEw",
        "key": "5adc9b80ed1e72037020e7bf",
        "expires": 1525011968722,
        "user": {
            "name": "Sheela Dixit",
            "email": "sheeladixit@gmail.com",
            "phone": "8765342135",
            "photoURL": "none",
            "providerData": [
                "email"
            ],
            "regNo": "none",
            "academicYear": "none",
            "isFresher": true,
            "classId": "not joined",
            "departmentId": "not joined",
            "collegeId": "not joined",
            "isCR": false,
            "phoneVerified": false,
            "emailVerified": false,
            "termsAndConditions": false,
            "_id": "5adc9b80ed1e72037020e7bf",
            "password": "$2a$08$F30aaKVdNk/vrz7taE9gve5N9j2yiGZD6i6kFIJIelK7Kmz3Vo0x6",
            "__v": 0
        }
    }
  }
```

## 3. POST '/student/social' Route

This is a special route to add or get student through social media

|Method|Endpoint|URL|Description|Authentication|
|------|--------|---|-----------|--------------|
| GET   | /student/social |  https://backtick-api.herokuapp.com/student/social | Returns a student, if student is not found, new student is created | NO

**Params**

*Same As Above Route*

**Sample Response**

*Same As Above Route*

## 4. GET '/student/:studentId' Route

Retrieves information of a particular student

|Method|Endpoint|URL|Description|Authentication
|------|--------|---|-----------|--------------|
| GET   | /student/:studentID |  https://backtick-api.herokuapp.com/student/:studentID | Return a particular student data, Returns 404 if no student id found | YES

**Sample Response**
```json 
{
    "err": null,
    "data": {
        "name": "Harsh Tomar",
        "email": "harshtomar6@gmail.com",
        "phone": "none",
        "photoURL": "none",
        "providerData": [
            "email"
        ],
        "regNo": "none",
        "academicYear": "none",
        "isFresher": true,
        "classId": "5adc89faa865bf26e067fef9",
        "departmentId": "5adc87d73dcaa9788ced32de",
        "collegeId": "5ad08542a6620251ac0a38c1",
        "isCR": false,
        "phoneVerified": false,
        "emailVerified" : false,
        "termsAndConditions": false,
        "_id": "5adc6f7238e92d231cb40ee6",
        "password": "$2a$08$D8bphkTy2TTxmXt15GT35eGbX/7CtgBTJHR/zHEqeyOV0PZlgvpCm",
        "__v": 0
    }
}
```

## 5. PUT '/student/:studentId Route

Modifies information of a particular student

|Method|Endpoint|URL|Description|Authentication|
|------|--------|---|-----------|--------------|
| PUT   | /student/:studentID |  https://backtick-api.herokuapp.com/student/:studentID | Returns the modified student data, Returns 404 if no student id found |YES|

**Params :**
Data to be modified in JSON format

**Sample Response**
```json 
  {
    err: null,
    data: {

    }
  }
```

## 6. GET '/student/:studentId/post' Route

Retrieves all the posts of a particular student

|Method|Endpoint|URL|Description|Authentication
|------|--------|---|-----------|--------------|
| GET   | /student/:studentId/post |  https://backtick-api.herokuapp.com/student/:studentId/post | Returns an Array of all the post of a student, Returns 404 if no student id found | YES

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