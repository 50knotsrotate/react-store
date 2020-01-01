# React store

#### This is going to be my attempt at a full stack online store, complete with user authentication, user sessions, shopping cart, payment, and email confimations. I will be using:

* React
  * Redux
  * Redux form
  * React router
  * React bootstrap
* Node
    * Express

* Mongodb

First thing I am going to do is setup my endpoints for user authentication

* _POST_ /auth/signup
* _POST_ /auth/login
* _POST_ /auth/logout

```javascript
// All the callbacks are located in ./controllers/auth.js
app.post('/signup', signup); 

app.post('/signin', signin);

app.post('/logout', logout);
```