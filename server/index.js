const express = require('express'); 
const { readFileSync, existsSync } = require('fs');
const { parse } = require('url');
const app = express();
const port = 8080;    


app.get('/',(req,res) =>{
    res.writeHead(200, "Content-type : text/html");
    res.write(readFileSync("firstPage.html"));
    res.end();
});

app.get('/customers',(req,res) =>{
    res.write("List of customers");
    res.end();
});

app.get('/restaurants',(req,res) =>{
    res.write("List of restaurants");
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

app.post('/signup',(req,res) =>{
    
});

app.post('/login',(req,res) =>{
    
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

app.listen(port);


