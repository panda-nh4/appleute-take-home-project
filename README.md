# appleute-take-home-project


A MERN stack e-commerce app.




##  Endpoints

/api/home

/featured - GET -  gets data for home carousel

/topCategories - GET -gets categories 

/featuredProducts - GET - gets fetured products 


## /api/users

/ - GET - lists all users

/login - POST - sign user in, produces a JWT and stores in http only cookie

/logout - POST - logout user

/signUp - POST - register user

/profile - GET - get user profile

/update - PUT - update user profile


## /api/products

/ - GET - gets all products

/product - GET - gets product info

/category - GET - gets all products matching a particular category

## /api/cart

/items - GET - get contents of cart for logged in user

/value - GET - gets the sum of the prices of the products in cart

/addToCart - POST - adds single or multiple items into logged in users cart

/removeFromCart - POST - removes one quantity of a product from users cart

## /api/orders

/ - GET - Gets all past orders for logged in user

/placeOrder - POST - adds a new order record to logged in user

/details - GET - gets details of a specific order for logged in user
