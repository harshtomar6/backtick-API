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

## GET `/group/college/:collegeId/student` route

Retrieves All Students of a particular College

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/college/:collegeId/student'|SUPERUSER or ADMIN|-|PENDING|


## GET `/group/college/:collegeId/staff` route

Retrieves All Staff of a particular/group college

|METHOD|ENDPOINT|ACCESS-TYPE|PARAMS|STATUS|
|------|--------|-----------|------|------|
|GET|'/group/college/:collegeId/staff'|SUPERUSER or ADMIN|-|PENDING|

## GET `/group/college/:collegeId/group` route

Retrieves All Groups of a particular/group college

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