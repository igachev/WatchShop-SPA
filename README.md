# WatchShop-SPA


<strong>This is an online store  specialized in  selling watches</strong>


### Initial loading of website might take up to 1 minute because it is a free tier


## Link to WatchShop Website: https://watch-shop-spa.onrender.com


## Link to WatchShop API: https://watch-shop-api.onrender.com/watches


## Test Accounts:

`Admin account login details` - email : `adminW@abv.bg` password : `1234`


`User account login details` - email : `test@abv.bg` password : `1234`


<strong>Keep in mind that email `subscription` dont work on the hosted website because the provider prevents it.But it works on the localhost version of my application.Same is true for `page not found` functionality.</strong>


## How It Works:

- `admin` : The admin is able to add,edit,delete watches,check all bought items from his website by clicking <strong>All Purchase History.</strong> From <strong>All Purchase History </strong> page the admin can see the customer's orders and send them to the respective addresses.
- `logged in user` : The user is able to rate watches,add watches to his cart,remove watches from his cart,buy watches,check his own purchase history
- `guest user` : The user is <strong>not</strong> able to rate watches,add watches to cart,buy watches.He can only check watches and their rating


<strong>In this file I will provide documentation for backend and frontend</strong>


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


### Configuration:
This application uses a `.env` file to store configuration variables. You can create a `.env` file
in the server directory of the project and add the following variables:

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


<p align="center">
 <img src="https://github.com/igachev/WatchShop-SPA/assets/102420254/e1d62db0-bff4-4ecd-b716-3ed86e4a9eab"   border="10"/>
</p>

SUBSCRIPTION_EMAIL=testivoo@abv.bg // must provide a real email which will be used by nodemailer to write emails to users


SUBSCRIPTION_EMAIL_PASSWORD='1234' // must be the real password for the above mentioned email in order to be used by nodemailer


### Installation:

1. Clone this repository: `git clone https://github.com/igachev/WatchShop-SPA.git`
2. Go to folder server: `cd server`
3. Install dependencies: `npm install`
4. Make sure you created <strong>.env</strong> file in server folder and populate it with correct variables.
5. Start the server: `npm start`


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

This is a single page application built with Angular,TypeScript,Bootstrap.


<strong>Every page has web responsive design</strong>

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

6. Make sure you completed the above mentioned backend installation
7. Go to folder client: `cd client`
8. Go to folder app: `cd app`
9. Install dependencies: `npm install`
10. Go to folder src: `cd src`
11. Go to folder app: `cd app`
12. Start the application: `ng s --open`


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


## Images:


<p align="center">
 Watch Catalog

 Pagination is made by using `ngx-pagination` library


 <img src="https://github.com/igachev/WatchShop-SPA/assets/102420254/8f6e5a2e-c463-480f-a149-8599bcb6a51d"   border="10"/>
</p>


<p align="center">
Loading Spinner

![03 guestLoadingSpinner](https://github.com/igachev/WatchShop-SPA/assets/102420254/837f0ceb-2a70-4c50-b1e1-806ac1ad74da)

</p>


<p align="center">
 Guest Navigation Menu

 ![11 guestNavMenu](https://github.com/igachev/WatchShop-SPA/assets/102420254/c5018fa9-d360-44c5-8b92-16092f27b506)

</p>


<p align="center">
Admin Navigation Menu
 
 ![12 adminNavMenu](https://github.com/igachev/WatchShop-SPA/assets/102420254/880a01a2-a1ef-44a2-9f2e-be4b751a2d4c)

</p>


<p align="center">
 Logged In User Navigation Menu

 ![13 userNavMenu](https://github.com/igachev/WatchShop-SPA/assets/102420254/8da8c9df-3d18-4b9c-8e81-cf371ad8067c)

</p>


<p align="center">
 Toggle button for small screens

 ![22 toggleBtn](https://github.com/igachev/WatchShop-SPA/assets/102420254/2cd06233-d503-4f4f-8d17-f90dce4077a7)

</p>


<p align="center">
 Login Form Validation

 ![05 loginFormValidation](https://github.com/igachev/WatchShop-SPA/assets/102420254/a7ee3af9-6bdf-44ad-8481-2dcaa842e6ac)

</p>


<p align="center">
 Login Form Error Handling
 
![06 loginErrorHandling](https://github.com/igachev/WatchShop-SPA/assets/102420254/912d5c15-8714-4d2b-90d9-1d4e7b6fcf2d)

</p>


<p align="center">
 Search for watches from specific brand

 ![10 searchResults](https://github.com/igachev/WatchShop-SPA/assets/102420254/2c84531a-e1c5-42ca-8c53-0fbb6d28c8b3)

</p>


<p align="center">
 No Results Found

 ![11 searchNoResults](https://github.com/igachev/WatchShop-SPA/assets/102420254/462355fe-054f-4a01-a041-07877db4016b)

</p>


<p align="center">
 Guest View Of Watch Details

 ![04 guestDetails](https://github.com/igachev/WatchShop-SPA/assets/102420254/9875b810-051e-45df-bf80-ae89bcfab321)

</p>


<p align="center">
 Admin View Of Watch Details

 ![15 adminDetails](https://github.com/igachev/WatchShop-SPA/assets/102420254/ad41be00-d00d-4c72-8e35-bcc20a926d5b)

</p>


<p align="center">
 Logged In User View Of Watch Details

 ![14 userDetails](https://github.com/igachev/WatchShop-SPA/assets/102420254/b78c374e-29a8-4ccb-b29d-ba68745c75da)

</p>


<p align="center">

 
 Only Logged In User can rate watches from 1 to 5 stars by clicking on a star.Rating is made by using `ng-bootstrap` library component: `rating`


 ![16 rate](https://github.com/igachev/WatchShop-SPA/assets/102420254/55fabc46-cad2-4e10-9b1a-d16ecf1c2866)

</p>


<p align="center">
 User's Cart

 ![17 userCart](https://github.com/igachev/WatchShop-SPA/assets/102420254/30388255-1d0e-471a-9d63-f919f433c2e1)

</p>


<p align="center">
 User Purhase History

 ![18 userPurchaseHistory](https://github.com/igachev/WatchShop-SPA/assets/102420254/a7cd8320-5625-401f-b8a4-5ba12d8780bf)

</p>


<p align="center">
 Admin is able to see all purchases 

 ![19 adminHistory](https://github.com/igachev/WatchShop-SPA/assets/102420254/37eca414-0c1e-45c5-b958-3616eda5b901)

</p>


<p align="center">
 Everyone can subscribe for the newsletter by providing his email address and click Subscribe

 ![20 subscription](https://github.com/igachev/WatchShop-SPA/assets/102420254/e7ab0295-954e-4e93-8f00-8344230b4de2)

</p>


<p align="center">
 After subscription the user will receive email containing this information

 ![25 emailSubscription](https://github.com/igachev/WatchShop-SPA/assets/102420254/cb702c70-bef9-4370-bea6-fd4464046578)

</p>


<p align="center">
 
 About Us page. Used `ng-bootstrap` component: `carousel`

 ![23 AboutUs](https://github.com/igachev/WatchShop-SPA/assets/102420254/e993f6e1-2581-4700-97e1-b4deead74411)

</p>


<p align="center">
 Page not found

 ![24 pageNotFound](https://github.com/igachev/WatchShop-SPA/assets/102420254/15e5fa02-2a0a-4e2d-8908-053d5bb1d79f)

</p>
