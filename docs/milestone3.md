# Database 
Table 1: restaurants (id int PRIMARY KEY, name varchar(225), description varchar(225), addr varchar(225), email varchar(225), phone_number varchar(225), image varchar(225), menu varchar(600), customer_list varchar(600), orders varchar(600), reviews VARCHAR(600))

Table 2: customers (id int PRIMARY KEY, name varchar(225), phone_number varchar(225), addr varchar(225), image varchar(225), email varchar(225))

Table 3: credentials(id int PRIMARY KEY, email varchar(225), salt varchar(225), hash varchar(225), type varchar(1))

NOTE: type would be either 'C' or 'R' signifying customer or restaurant respectively


# Division of Labor
Ananth Preetham (infinityp913) worked on the server to database connections on the restaurant's UI pages

Siddharth Preetham (sid0913) worked on the server to database connections on the customer's UI pages 

Harshal Dhelia (hdhelia@umass.edu) worked on the front page database connections and log in authenication
