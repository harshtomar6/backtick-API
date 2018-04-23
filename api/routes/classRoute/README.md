# CLASS ROUTE

**Class Route has following functionalities**
* Get all classes
* Get all students of a class
* Join a class by class id
* Join a class by class code

> For functionalities like creating a new class see college route documentation

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

**Following endpoints are present in Class Route**

## GET '/class' route

Retrieves all class in an Array

|Method|Endpoint|URL|Description|Authentication |
|------|--------|---|-----------|---------------|
| GET   | /class |  https://backtick-api.herokuapp.com/class | Returns an Array of all classes | NO

**Sample Response**

```json
{
    "err": null,
    "data": [
        {
            "_id": "5adc89faa865bf26e067fef9",
            "name": "CSE 6 A",
            "collegeId": "5ad08542a6620251ac0a38c1",
            "departmentId": "5adc87d73dcaa9788ced32de",
            "classCode": "CSE_6_A",
            "__v": 0
        },
        {
            "_id": "5addbdcb4e324a00140fc46a",
            "name": "CSE 6 B",
            "collegeId": "5ad08542a6620251ac0a38c1",
            "departmentId": "5adc87d73dcaa9788ced32de",
            "classCode": "CSE_6_B",
            "__v": 0
        },
        {
            "_id": "5addbe58579b1d186c5f27af",
            "name": "CSE 6 C",
            "collegeId": "5ad08542a6620251ac0a38c1",
            "departmentId": "5adc87d73dcaa9788ced32de",
            "classCode": "BT_FC_C_C6C",
            "__v": 0
        }
    ]
}
```

## GET '/class/:classId/student' Route

Retrieves all students of a class in an Array

|Method|Endpoint|URL|Description|Authentication |
|------|--------|---|-----------|---------------|
| GET   | /class/:classId/student |  https://backtick-api.herokuapp.com/class/:classId/student | Returns an Array of all students in a class | YES

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
            "classId": "5addbe58579b1d186c5f27af",
            "departmentId": "5adc87d73dcaa9788ced32de",
            "collegeId": "5ad08542a6620251ac0a38c1",
            "isCR": false,
            "phoneVerified": false,
            "emailVerified": false,
            "termsAndConditions": false,
            "_id": "5add842767daac0014a28511",
            "password": "bjn721",
            "__v": 0
        }
    ]
}
```

## GET '/class/join/:classCode/' Route

Allow a student to join a class and department and college of that class too.

|Method|Endpoint|URL|Description|Authentication |
|------|--------|---|-----------|---------------|
| GET   | /class/join/:classCode |  https://backtick-api.herokuapp.com/class/:classId/student | Updates classId, collegeId, departmentId of a student and returns the modified data | YES

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
        "classId": "5addbe58579b1d186c5f27af",
        "departmentId": "5adc87d73dcaa9788ced32de",
        "collegeId": "5ad08542a6620251ac0a38c1",
        "isCR": false,
        "phoneVerified": false,
        "emailVerified": false,
        "termsAndConditions": false,
        "_id": "5add842767daac0014a28511",
        "password": "bjn721",
        "__v": 0
    }
}
```