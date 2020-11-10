const express = require('express'); 
const faker = require('faker');
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


