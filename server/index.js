const express = require('express'); 
const { readFileSync, existsSync } = require('fs');
const { parse } = require('url');
const app = express();
const port = process.env.PORT || 8080;    
const faker = require("faker");
const database = require('./db.js');
const path = require('path');

app.use('/', express.static('client/'));

app.get('/customers',(req,res) =>{
    res.write("List of customers");
    res.end();
});

app.get('/restaurants',(req,res) =>{
    const listOfRestaurants = [];
    for(let i=0;i<4;i++){
        const resName = faker.company.companyName();
        const resDesc = faker.company.catchPhrase();
        const jsonVal = { 'name' : JSON.stringify(resName) , 'description' : JSON.stringify(resDesc)};
        listOfRestaurants.push(jsonVal);
    }
    res.write(JSON.stringify(listOfRestaurants));
    res.end();
});


app.get('/info/restaurant',(req,res) =>{
    const fake = {
        name:"Pita Dockets",
        image:"../images/restaurant-pics/pitapockets.jpg",
        stars:4.5,
        description:"Mock description alert! What do you get when you combine a budget pita pockets with a generic template? Me!",
        reviews:[
            {   
                image:"../images/profile-pics/default-profile-pic.png",
                stars:3.5,
                text:"Never eaten the food here, but love the website!",
            },
            {   
                image:"../images/profile-pics/default-profile-pic.png",
                stars:3.5,
                text:"Never eaten the food here, but love the website!",
            },{   
                image:"../images/profile-pics/default-profile-pic.png",
                stars:3.5,
                text:"Never eaten the food here, but love the website!",
            },{   
                image:"../images/profile-pics/default-profile-pic.png",
                stars:3.5,
                text:"Never eaten the food here, but love the website!",
            },{   
                image:"../images/profile-pics/default-profile-pic.png",
                stars:3.5,
                text:"Never eaten the food here, but love the website!",
            },{   
                image:"../images/profile-pics/default-profile-pic.png",
                stars:3.5,
                text:"Never eaten the food here, but love the website!",
            },{   
                image:"../images/profile-pics/default-profile-pic.png",
                stars:3.5,
                text:"Never eaten the food here, but love the website!",
            },{   
                image:"../images/profile-pics/default-profile-pic.png",
                stars:3.5,
                text:"Never eaten the food here, but love the website!",
            },
        ],
        breakfast:[
            {
                name:"Meal sample",
                image:"./images/restaurant-pics/sample-img.jpg",
                description:"Here is a mock description that makes you want to buy this meal"
            },
            {
                name:"Meal sample",
                image:"./images/restaurant-pics/sample-img.jpg",
                description:"Here is a mock description that makes you want to buy this meal"
            },
            {
                name:"Meal sample",
                image:"./images/restaurant-pics/sample-img.jpg",
                description:"Here is a mock description that makes you want to buy this meal"
            },
        ],
        lunch:[
            {
                name:"Meal sample",
                image:"../images/restaurant-pics/sample-img.jpg",
                description:"Here is a mock description that makes you want to buy this meal"
            },
        ],
        dinner:[
            {
                name:"Meal sample",
                image:"../images/restaurant-pics/sample-img.jpg",
                description:"Here is a mock description that makes you want to buy this meal"
            },
        ]

    };

    res.write(JSON.stringify(fake));
    res.end();
});


app.get('/info/restaurant',(req,res) =>{
    const fake = {
        name:"Pita Dockets",
        image:"../images/restaurant-pics/pitapockets.jpg",
        stars:4.5,
        description:"Mock description alert! What do you get when you combine a budget pita pockets with a generic template? Me!",
        reviews:[
            {   
                image:"../images/profile-pics/default-profile-pic.png",
                stars:3.5,
                text:"Never eaten the food here, but love the website!",
            }
        ],
        breakfast:[
            {
                name:"Meal sample",
                image:"../images/restaurant-pics/sample-img.jpg",
                description:"Here is a mock description that makes you want to buy this meal"
            },
            {
                name:"Meal sample",
                image:"../images/restaurant-pics/sample-img.jpg",
                description:"Here is a mock description that makes you want to buy this meal"
            },
            {
                name:"Meal sample",
                image:"../images/restaurant-pics/sample-img.jpg",
                description:"Here is a mock description that makes you want to buy this meal"
            },
        ],
        lunch:[
            {
                name:"Meal sample",
                image:"../images/restaurant-pics/sample-img.jpg",
                description:"Here is a mock description that makes you want to buy this meal"
            },
        ],
        dinner:[
            {
                name:"Meal sample",
                image:"../images/restaurant-pics/sample-img.jpg",
                description:"Here is a mock description that makes you want to buy this meal"
            },
        ]

    };

    res.write(JSON.stringify(fake));
    res.end();
});

app.post('/signup',(req,res) =>{
    
});

app.post('/login',(req,res) =>{
    
});

app.get('/restaurant/:rest_id', (req,res) => {
    res.sendFile('restaurant_personal.html', {root: path.join(__dirname, "../client")});
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

app.post("/restaurant/:rest_id/profile-general/update", (req, res) => {
    //**************IMP NEEDS TO BE FILLED IN---code to store req's body in db -- will be completed after milestone 2's submission
    res.send({});
});

app.post("/restaurant/:rest_id/profile-account/update", (req, res) => {
    //**************IMP NEEDS TO BE FILLED IN---code to store req's body in db -- will be completed after milestone 2's submission
    res.send({});
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

app.post("/restaurant/:rest_id/profile/update", (req, res) => {
    //**************IMP NEEDS TO BE FILLED IN---code to store req's body in db -- will be completed after milestone 2's submission
    res.send({});
});


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


