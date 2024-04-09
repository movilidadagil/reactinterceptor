react-axios-intercept-sample
==========================

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A simple react app that demonstrates how to handle common API operation using [axios](https://axios-http.com).

We will be using [JSON Web Token](https://jwt.io)(JWT) scheme for request authentication. 
However, the CRUD server is not included but can easily be recreated following the API configuration described below.

Using axios [interceptors](https://axios-http.com/docs/interceptors), we will be handling these two situations:

* When the server is busy, send retry request using `exponential backoff`.
* When the authToken expires, send `refreshToken` to get new tokens and resend the original request again.


## API Overview

| **Methods** | **Url**    | **Action**        |
|-------------|------------|-------------------|
| POST        | /login     | Sign In           |
| POST        | /refresh   | Refresh AuthToken |
| GET         | /list      | Get data          |


### `/login`

Header
```
{
    "x-api-key": "--your-api-key--"
}
```

POST param
```
{
    "id": "user",
    "pwd": "password"
}
```

Response
```
{
    rtoken: "--refresh-token--",
    token: "--auth-token--"
}
```


### `/refresh`

Header
```
{
    "x-api-key": "--your-api-key--"
}
```

POST param
```
{
    "rtoken": "--refresh-token--"
}
```

Response
```
{
    rtoken: "--new-refresh-token--",
    token: "--new-auth-token--"
}
```


### `/list`

Header
```
{
    "Authorization: "Bearer --auth-token--"
}
```

Response
```
{
    payload: "your-data"
}
```

## Operations

There are several buttons to simulate operations.

> Login will send user credentials and return the `authToken` and `refreshToken`.

> Refresh will send the `refreshToken` and get fresh new tokens.

> GetData will fetch data from the server, using the `authToken` in the `Authorization` header.


We will be using `x-api-key` header to authenticate login and refresh requests.
The apikey can be found in the `.env` file for demo purposes only.

The `refreshToken` will be stored in the localStorage while the `authToken` in the sessionStorage.
You can store it any way you want.

## Installation

* Clone the repository in your local directory.

* Go to the project directory and install the required modules.

~~~
$ npm install
~~~

* Start the app

~~~
$ npm start
~~~

### Note

> Some configurations are found in `.env` file like API baseURL.
> Please edit the values using your actual settings.

# reactinterceptor
