const express = require('express'); // Used to display HTML pages
const bodyParser = require('body-parser'); // Used to handle HTML post
const { render } = require('ejs');

const app = express();
const app_port = 3000;

const db_address = 'postgres'
const db_name = 'notscrapyet'
const db_user = 'postgres'
const db_pass = 'password123'

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Handle the form submission
app.use(bodyParser.urlencoded({ extended: false }));

// Start the server
app.listen(app_port, () => {
  console.log(`Server listening on port ${app_port}`);
});

// Default Index Page
app.get('/', async (req, res) => {
  const pageTitle = 'Not Scrap Yet'
  // let makes

  const makes = await getMakes()
  const adcount = await getAdCount()
  const dealercount = await getDealerCount()
  const results = await getResults()

  res.render('index', { pageTitle: pageTitle, autoMakes: makes, adcount: adcount, dealercount: dealercount, results: results })
  // res.render('index', { pageTitle: pageTitle, autoMakes: makes, adcount: adcount })
})

// Index page make/model Ajax
app.get('/ajax', async (req, res) => {
  const make = req.query.make
  const models = await getModels(make)
  res.json(models)
})

// Displays the beta page
app.get('/beta', async (req, res) => {
  const pageTitle = 'Beta disclaimer'
  res.render('beta', { pageTitle })
})

// app.post('/', async (req, res) => {
  // let vin_number = req.body.search;
  
  // VALIDATE VIN USING REGEX

  // if (query != '') {
    // try {
      // forecast = await getWeatherNoDB(query);
      // Process the data to only pass the necessary data??
      // Create both Celsius and Farenheit which should make it easier on the other side to not require conversion
      
      // res.render('index', {forecast});
    // }
    // catch (error) {
      // console.error(error)
      // res.status(500).json({ success: false, error: error.message });
    // } 
  // }
// });

// app.get("/ajax-make-model", (req, res) => {
  
//   // Simulate fetching data from a database or an API
//   const data = { content: "This is the dynamically loaded content." };
//   res.json(data);
// });

// Connect to Postgres DB
const { Pool } = require('pg');

async function getMakes() {
  const pool = new Pool({
    user: db_user,
    host: db_address,
    database: db_name,
    password: db_pass,
    port: 5432, // default PostgreSQL port
  });

  return new Promise((resolve, reject) => {
    pool.query('SELECT DISTINCT auto_make FROM ads ORDER BY auto_make ASC', (error, result) => {
      if (error) {
        console.error('Error executing query', error);
        reject(error);
      } else {
        const makes = result.rows.map(row => Object.values(row));
        pool.end();
        resolve(makes);
      }
    });
  });
}

function getModels(make) {
  const pool = new Pool({
    user: db_user,
    host: db_address,
    database: db_name,
    password: db_pass,
    port: 5432, // default PostgreSQL port
  });

  return new Promise((resolve, reject) => {
    pool.query("SELECT DISTINCT auto_model FROM ads WHERE auto_make = '" + make + "' ORDER BY auto_model ASC", (error, result) => {
      if (error) {
        console.error('Error executing query', error);
        reject(error);
      } else {
        const models = result.rows.map(row => Object.values(row));
        pool.end();
        resolve(models);
      }
    });
  });
}

function getAdCount() {
  const pool = new Pool({
    user: db_user,
    host: db_address,
    database: db_name,
    password: db_pass,
    port: 5432, // default PostgreSQL port
  });
  return new Promise((resolve, reject) => {
    pool.query("SELECT COUNT(id) as count FROM ads", (error, result) => {
      if (error) {
        console.error('Error executing query', error);
        reject(error);
      } else {
        const adcount = result.rows.map(row => Object.values(row));
        pool.end();
        resolve(adcount);
      }
    });
  });
}

function getDealerCount() {
  const pool = new Pool({
    user: db_user,
    host: db_address,
    database: db_name,
    password: db_pass,
    port: 5432, // default PostgreSQL port
  });
  return new Promise((resolve, reject) => {
    pool.query("SELECT count(id) as count FROM dealers WHERE status = '1'", (error, result) => {
      if (error) {
        console.error('Error executing query', error);
        reject(error);
      } else {
        const dealercount = result.rows.map(row => Object.values(row));
        pool.end();
        resolve(dealercount);
      }
    });
  });
}

function getResults() {
  const pool = new Pool({
    user: db_user,
    host: db_address,
    database: db_name,
    password: db_pass,
    port: 5432, // default PostgreSQL port
  });
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM ads ORDER BY RANDOM() LIMIT 12", (error, result) => {
      if (error) {
        console.error('Error executing query', error)
        reject(error)
      } else {
        const results = result.rows
        pool.end();
        resolve(results)
      }
    });
  });
}
