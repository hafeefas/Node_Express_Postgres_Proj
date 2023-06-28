const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;
const combiningTablesRouter = require('./combiningTables');
const pool = require('./db'); // Import the pool object from db.js

// Middleware part
app.use(bodyParser.json());

// Routes
app.get('/employees', async (req, res) => {
  try {
    const query = 'SELECT * FROM employees'; // SQL query to select all employees
    const result = await pool.query(query); // Execute query using pool object
    res.json(result.rows); // Returning the result as a JSON response
  } catch (error) {
    console.log("Error occurred during query execution", error);
    res.status(500).json({ error: "An error has occurred" });
  }
});

app.get('/employees/two', async (req, res) => {
  try {
    const query = `
      SELECT e.id, e.name, e.is_working, e.project_name, d.department_name, d.location, d.manager_name
      FROM employees e
      INNER JOIN departments d ON e.department_id = d.department_id
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.log("An error has occurred", error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.get('/employees/three', async (req, res) => {
    try {
      const query = `
        SELECT e.id, e.name, e.is_working, e.project_name, d.department_name, d.location, d.manager_name, p.project_id, p.start_date, p.end_date, p.status
        FROM employees e
        INNER JOIN projects p ON e.department_id = p.project_id
        INNER JOIN departments d ON e.department_id = d.department_id
      `;
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.log("An error has occurred", error);
      res.status(500).json({ error: 'An error has occurred' });
    }
  });

  app.get('/employees/four', async (req,res) => {
    try{
        const query=
        `
                SELECT e.*, s.salary_id, s.amount, s.currency, s.payment_date, p.project_id, p.start_date, p.end_date, p.status, d.department_id, d.department_name
                FROM employees e
                INNER JOIN salaries s ON e.department_id = s.salary_id
                INNER JOIN projects p ON e.department_id = p.project_id
                INNER JOIN departments d ON e.department_id = d.department_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    }  catch (error) {
        console.log("An error has occured", error);
        res.status(500).json({errpr:'An error has occured'});
    }
});
  

app.post('/employees', async (req, res) => {
  // Extracting employee data from the request body
  const { name, is_working, project_name } = req.body;
  try {
    // SQL query to insert an employee
    const query = 'INSERT INTO employees (name, is_working, project_name) VALUES ($1, $2, $3)';
    // Wait for and then execute the query with provided data
    await pool.query(query, [name, is_working, project_name]);
    res.sendStatus(201); // Sends a success status code
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
// Use  combiningTablesRouter
app.use('/employees/two', combiningTablesRouter);
app.use('/employees/three', combiningTablesRouter)
app.use('/employees/four', combiningTablesRouter)


// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
