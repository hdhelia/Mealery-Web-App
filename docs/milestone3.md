# Database 

## Restaurants table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| id           | Integer   | restaurant id (primary-key) |
| name         | String    | name of the restaurant   |
| description  | String    | description of the restaurant   |
| address      | String    | address of the restaurant   |
| email        | String    | email of the restaurant   |
| phone_number | String    | phone number of the restaurant   |
| image         | String    | path to restaurant's pic   |
| menu         | JSON String    | dictionary of time of meal i.e. breakfast, etc (key) and list of meals (value). Meal is a JSON of name, image and description  |
| customer_list| JSON String | List of ids of the restaurant's customers   |
| orders      | JSON String    | dictionary of day (key) and list of orders (value). Order is a JSON of time of the meal and name   |
| reviews         | JSON strings    | list of dictionaries containing the number of stars and the review   |

## Customers table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| id           | Integer   | customer id (primary-key) |
| name         | String    | name of the customer   |
| phone_number | String    | phone number of the customer   |
| address      | String    | address of the customer   |
| image         | String    | path to customer's pic   |
| email        | String    | email of the customer   |

## Credentials table
| Column       | Data Type | Description              |
|--------------|-----------|--------------------------|
| id           | Integer   | customer/restaurant id (primary-key) |
| email        | String    | email of the customer/restaurant   |
| salt        | String    | salt for the restaurant/customer's encrypted password  |
| hash        | String    | hash for the restaurant/customer's encrypted password   |
| type      | String    | 'C' or 'R' to indicate user type |


# Division of Labor
Ananth Preetham (infinityp913) worked on the server to database connections on the restaurant's UI pages

Siddharth Preetham (sid0913) worked on the server to database connections on the customer's UI pages 

Harshal Dhelia (hdhelia@umass.edu) worked on the front page database connections and log in authenication
