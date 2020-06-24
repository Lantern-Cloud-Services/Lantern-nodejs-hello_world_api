// Require module
const express = require('express');
const persistence = require('./persistence.js')

// Initialize express
const app = express();
const PORT = 63411;
const HOST = '0.0.0.0';

// Driver={ODBC Driver 13 for SQL Server};Server=tcp:jcooklcs-sqlserver1.database.windows.net,1433;Database=jcookLCS-sqldb1;Uid=sqladmin;Pwd={your_password_here};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;

// Create api
app.get('/hello_world', (req,res)=>{
    res.send('Hello from node.js listening on port: ' + PORT + ' at host: ' + HOST);
})

app.get('/favorites', (req,res)=>{
    var result = persistence.executeStatement();
    res.send('Getting all favorites: ' + result);
})



app.listen(PORT, HOST)
console.log('listening port: ' + PORT);










