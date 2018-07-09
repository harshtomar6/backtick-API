# BACKTICK API VERSION 2

This API has mainly three entities.
1. Who will do it (users)
2. Where will it be done (groups)
3. What action is done (posts)

# Access

Four types of users can access this API.
1. Superuser
2. Admin
3. Student
4. Staff

Some Routes are accessible only by Superuser, or Admin.

To get token for SuperUser.
Endpoint is `/user/su`.
Params Required => 1. Name, 2. Email, 3. Password<br/>
```Only 2 Admins are allowed```

# Endpoints

## COLLEGE

## GET  `/group/college` route

Retrieves all colleges.

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/college'|SUPERUSER|-|DONE|


## GET `/group/college/:collegeId` route

Retrieves All details of a particular College

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/college/:collegId'|SUPERUSER or ADMIN|-|DONE|


## GET `/group/college/:collegeId/department` route

Retrieves All Departments of a particular College

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/college/:collegId/department'|SUPERUSER or ADMIN|-|DONE|

## GET `/group/college/:collegeId/class` route

Retrieves All Classes of a particular College

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/college/:collegId/class'|SUPERUSER or ADMIN|-|DONE|

## GET `/group/college/:collegeId/student` route

Retrieves All Students of a particular College

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/college/:collegeId/student'|SUPERUSER or ADMIN|-|DONE|


## GET `/group/college/:collegeId/staff` route

Retrieves All Staff of a particular/group college

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/college/:collegeId/staff'|SUPERUSER or ADMIN|-|PENDING|

## GET `/group/college/:collegeId/group` route

Retrieves All Groups of a particular college

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/college/:collegeId/group'|SUPERUSER or ADMIN|-|PENDING|


## GET `/group/college/:collegeId/post` route

Retrives Posts of a particular college group. <br>
Note -> Retrieves posts only at college level, Not the posts of subgroups of a/group college.

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/college/:collegeId/post'|SUPERUSER or ADMIN|?all|PENDING|

For Retrivieng all the posts of college and its subgroups as well,
Hit the above end-pont with value of `all` param as true.

Example -> `/group/college/:collegeId/post?all=true`

## GET `/group/department/:deparmtentId` route

Retrieves a particular department

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/department/:departmentId'|SUPERUSER or ADMIN|-|DONE|

## GET '/group/department/:departmentId/class' route

Retrieves all classes of a particular department

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/department/:departmentId/class'|SUPERUSER or ADMIN|-|DONE|


## GET `/group/college/:collegeId/group` route

Retrieves All Groups of a particular/group college

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/college/:collegeId/group'|SUPERUSER or ADMIN|-|PENDING|



## POST `/group/college` route

Adds new College

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|POST|'/group/college'|SUPERUSER|-|DONE|

**Parameters in body**

```json
  {
    "name": "College Name", (required),
    "meta": {
      (any object) 
    } (optional)
  }
```

## POST `/group/college/:collegeId/department` route

Add New Department To a particular College

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|POST|'/group/college/:collegeId/department'|SUPERUSER or ADMIN|-|DONE|

**Parameters in body**

```json
  {
    "name": "Department Name", (required),
    "meta": {
      (any object) 
    } (optional)
  }
```

## POST `/group/department/:departmentId/class` route

Add New Class To a particular Department

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|POST|'/group/department/:departmentId/class'|SUPERUSER or ADMIN|-|DONE|

**Parameters in body**

```json
  {
    "name": "Class Name", (required),
    "meta": {
      (any object) 
    } (optional)
  }
```

## GET `/group/department/:departmentId/student` route

Retrieves All Students of a particular Department

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/department/:departmentId/student'|SUPERUSER or ADMIN|-|DONE|


## USERS

## GET `/user/student` route

Retrieves All Students

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/user/student'|Superuser|-|DONE|

## GET `/user/student/:studentId` route

Retrieves info about a student

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/user/student/:studentId'|ANY|-|PENDING|


## POST `/user/student` route

Creates new Student

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|POST|'/user/student'|-|-|DONE|

**Parameters in body**

```json
  {
    "name": "Student Name", (required),
    "email": "Student email", (required),
    "phone": "Student phone", (optional),
    "photoURL": "Student photo url", (optional),
    "regNo": "Student Reg no", (optional),
    "academicYear": "Student Academic Year", (optional)
    "groups": "Array of group Id's", (optional)
  }
```

## POST `/user/staff` route

Creates new Staff

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|POST|'/user/staff'|-|-|DONE|

**Parameters in body**

```json
  {
    "name": "Staff Name", (required),
    "email": "Staff email", (required),
    "phone": "Staff phone", (optional),
    "photoURL": "Staff photo url", (optional),
    "regNo": "Staff Reg no", (optional),
    "groups": "Array of group Id's", (optional)
  }
```

## POST `/user/admin` route

Creates new Admin for a particular college

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|POST|'/user/admin'|-|-|DONE|

**Parameters in body**

```json
  {
    "name": "Admin Name", (required),
    "email": "Admin email", (required),
    "phone": "Admin phone", (optional),
    "photoURL": "Admin photo url", (optional),
    "college": "College Id", (required)
  }
```

## POST `/user/su` route

Creates new Superuser

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|POST|'/user/su'|-|-|DONE|

**Parameters in body**

```json
  {
    "name": "Superuser Name", (required),
    "email": "Superuser email", (required),
    "password": "Superuser phone", (required),
  }
```
`Only 2 Superusers are allowed`

## POSTS

## GET `/post` route

Retrieves all Posts

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/post'|Superuser|-|DONE|

## GET `/post/page/:pageNumber?limit=`

Paginate Posts.<br/>
pageNumber can be any integer.<br/>
limit param specifies number of posts per page.<br/>
Default is 10

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/post/page/:pageNumber'|Superuser|limit|DONE|

## POST `/post` route

Creates new posts

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|POST|'/post'|User|-|DONE|

**Parameters in body**

```json
  {
    "text": "Post Text", (required),
    "attachment": "Array of attachment Object", (optional),
    "groups": "Array of Group Id's", (required),
  }
```

## PUT `/post/:postId` route

Modifies a post

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|PUT|'/post/:postId'|User|-|DONE|

**Parameters in body**

attributes which need to be modified

## DELETE `/post/:postId` route

Deletes a post

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|DELETE|'/post/:postId'|User|-|DONE|

## POST `/post/:postId/like` route

Like a post

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|POST|'/post/:postId/like'|User|-|DONE|

## POST `/post/:postId/comment` route

Comment on a post

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|POST|'/post/:postId/comment'|User|-|DONE|

**Parameters in body**

```json
  {
    "text": "Comment Text", (required)
  }
```