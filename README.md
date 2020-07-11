# pizza-frontend

Front-end React app to consume backend pizza service.
<br/> Deployed version at - https://pizza-front-end.herokuapp.com/

![Preview](https://raw.githubusercontent.com/azashi/pizza-frontend/master/Pizza-Burst.gif)

## Navigation

1. Sign-in with your 9-digit phone(contact) number to create account for ordering delicious pizzas!
2. After account creation sign-in with the same contact number. This will lead to menu page.
3. Order pizzas by selecting pizza quantity and check for total price of your order.
4. Click ```Place Order``` to confirm your order.And it will redirect you to order-history.
5. Check your order history and then see for navigation buttons at the end.

## Usage

To start this project locally, first install Node.js,and then clone or download this repository from https://github.com/azashi/pizza-frontend/ - <br/>
Then run the following command - 
```javascript
npm install
```
After installation is done, run 
```node
npm run build
```
That should create the production build of pizza-app in your directory. Now you will require a static server to run this build. <br/>
Now download static server 
```node
npm i serve
```
and run
```node
serve -s ./build
```
Your app will start running now...
<br/>Go ahead order some pizzas!

---
