const express = require('express');
const router = express.Router();
const pool = require('./db'); // Import the pool object from db.js


router.get('/employees/two', async (req, res) => {
    try {
      const query = 
      `
        SELECT e.id, e.name, e.is_working, e.project_name, d.department_name, d.location, d.manager_name
        FROM employees e
        INNER JOIN departments d ON e.department_id = d.department_id
      `;
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.log("An error has occurred", error);
      res.status(500).json({ error: 'An error has occurred' });
    }
  });
  router.get('/employees/three', async (req, res) => {
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
router.get('/employees/four', async (req,res) => {
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
  

module.exports = router;
