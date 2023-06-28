const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;
const pool = require('./db'); // Import the pool object from db.js


//Middleware part
app.use(bodyParser.json());

//Routes:
app.get('/employees', async (req,res) => {
    try{
        const query = 'SELECT * FROM employees'; //SQL query to select all employees
        const result = await pool.query(query); //Execute query using pool object

        res.json(result.rows); //returning the result as a json response
    } catch (error) {
        console.log("Error met on query", error);
        res.status(500).json({error:"An error has occured"});
    }
})

//Starting the server...
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});