// Require module
const express = require('express');

// Initialize express
const app = express();
const PORT = 63411;
const HOST = '0.0.0.0';

// Create api
app.get('/hello_world', (req,res)=>{
    res.send('Hello World listening on port: ' + PORT + '\n');
})

app.listen(PORT, HOST)
console.log('listening port: ' + PORT);

