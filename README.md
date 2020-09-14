# LRP-Project
LRP stands for Login, Register, and Profile Project. A simple backend server API.

Technologies Used:
- NodeJs 
- Express JS for Rest API
- Firebase Datase 

## How to Run it?
- Clone to your repo
- Run "npm install"
- Run "node app.js"
- Test every end-point with Postman / others app 

## Restfull Endpoint

### POST /register
> register into LRP Project

_Request Body_
```
{
    "email": "<email for registration data>",
    "password": "<password for registration data>",
    "name": "<name for registration data>",
    "address": "<address for registration data>",
}
```

_Response (201)_
```
{
  message: "success register"
}

```

_Response (404)_
```
{
  message: "email not valid"
}

```


### POST /login
> Login into LRP Project

_Request Body_
```
{
    "email": "<email for login data>",
    "password": "<password for login data>"
}
```

_Response (200)_
```
{
    "access_token": "<access_token user data>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "login data not found"
}
```

### GET /getProfile
> Get User Profile

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
```

_Response (200)_
```
{
    "address": "<user address from database>",
    "email": "<user email from database>",
    "name": "<user name from database>",
    "password": "<user password from database>"
}
```

_Response (404 - Bad Request)_
```
{
  message: "not valid access token"
}
```
