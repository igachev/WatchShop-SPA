# WatchShop-SPA


<strong>This is an online store  specialized in  selling watches</strong>


## Link to WatchShop Website: https://watch-shop-spa.onrender.com


## Link to WatchShop API: https://watch-shop-api.onrender.com/watches


In this file I will provide documentation for backend and frontend


# Backend documentation for WatchShop API:

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
2. Go to folder server: `cd server`
3. Install dependencies: `npm install`
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

<strong>Example values of each variable(Keep in mind these are just example values and you must add your own values):</strong>


DATABASE_DEVELOPMENT='mongodb://127.0.0.1:27017/watchShop' // local database


DATABASE_PRODUCTION=  // provide a link for MongoDB Atlas Database


JWT_SECRET=my-secret-123 // provide a secret for JsonWebToken


ADMIN_EMAIL=adminW@abv.bg // You must register in the website with the email you type here in order to be able to login as admin


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


# Frontend documentation for WatchShop

This is a single page application built with Angular,TypeScript,Bootstrap

### Requirements:
- @angular/animations
- @angular/common
- @angular/compiler
- @angular/core
- @angular/forms
- @angular/platform-browser
- @angular/platform-browser-dynamic
- @angular/router
- @fortawesome/angular-fontawesome
- @fortawesome/fontawesome-svg-core
- @fortawesome/free-brands-svg-icons
- @fortawesome/free-regular-svg-icons
- @fortawesome/free-solid-svg-icons
- @ng-bootstrap/ng-bootstrap
- @popperjs/core
- bootstrap
- ngx-pagination
- rxjs
- tslib
- zone.js


### Installation:

5. Make sure you completed the above mentioned backend installation
6. Go to folder client: `cd client`
7. Go to folder app: `cd app`
8. Install dependencies: `npm install`
9. Go to folder src: `cd src`
10. Go to folder app: `cd app`
11. Start the application: `ng s --open`


### Folder Structure:
- `core` : It contains static components, services, functional guards
- `shared` : It contains reusable components, interfaces
- `feature` : Contains all distinct modules.The components of each module share  related functionality.We have two modules: user, watch.
- `app.module` : Entry point of the application


### Routes:


Here are the available routes:


- `/` : homepage which redirects to `/watches`
- `/login` : display login page
- `/register` : display register page
- `/cart` : display user's cart page
- `/purchaseHistory` : display user's purchase history
- `/allPurchaseHistory` : display all bought products by users (only the owner of the shop can see this)
- `/watches` : display the watch catalog
- `/watches/create` : the owner can add new watch to his catalog
- `/watches/:watchId/edit` : the owner can edit watch details
- `/watches/search` : Display only watches by the searched brand
- `/watches/:watchId/details` : Display a specific watch
- `/about` : display about us page
- `/contacts` : display contacts page
- `any invalid route` : display page not found
