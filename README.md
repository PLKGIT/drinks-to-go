# Coffee Express (Group Project)

## Overview
Coffee Express is a Web application designed to be implemented at self-serve kiosks in coffee shops to speed up and simplify the order process.  The primary objectives are to:
* Shorten lines 
* Remove confusion while ordering
* Simplify order pickup

Customers can order from one of many iPads in the shop, logged in with their account credentials.  Once logged in, the customer sees a menu of options, including popular drinks. There is also an option to click a button to see a list of orders. The customer can order from the menu or reorder items from a previous order. For customers without an account, there is are options to order as a Guest or to create a new account.

During the checkout process, customers can search for and submit a song from Spotify to be played in the coffee shop.  Coffee shop employees control and manage what is played from the customer-requested song list.

Coffee Express also includes an "Order Status" component that displays open orders on a big screen that everyone in the coffee shop can view. The screen displays all "pending" and "ready" orders. Once a customer places an order, their name, order number, and drink details are displayed in the “Pending” list on the status board.  When a customer's order is made, their order information moves to the "Ready" section of the screen.  Once the customer picks up the order, an employee will set the order status to "Complete" and the order details will drop from the status board.

Finally, there is an "Employee" page in the app that allows employees to manage orders and song requests as well as view products, customers, and order history.

![](https://res.cloudinary.com/damplk/image/upload/v1585253897/portal/grp_project_02_gilded.png)

### Customer View

![](views/public/assets/img/demo_coffee_express.gif)


### Employee View

![](views/public/assets/img/demo_coffee_express_employees.gif)

### Proposed Future Developments
  * Text Notifications
  * Payment Handling
  * Mobile App using React
  * Add Survey Feedback
  * Incorporate Discounts and Coupons
  * Addition of Food Items
  * Drink Customization
  * UI Refinements

## Technology Details

### Application Programming Interfaces (APIs)

**Node Spotify API**
https://www.npmjs.com/package/node-spotify-api

Use: Used to allow customers to search for and select songs from Spotify to be played in the coffee house.

### Technologies, Libraries, and Tools Used**

**GitHub**

https://github.com/PLKGIT/drinks-to-go

Use: Version control system

**HTML and CSS**

Use: UI design and styling and frontend content

**Google Fonts**

https://fonts.googleapis.com/ 

Font Families: Pacifico and Spinnaker


### Frameworks and Libraries

**Model-View-Controller (MVC)**

Use: Application architecture pattern.

**Nodejs**

https://nodejs.org/en/

Use: Asynchronous event-driven JavaScript runtime server environment.

**Asynchronous JavaScript and XML (AJAX)**

Use: Interactivity.

**jQuery**

https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js 

Use: JavaScript library wrapper, including DOM traversal and manipulation, event handling, and AJAX calls

**Express**

https://expressjs.com/

Use: Web application framework for Node JS.

**Handlebars**

https://github.com/jneen/express-handlebars

Use: HTML templating for Node JS.

**Materialize**

https://materializecss.com/

Use: UI design and styling, including cards, buttons, tables, form, and modals

**MySQL**

https://www.mysql.com/

Use: Backend database.

**Sequelize**

https://sequelize.org/

Use: Promise-based Node.js object-relational mapping (ORM) for MySQL.

**Dotenv**

https://www.npmjs.com/package/dotenv

Use: Stores configuration information in the environment separate from code.

### Other Tools

**Regular Expressions (RegEx)**

Use: Data validation.

**Specialized Dataset**

https://www.kaggle.com/starbucks/starbucks-menu 

Use: Starbucks drinks dataset.

**Scrolling Panes UI**

https://medium.com/samsung-internet-dev/horizontally-scrolling-panes-with-clean-html-and-modern-css-7372596932c7

Use: Scrolling horizontal panes for the UI.

**ESLint**

https://www.npmjs.com/package/eslint

Use:  Tool that analyzes programming code for potential errors. 


### MySQL Database

**Schemas**
  * drinkstogo_db
  * bbk0phd05y8qzfwo (Heroku)

**Tables**
  * Customers
  * Orders
  * OrderItems
  * Products
  * Songs

**Schema and Seed Files**

\models\schema.sql

\models\seeds.sql

\models\seeds_sequelize.sql

### Project Assets

**Application URL**
https://secret-ocean-08123.herokuapp.com/

**Application File Structure**

\config

\models

\public

\public\assets

\public\assets\css

\public\assets\img

\public\assets\js

\routes

\views

\views\layouts

\views\partials

\views\partials\drinks

\views\partials\articles

## Development Details

### Requirements
The project team must design and build a full-stack web application using the Model-View-Controller (MVC) paradigm.  The application must use Node, Express, and MySQL and be deployed to Heroku.

### Development Team 
1. Sonal Bhoraniya
2. Jyochsna Gongal
3. Pam Kelly
4. Hebah Memon
5. Nida Memon

### GitHub Repository
[GitHub](https://github.com/PLKGIT/drinks-to-go/) at https://github.com/PLKGIT/drinks-to-go/.

### Deployed Application
[Coffee Express](https://secret-ocean-08123.herokuapp.com/) deployed at https://secret-ocean-08123.herokuapp.com/.

Copyright &copy; 2020 | Sonal Bhoraniya, Jyochsna Gongal, Pam Kelly, Hebah Memon, and Nida Memon
