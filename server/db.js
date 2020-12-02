const { queryResult } = require('pg-promise');
const process = require('process');
const pgp = require('pg-promise')();

let secrets;
let connection;
if (!process.env.DATABASE_URL) {
    secrets = require('../secrets.json');
    connection = secrets.localDatabaseURL;
} else {
	connection = process.env.DATABASE_URL;
}

const db = pgp(connection);

async function connectAndRun(task) {
    let connection = null;

    try {
        connection = await db.connect();
        return await task(connection);
    } catch (e) {
        throw e;
    } finally {
        try {
            connection.done();
        } catch(ignored) {

        }
    }
}

async function getOrders(rest_id){
    /**
     * This function takes rest_id and returns stringified json of orders
     */
    let queryResult;
    try{
        queryResult = await connectAndRun(db => db.any('SELECT orders FROM restaurants WHERE id = $1', rest_id));
    }
    catch(error){
        console.log(error);
    }
    const order_list_str = queryResult[0].orders; // queryResult is an array of all rows with id=rest_id. Since there'll only be one row with id=rest_id we do queryResult[0]
    const order_list = JSON.parse(order_list_str);

    for(day in order_list){
        for(order_obj of order_list[day]){
            let menu_list_str;
            try{
                queryResult = await connectAndRun(db => db.any('SELECT menu FROM restaurants WHERE id = $1', rest_id));
            }
            catch(error){
                console.log(error);
            }
            menu_list_str = queryResult[0].menu;  //since there'll only be one row with id=rest_id
            const menu_list = JSON.parse(menu_list_str);
            for(meal of menu_list[order_obj.time]){
                if(meal.name === order_obj.name){
                    order_obj['desc'] = meal.description;
                    order_obj['img'] = meal.image;
                }
            }
        }
    }
    return JSON.stringify(order_list);
}

async function getCustomerList(rest_id){
    /**
     * This function takes rest_id and returns stringified json of rest_id restaurant's customers
     */
    let queryResult;
    try{
        queryResult = await connectAndRun(db => db.any('SELECT customer_list FROM restaurants WHERE id = $1', rest_id));
    }
    catch(error){
        console.log(error);
    } 
    list_of_ids_str = queryResult[0].customer_list; //since there'll only be one row with id=rest_id
    const list_of_ids = JSON.parse(list_of_ids_str);
    const cust_list = [];
    for(id of list_of_ids){
        let querRes;
        try{
            querRes = await connectAndRun(db => db.any('SELECT * from customers WHERE id = $1', id));
        }
        catch(error){
            console.log(error);
        }
        customer = querRes[0]; //since there'll only be one row with id=rest_id
        cust_list.push(customer);
    }
    return JSON.stringify(cust_list);
}

async function getRestProfile(rest_id){
    /**
     * This function takes rest_id and returns stringified json of rest_id restaurant's profile
     */
    let queryResult;
    let name, desc, add, ph, email;
    try{
        queryResult = await connectAndRun(db => db.any('SELECT name FROM restaurants WHERE id = $1',rest_id));
        name = queryResult[0].name; //since there'll only be one row with id=rest_id

        queryResult = await connectAndRun(db => db.any('SELECT description FROM restaurants WHERE id = $1',rest_id)); 
        desc = queryResult[0].description; //since there'll only be one row with id=rest_id

        queryResult = await connectAndRun(db => db.any('SELECT address FROM restaurants WHERE id = $1',rest_id)); 
        add = queryResult[0].address; //since there'll only be one row with id=rest_id

        queryResult = await connectAndRun(db => db.any('SELECT phone_number FROM restaurants WHERE id = $1',rest_id));
        ph = queryResult[0].phone_number; //since there'll only be one row with id=rest_id

        queryResult = await connectAndRun(db => db.any('SELECT email FROM restaurants WHERE id = $1', rest_id));
        email = queryResult[0].email; //since there'll only be one row with id=rest_id
    }
    catch(error){
        console.log(error);
    }
    
    return JSON.stringify({
        name: name,
        desc: desc,
        add: add,
        ph: ph,
        email: email
    });
}

async function setGenProfile(rest_id, gen_profile){
    const name = gen_profile.name;
    const desc = gen_profile.desc;
    const add = gen_profile.add;
    const ph = gen_profile.ph;

    try{
        await connectAndRun(db => db.none("UPDATE restaurants SET name = $1, description = $2, addr = $3, phone_number = $4 WHERE id = $5", [name, desc, add, ph, rest_id]));
    }
    catch(error){
        console.log(error);
    }
}

async function setAccProfile(rest_id, acc_profile){
    const email = acc_profile.email;
    try{
        await connectAndRun(db => db.none("UPDATE restaurants SET email = $1 WHERE id = $2", [email, rest_id]));
    }
    catch(error){
        console.log(error);
    }
}

async function getRestInfo(rest_id){
    /*
        function takes in restaurant id and return's restaurant's info object
     */ 
    let info = [];
    try{
        info = await db.any('select * from restaurants where id=$1',[rest_id]);
        console.log(info);
    }

    catch(e){
        console.log(e);
    }
    info = info[0];
    //filling in the object details
    let obj = {};
    obj['name'] = info['name'];
    obj['description'] = info['description'];
    obj['image'] = ".."+info["image"];
    const menu = JSON.parse(info['menu']);
    obj['Breakfast'] = menu.Breakfast;
    obj['Lunch'] = menu.Lunch;
    obj['Dinner'] = menu.Dinner;
    const reviews = JSON.parse(info['reviews']);

    obj['reviews'] = reviews;

    let avg = 0.0;

    for(review of reviews){
        avg += review.stars;
    }

    avg /= reviews.length;

    //nearest 0.5
    obj['stars'] = Math.round(avg*2)/2;

    return obj;

}

async function getUserDetailsGivenEmail(email){

    let userDetails = [];
    try{
        userDetails = await db.any('SELECT * from credentials WHERE email = $1',[email]);
    }catch(e){
        console.log(e);
    }

    return userDetails[0]; // Returns the one and only query at index 0 since it is returned as an array.
}

async function checkIfUserExits(email){
    let userDetails = [];
    try{
        userDetails = await db.any('SELECT * from credentials WHERE email = $1',[email]);
    }catch(e){
        console.log(e);
    }

    if(userDetails.length === 0){
        console.log('db.js => Doesnot exists.');
        return false;
    }else{
        return true;
    }

}

async function updateDBWithPersonalInfo(uniqueId, email, name, salt, hash, type){
    // Update Credentials Table
    console.log('Before cred update');
    try{
        await db.none('INSERT INTO credentials (id, email, salt, hash, type) VALUES ($1,$2,$3,$4,$5)', [uniqueId,email,salt,hash,type]);
    }catch(e){
        console.log(e);
    }

    console.log("after cred update");

    if (type === 'C'){  // Update Customers Table
        try{
            await db.none('INSERT INTO customers (id, name, phone_number, address, image, email) VALUES ($1,$2,null,null,null,$3)', [uniqueId,name,email]);
        }catch(e){
            console.log(e);
        }

        console.log('After customer update');

    }else{   // Update Restaurants Table
        try{
            await db.none('INSERT INTO restaurants (id, name, description, address, email, phone_number, image, menu, customer_list,orders, reviews) VALUES ($1,$2,null,null,$3,null,null,null,null,null,null)', [uniqueId,name,email]);
        }catch(e){
            console.log(e);
        }

        console.log('After restaurant update');
    }

}

async function getImagePhotosForFrontPage(){
    let restList = [];
    try{
        resList = await db.any('SELECT id, image from restaurants ORDER BY image LIMIT 3');
    }catch(e){
        console.log(e);
    }

    return resList;
}

async function getUserNameFromId(id){
    let userName = [];
    try{
        userName  = await db.one('SELECT name from customers where id = $1', [id]);
    }catch(e){
        console.log(e);
    }

    return userName;
}

async function getCustomerReviews(id){
    let reviews = [];
    try{
        reviews  = await db.one('SELECT reviews from restaurants where id = $1', [id]);
    }catch(e){
        console.log(e);
    }
    
    reviewMessage = (JSON.parse(reviews['reviews']))[0]['text'];

    return reviewMessage;
}


exports.getCustomerReviews = getCustomerReviews;
exports.getUserNameFromId = getUserNameFromId;
exports.getImagePhotosForFrontPage = getImagePhotosForFrontPage;
exports.updateDBWithPersonalInfo = updateDBWithPersonalInfo;
exports.checkIfUserExits = checkIfUserExits;
exports.getUserDetailsGivenEmail = getUserDetailsGivenEmail;
exports.getRestInfo = getRestInfo;
exports.getOrders = getOrders;
exports.getCustomerList = getCustomerList;
exports.getRestProfile = getRestProfile;
exports.setGenProfile = setGenProfile;
exports.setAccProfile = setAccProfile;