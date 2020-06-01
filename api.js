// Require module
const express = require('express');

// Initialize express
const app = express();
const port = 63411;

app.listen(port,()=> {
    console.log('listening port: ' + port);
})

// Create api
app.get('/hello_world', (req,res)=>{
    res.send('Hello World listening on port: ' + port + '\n');
})