# HayvnMotor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5.

## Development server

Make sure you have npm and then go to root directory and run cmd "npm install".

Run `ng serve` for a dev server once node packages get installed. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## GitHub Link

https://github.com/suriyashopping/hayvnMotor

## Shopping Cart Story: ** HayvnMotors **

### Product List
- Listing All Products as landing page
- Product listing has done by using progressive rendering method to improve application performance.
- Dynamic Categories Menu List on header
- Dynamic routing for each categories
- Product List Card which include product name, model, category, product image
- Card footer contains Product Price, View more Option
- User can view all the products while click on logo or All Products menu- Users can search for products by using the browse option which is placed on the header section.

###  Product Overview
- Product Overview Card which include title, category, product image, description, specifications, Add to Cart option like "Buy Now" button and Add / remove Quantity

### Add to Cart

- User can add product to their guest cart
- User can add multi quantity for each product in the same product detail page and max quantity limit is 10 and shows validation respectively.
- User can add or reduce quantity and also can remove it from cart
- Users can find the count of products on the header's cart option which is placed at the top right side of the header.

### Cart List

- User can view the shopping cart list while clicking on the header's cart icon at top right
- User can delete product from cart by using delete icon- User can add or reduce quantity and also can remove it from cart
- Cart product, count, Total amount all are handled in the global store by using NgRx.
- Changes will be reflected immediately throughout the app, if we made changes because of the global state manager using NgRx.

### Retain data handled on page refresh

-  Retain data handling for Cart List and already selected cart products on Product Listing Page on/after page refresh.
-  Retaining NgRx store data handled and will work for the entire hayvnmotors application.
