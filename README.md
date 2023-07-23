# WatchShop-SPA

## Link to WatchShop Website: https://watch-shop-spa.onrender.com

## Link to WatchShop API: https://watch-shop-api.onrender.com/watches

### Backend documentation for WatchShop API:

 This is a backend application built with Node.js and Express.
 
 ### Requirements:
 
 - Node.js (v12 or later)
 - npm (v6 or later)
 - express
 - cors
 - mongoose
 - bcrypt
 - jsonwebtoken
 - nodemon
 - nodemailer
 - dotenv


### Installation:

1. Clone this repository: `git clone https://github.com/igachev/WatchShop-SPA.git`

2. Install dependencies: `npm install`
 
3. Go to folder server: `cd server`

4. Start the server: `npm start`


### Configuration:
This application uses a `.env` file to store configuration variables. You can create a `.env` file
in the root directory of the project and add the following variables:

DATABASE_DEVELOPMENT = 

DATABASE_PRODUCTION =

JWT_SECRET =

ADMIN_EMAIL =   

SUBSCRIPTION_EMAIL = 

SUBSCRIPTION_EMAIL_PASSWORD = 

Example with information about each variable:


DATABASE_DEVELOPMENT='mongodb://127.0.0.1:27017/watchShop' // local database


DATABASE_PRODUCTION=  // provide a link for MongoDB Atlas Database


JWT_SECRET=my-secret-123 // provide a secret for JsonWebToken


ADMIN_EMAIL=adminW@abv.bg // You must register in the website with this email in order to be able to login as admin


![01 registerAsAdmin](https://github.com/igachev/WatchShop-SPA/assets/102420254/a4b61b5b-47ed-4639-bb91-49288974c168)

SUBSCRIPTION_EMAIL=testivoo@abv.bg // must be a real email which will be used by nodemailer to write emails to users


SUBSCRIPTION_EMAIL_PASSWORD='1234' // must be the real password for the above mentioned email in order to be used by nodemailer


### Usage:

The server listens on port 5000 by default. Here are the endpoints:


- `POST /users/register` : Creates a new user
- `POST /users/login` : Sign in user with valid information
- `GET /users/logout` : Sign out logged in user
- `GET /users/isAdmin` : Check if user is admin or not
- `GET /users/:userId/cart` : Get all watches which the user added to his cart
- `DELETE /users/:userId/cart/:watchId` : Remove a watch from the user's cart
- `POST /users/:userId/cart/:watchId` : Buy a watch from the user's cart
- `GET /users/:userId/purchaseHistory` : Display all bought watches by the user
- `GET /users/purchaseHistory` : Display all bought watches from the website to the admin only
- `POST /watches/create` : Add new watch to the catalog
- `GET /watches` : Display all available watches for buying
- `GET /watches/search` : Get all available watches
- `POST /watches/search` : Display only watches by the searched brand
- `GET /watches/:watchId` : Get a specific watch by id
- `POST /watches/:watchId` : Add a specific watch to user's cart
- `DELETE /watches/:watchId` : Only the admin can delete a watch from his catalog
- `PUT /watches/:watchId` : Only the admin can edit watch details 
- `POST /watches/:watchId/rating` : Rate a specific watch by id with a rating value from 1 to 5
- `GET /watches/:watchId/rating` : Get the current rating of a specific watch
- `POST /subscription` : Send an email using nodemailer to an user's given email


### Folder Structure:
- `models` : Contains the database models
- `controllers` : Used for creating the endpoints,handle requests and responses
- `services` : Handle database model operations
- `index.js` : Entry point of the application
