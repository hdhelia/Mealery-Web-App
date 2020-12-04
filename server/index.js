// For loading environment variables.
require('dotenv').config();

const express = require('express'); 
const { readFileSync, existsSync } = require('fs');
const { parse } = require('url');
const app = express();
const port = process.env.PORT || 8080;    
const faker = require("faker");
const database = require('./db.js');
const path = require('path');
const bp = require('body-parser');

//copy of cart
const cart = {};

const expressSession = require('express-session');  // for managing session state
const passport = require('passport');               // handles authentication
const LocalStrategy = require('passport-local').Strategy; // username/password strategy

const minicrypt = require('./miniCrypt');
const { use } = require('passport');
const { image } = require('faker');
const { type } = require('os');
const mc = new minicrypt();

// Session configuration

const session = {
    secret : process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
    resave : false,
    saveUninitialized: false
};

// Passport configuration

const strategy = new LocalStrategy(
    async (username, password, done) => {
	if (!findUser(username)) {
	    // no such user
	    return done(null, false, { 'message' : 'Wrong username' });
	}
	if (!validatePassword(username, password)) {
	    // invalid password
	    // should disable logins after N messages
	    // delay return to rate-limit brute-force attacks
	    await new Promise((r) => setTimeout(r, 2000)); // two second delay
	    return done(null, false, { 'message' : 'Wrong password' });
	}
	// success!
	// should create a user object here, associated with a unique identifier
	return done(null, username);
    });


// App configuration

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
    done(null, user);
});
// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
    done(null, uid);
});

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// Endpoints =>

app.get('/', checkLoggedIn, async (req, res) => {
    const userDetails = await database.getUserDetailsGivenEmail(req.user);
        const res_id = userDetails['id'];    
        const userType = userDetails['type'];  
      if(userType === 'C'){          
          res.redirect('/customer/home/' + res_id);
      }else{
          res.redirect('/restaurant/home/'+ res_id);  
      }
});


// Like login, but add a new user and password IFF one doesn't exist already.
// If we successfully add a new user, go to /login, else, back to /register.
// Use req.body to access data (as in, req.body['username']).
// Use res.redirect to change URLs.
  app.post('/signup',
       (req, res) => {
           const username = req.body['username'];
           const password = req.body['password'];
           const name = req.body['name']
           const type = req.body['type'].charAt(0);
           if (addUser(username, password, name, type)) {
            res.redirect('/login');
           } else {
            res.redirect('/');
           }
       });

app.get('/login',
	(req, res) => {
        res.sendFile('index.html', {root: path.join(__dirname, "../client")});
    });
  
  app.post('/login',
      passport.authenticate('local' , {     // use username/password authentication
          'failureRedirect' : '/login'      // otherwise, back to login
      }), async (req, res) => {
          const userDetails = await database.getUserDetailsGivenEmail(req.user);
        const res_id = userDetails['id'];    
        const userType = userDetails['type'];  
          if(userType === 'C'){          
              res.redirect('/customer/home/' + res_id);
          }else{
              res.redirect('/restaurant/home/'+ res_id);  
          }
      }
  );


app.get('/customers', async (req,res) =>{
    const id = 4;
    const userReview = await database.getCustomerReviews(id);
    res.write(JSON.stringify({review : userReview}));
    res.end();
});

app.get('/restaurants',async (req,res) =>{
    const srcOfRestaurants = await database.getImagePhotosForFrontPage();
    res.write(JSON.stringify(srcOfRestaurants));
    res.end();
});

app.post('/userInfo', async (req,res) => {
    const idUser = req.body['id'];
    const userName = await database.getUserNameFromId(idUser);
    res.write(JSON.stringify(userName));
    res.end();
});


app.get('/info/*',async (req,res) =>{
    const url = req.url;
    const restaurant = url.substring(6);

    //TODO: change remove Number
    const info = await (async ()=>database.getRestInfo(Number(restaurant)))();
    console.log("index.js received: "+JSON.stringify(info));
    res.write(JSON.stringify(info));
    res.end();
});

app.get('/storefront/*', (req, res)=>{
    const url = req.url;

    res.writeHead(200, {'ContentType':'text/html'});
    res.write(readFileSync('client/RestaurantShowcase.html'));

    res.end();
});

app.get('/customer/profile/', (req, res)=>{
    res.writeHead(200, {'ContentType':'text/html'});
    res.write(readFileSync('client/UserProfile.html'))
    res.end();
});


app.get('/restaurant/home/:rest_id',checkLoggedIn, async (req,res) => {
    const userDetails = await database.getUserDetailsGivenEmail(req.user);
        const resId = userDetails['id']; 
    if (req.params.rest_id === JSON.stringify(resId)){    
        res.sendFile('restaurant_personal.html', {root: path.join(__dirname, "../client")});
    }else{
        res.redirect('/restaurant/home/' + resId); 
    }
})

app.get('/customer/home/:rest_id',checkLoggedIn, async (req,res) => {
    const userDetails = await database.getUserDetailsGivenEmail(req.user);
    const resId = userDetails['id']; 
    if (req.params.rest_id === JSON.stringify(resId)){    
        res.sendFile('index.html', {root: path.join(__dirname, "../client")});
    }else{
        res.redirect('/customer/home/' + resId); 
    }

    res.sendFile('index.html', {root: path.join(__dirname, "../client")});
})

app.get('/restaurant/cust_list/:rest_id', (req,res) => {
    res.sendFile('restaurant_cust_list.html', {root: path.join(__dirname, "../client")});
})

app.get('/restaurant/profile/:rest_id', (req,res) => {
    res.sendFile('restaurant_profile.html', {root: path.join(__dirname, "../client")});
})

app.get('/restaurant/:rest_id/orders', async (req,res) => {
    let orders;
    try{
        orders = await database.getOrders(req.params['rest_id']);
    }
    catch(error){
        console.log(error);
    } 
    res.send(orders);
});

app.get("/restaurant/:rest_id/cust_list", async (req, res) =>{
    let cust_list;
    try{    
        cust_list = await database.getCustomerList(req.params['rest_id']);
    }
    catch(error){
        console.log(error);
    } 
    res.send(cust_list);
});

app.get("/restaurant/:rest_id/profile", async (req, res) => {
    let profile;
    try{
        profile = await database.getRestProfile(req.params['rest_id']);
    }
    catch(error){
        console.log(error);
    } 
    res.send(profile);
});

app.post("/restaurant/:rest_id/profile-general/update", async (req, res) => {
    try{
        await database.setGenProfile(req.params['rest_id'], req.body);
    }
    catch(error){
        console.log("Error with calling setGenProfile(): ",error);
    }
    
    res.end();
});

app.post("/restaurant/:rest_id/profile-account/update", async (req, res) => {
    try{
        await database.setAccProfile(req.params['rest_id'], req.body);
    }
    catch(error){
        console.log("Error with calling setAccProfile(): ", error);
    }
    res.end();
});

//endpoint to get cart items
app.get("/get/cart/items",async(req, res)=>{
    res.writeHead(200,{'ContentType':'text/json'});
    res.write(JSON.stringify(cart));
    res.end();
});

//endpoint to add cart items
app.post("/add/cart",async(req, res)=>{
    let info = (req.body);

    const mealCopy = info[0];
    const day = info[1];

    //changing the field names of the object
    meal = {};
    meal['title'] = mealCopy['name'];
    meal['desc'] = mealCopy['description'];
    meal['img'] = mealCopy['image'];
    meal['time'] = mealCopy['time'];

    if(cart[day]){
       cart[day].push(meal);
    }
    else{
        cart[day] = [meal];
    }
    
    console.log(cart);
    res.writeHead(200);
    res.end();
});

//get cart
app.get('/cart',(req, res)=>{
    res.sendFile('cart.html', {root: path.join(__dirname, "../client")});
});

app.get("/customer/123/profile", (req, res) => {
    res.send(JSON.stringify({
        name: faker.name.findName(),
        add: "32 CoolestProject St Amherst MA 01003",
        ph: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        pass: faker.internet.password(),
        cardnum: faker.finance.creditCardNumber(),
        cvv: faker.finance.creditCardCVV(),
        zip: faker.address.zipCode(),
        exp: faker.date.future(),
        card_name: faker.name.findName()
    }));
});


app.post("/customer/:cust_id/profile/update", (req, res) => {
    //**************IMP NEEDS TO BE FILLED IN---code to store req's body in db -- will be completed after milestone 2's submission
    res.send({});
});

app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/login'); // back to login
});

app.use(express.static('client'));
// app.use(express.static('images/front-page'));

// Handles MIME types of css, javascript, html and image types(.png,.jpeg,.jpg etc).
app.get('*',(req,res) =>{
    const urlParsed = parse(req.url);
    const path = urlParsed.pathname.replace('/', '');
    if(existsSync(path)){ 
        if (path.endsWith(".html")){
            res.writeHead(200, {"Content-Type" : "text/html"});
        } else if(path.endsWith('.css')){
            res.writeHead(200, {"Content-Type" : "text/css"});
        }else if(path.endsWith('.js')){
            res.writeHead(200, {"Content-Type" : "text/javascript"});
        }
        res.write(readFileSync(path));
        res.end();
    }else{
        res.writeHead(404);
        res.end();
    }
});

app.listen(port, ()=>{
    console.log("Mealery listening at "+port);
});


let users = { 'emery@gmail.com' : [ '12345', 'emery', 
    '2401f90940e037305f71ffa15275fb0d',
    '61236629f33285cbc73dc563cfc49e96a00396dc9e3a220d7cd5aad0fa2f3827d03d41d55cb2834042119e5f495fc3dc8ba3073429dd5a5a1430888e0d115250', 'C'
  ] };
  
  // Returns true iff the user exists.
async function findUser(username) {
    const userExits = await database.checkIfUserExits(username);
      if (!userExits) {    
        return false;
      } else {
        return true;
      }
  }
  
  // TODO
  // Returns true iff the password is the one we have stored (in plaintext = bad but easy).
async function validatePassword(username, password) {
      if (!findUser(username)) { 
        return false;
      }
      // TODO CHECK PASSWORD
      const userDetails = await database.getUserDetailsGivenEmail(username);
        const salt = userDetails['salt'];    
        const hash = userDetails['hash'];  
      if(!mc.check(password, salt, hash)){   // TODO : DB read
          return false;
      }
      return true;
  }
  
  // Add a user to the "database".
  // TODO
async function addUser(username, password, name, type) {
      if (await findUser(username)) {  
        return false;
      }else{
        return addUserAfterChecking(username, password, name, type);
      }
  }

  async function addUserAfterChecking(username, password, name, type){
    const [salt,hash] = mc.hash(password);  
    const uniqueId = randomIdGenerator();

  await database.updateDBWithPersonalInfo(uniqueId,username,name, salt, hash, type);
    return true;
  }

  
  // Routes
  
  function checkLoggedIn(req, res, next) {
      if (req.isAuthenticated()) {
      // If we are authenticated, run the next route.
        next();
      } else {
      // Otherwise, redirect to the login page.
        res.redirect('/login');
      }
  }

// Generates a 8 digit random number.
function randomIdGenerator(){
    const num = Math.floor(Math.random() * 100000000);
    return num;
}

