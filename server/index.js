const express = require('express'); 
const { readFileSync, existsSync } = require('fs');
const { parse } = require('url');
const app = express();
const port = 8080;    
const faker = require("faker");



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

app.post('/signup',(req,res) =>{
    
});

app.post('/login',(req,res) =>{
    
});

// fake rest_id = 123 for milestone 1
app.get('/restaurant/123/orders/', (req,res) => {
    console.log("this is a fake img url: "+faker.image.food());
    res.send(JSON.stringify({
        "Monday": [
            {
            img: faker.image.food(),
            title: "Meal sample",
            desc: "Here is a mock description that makes you want to buy this meal",
            time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            }
        ],
        "Tuesday": [
            {
            img: faker.image.food(),
            title: "Meal sample",
            desc: "Here is a mock description that makes you want to buy this meal",
            time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            }
        ],
        "Wednesday": [
            {
            img: faker.image.food(),
            title: "Meal sample",
            desc: "Here is a mock description that makes you want to buy this meal",
            time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            }
        ],
        "Thursday": [
            {
            img: faker.image.food(),
            title: "Meal sample",
            desc: "Here is a mock description that makes you want to buy this meal",
            time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            }
        ],
        "Friday": [
            {
            img: faker.image.food(),
            title: "Meal sample",
            desc: "Here is a mock description that makes you want to buy this meal",
            time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            }
        ],
        "Saturday": [
            {
            img: faker.image.food(),
            title: "Meal sample",
            desc: "Here is a mock description that makes you want to buy this meal",
            time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            }
        ],
        "Sunday": [
            {
            img: faker.image.food(),
            title: "Meal sample",
            desc: "Here is a mock description that makes you want to buy this meal",
            time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Breakfast"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Lunch"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            },
            {
                img: faker.image.food(),
                title: "Meal sample",
                desc: "Here is a mock description that makes you want to buy this meal",
                time: "Dinner"
            }
        ]
    }));
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


