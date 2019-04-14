# Banka   [![Coverage Status](https://coveralls.io/repos/github/VictorMaria/Banka/badge.svg?branch=develop)](https://coveralls.io/github/VictorMaria/Banka?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/32f8d9c2c89d93dac323/maintainability)](https://codeclimate.com/github/VictorMaria/Banka/maintainability)
___

Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money..

___

**Features Implemented**
1. User can sign up.
2. User can sign in.
3. Admin can fetch a specific user account.
4. User can upload a profile photo.
5. User can create a bank account.
6. Admin/staff can fetch a specific bank account.
7. Admin/staff can activate or deactivate a bank account.
8. User can retrieve his/her account balance.
9. Staff can credit an account.
10. Staff can debit an account.
11. Admin/staff can delete a bank account.

___

## Templates
UI Templates for this application are live on [Github Pages](https://victormaria.github.io/Banka/UI)

___

## Technologies Used
* [Node.js](https://nodejs.org/en/) - A runtime environment based off of Chromes's V8 Engine for writing Javascript server-side applications.
* [Express.js](https://expressjs.com/) - Web application framework based on Node.js.
* [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
* [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style guide was followed.

___


## Testing Tools
* [Mocha](https://mochajs.org/) - A JavaScript test framework.
* [Chai](https://www.chaijs.com/) - A test assertion library for JavaScript.
* [Supertest](https://www.npmjs.com/package/supertest) - A module that provides high-level abstraction for HTTP testing.

___

## API Information
The API endpoints are hosted on Heroku - [Banka](https://hibanka.herokuapp.com/)

|METHOD  |DESCRIPTION                        |ENDPOINT                                  |
|------- |-----------------------------------|------------------------------------------|
|POST    |Sign Up                            |api/v1/auth/signup                        |
|POST    |Sign In                            |api/v1/auth/signin                        |
|GET     |Fetch a specific user account      |api/v1/users/:id                          |
|POST    |Upload profile photo               |api/v1/users/:id/profilephotos            |
|POST    |Create a bank account              |api/v1/accounts                           |
|GET     |Fetch a specific bank account      |api/v1/accounts/:acccountNumber           |
|PATCH   |Activate or Deactivate bank account|api/v1/accounts/:acccountNumber           |
|GET     |Check account balance              |api/v1/accounts/:acccountNumber/balance   |
|POST    |Credit account                     |api/v1/transactions/:acccountNumber/credit|
|POST    |Debit account                      |api/v1/transactions/:acccountNumber/debit |
|DELETE  |Delete bank account                |api/v1/accounts/:acccountNumber           |




|DESCRIPTION         |REQUIRED FIELDS                                                    |                 
|--------------------|-------------------------------------------------------------------|
|Sign Up             |firstName, lastName, email, password                               |
|Sign In             |email, password                                                    |
|Upload profile photo|profilePhoto                                                       |
|Create bank account |firstName, lastName, owner, email, type, openingBalance            |
|Credit account      |cashier, amount, remark                                            |
|Debit               |cashier, amount, remark                                            |

amount and openingBalance should be in two decimal places e.g 200.50

___
## The Endpoints can be accessed remotely or locally.

#### Accessing the endpoints remotely via POSTMAN
You will need to have [POSTMAN](https://www.getpostman.com/downloads/) app installed on your computer.

##### Example 
###### Sign In
1. Launch POSTMAN
2. Click the dropdown menu to the left of the URL bar and select POST as a method.
3. To access the Sign In endpoint, at the end of Banka's URL attach the sign in endpoint to it as seen in step 4
4. https://hibanka.herokuapp.com/api/v1/auth/signin 
5. Then paste the full URL in the URL bar.
6. Click 'Body' tab below the URL, then select x-www-form-urlencoded radio button.
7. Fill in the required fields correctly.
8. Click the blue Send button to the right of the URL bar.
9. And wait for a response below.


#### Note:
Upload profile photo endpoint uses form-data instead of x-www-form-urlencoded


#### Accessing the endpoints locally via POSTMAN

1. On the terminal of your computer, navigate into the cloned repo's folder
2. Click [npm](https://www.npmjs.com/get-npm) and [Node.js](https://nodejs.org/en/) to get npm and node respectively.
3. Clone Banka repo `https://github.com/VictorMaria/Banka.git` on your local machine.
4. Run `$ npm install` to install All of Banka's dependencies.
5. Run `$ npm start` to power up the server.
6. The procedure for using POSTMAN here is the same as when accessing the endpoint remotely except that you make use of http://localhost:3000 as the full URL's prefix in place of the app's URL on heroku
e.g To access Sign In endpoint you will have a full URL like http://localhost:3000/api/v1/auth/signin

#### Test
You can locally run the test by running `npm test` in the cloned repo directory opened in a new terminal window while the server runs on the first window. It is important that the server is running for the tests to pass.

___

## Author
### Victor Ajayi (VictorMaria)





