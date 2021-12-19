# Sam's Tarven.com

## Background 👋 

Sam's Tarven is a small local liquor business based in kingsway, benoni in Gauteng, South Africa.

At the start of this project the business didn't have a price scanner for keeping track of item prices and
for managing cost price and selling price of their products.
This led to price inconsistency as employees would often forget prices for items rarely bought. Keeping track
of prices by documenting them on paper also faced the challenge of being outdated and would often cause employees to be slower in terms of processing customers orders.

This web based application aims to solve this particular problem using the resources modern tech has to offer, granted it's rather a small project but it will the beginning of something even greater.

### Languages and Tools used:

<img align="left" alt="Visual Studio Code" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />
<img align="left" alt="HTML5" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />
<img align="left" alt="CSS3" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />
<img align="left" alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />
<img align="left" alt="Node.js" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
<img align="left" alt="SQL" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/sql/sql.png" />
<img align="left" alt="MySQL" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mysql/mysql.png" />
<img align="left" alt="Terminal" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png" />


<br />
<br />

---

# 🔭 Features, Functionality and Description

## Description:
- The app uses node and Express to connect to a mySQL database 
  stored on my local mention and sends the retrieved data to port 5000 of the
  local router IP address where client side can fetch it from.

- Clients can request a list products by searching for them in the 
  search box and the server side retrieves the results and
  then it's displayed in an HTML table

- It also provides features for calculating the total of varies products
  clients may wish to add when searching

## Current Issues:
- Database is currently stored on a local machine, 
  looking for ways to move it to a remote server
  so it can be accessed from anywhere.

- Website is currently running offline (local host),
  looking for ways to host it online.

- CSS has multiple files, one for each page. 
  looking for ways to produce more clean CSS and its HTML identifiers.

- The website page may not fully fit on PC's with higher resolution 
  (tested on resolution 1366x768(16:9) )

## Requested Features

- The admin session is currently empty, 
  management has requested features to add, update and remove products 
  currently stored in the database base using an API call. 
    - At the moment creating proper fields for add, delete and Update 
      using HTML and CSS is all that's required. 
      The server side functionality can later be added.

- Improving the calculator session for better look, 
  functionality and ease of use by clients

- Improvements, additions and modifications of current style and 
  look are all accepted
    
- Suggestions and improvements for better code structure are all accepted

# 🌱 Future considerations

- A Transformation!
    
- Transforming the entire website to offer online services to customers 
  such as buying products online, booking and delivery,
  products special etc.
- Turning it into an e-commerce website and 
  still provide services to administrators for tracking their products and 
  services that can help improve business decisions.
