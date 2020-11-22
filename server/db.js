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
    const cust_list = []
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

        queryResult = await connectAndRun(db => db.any('SELECT addr FROM restaurants WHERE id = $1',rest_id)); 
        add = queryResult[0].addr; //since there'll only be one row with id=rest_id

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
    })
}

exports.getOrders = getOrders;
exports.getCustomerList = getCustomerList;
exports.getRestProfile = getRestProfile;