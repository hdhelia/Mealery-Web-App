After cloning the repository, run `npm i `. Then, to run the project on your local host, run `npm start` and go to  localhost:8080 on your browser.  
 This web application requires a Postgres SQL database. To run locally you must create a database in the same format as ours (described in final.md) and store the connection url in the "localDatabaseURL" property of a secrets.json file at the root of the project.   
Your secrets.json should look like this:  

{
    "localDatabaseURL": "postgres://[username]:[password]@localhost/"
}

To run the app via Heroku, go to https://radiant-sierra-71657.herokuapp.com/ on your browser.