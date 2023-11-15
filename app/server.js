const express = require('express'); // Used to display HTML pages
const bodyParser = require('body-parser'); // Used to handle HTML post
const { render } = require('ejs');

const app = express();
const app_port = 3000;

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
  let makes

  makes = await getMakes()

  res.render('index', { pageTitle: pageTitle, autoMakes: makes })
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
    user: 'postgres',
    host: '127.0.0.1',
    database: 'notscrapyet',
    password: 'password',
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
    user: 'postgres',
    host: '127.0.0.1',
    database: 'notscrapyet',
    password: 'password',
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




// result.rows.forEach(row => {
//   console.log('Column1:', row.column1, 'Column2:', row.column2);
//   // Adjust column names based on your table structure
// });




// <?php
// // define('SECRETKEY', 'mysecretkey1234');
// // define('ENCRYPTION_IV', '1234567891011121');
// define('DB_SERVER', 'localhost');
// define('DB_USERNAME', 'geryonghost');
// define('DB_PASSWORD', '4f7^fZ21puDdZeNx%Iy@');
// define('DB_NAME', 'autos');
 
/* Attempt to connect to MySQL database */
// $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
// if($conn === false){
    // die("ERROR: Could not connect. " . mysqli_connect_error());
// }

// function getYears($conn) {
//     $sql = 'SELECT DISTINCT year FROM models ORDER BY year ASC';
// 	$result = mysqli_query($conn, $sql);

// 	if (mysqli_num_rows($result) > 0) {
// 		while($row = mysqli_fetch_assoc($result)) {
// 			$years[] = $row['year'];
// 		}
// 	}
//     return $years;
// }


// function getMakes() {
// 	global $conn;
//     $sql = 'SELECT DISTINCT auto_make FROM ads ORDER BY auto_make ASC';
// 	$result = mysqli_query($conn, $sql);

// 	if (mysqli_num_rows($result) > 0) {
// 		while($row = mysqli_fetch_assoc($result)) {
// 			$makes[] = $row['auto_make'];
// 		}
// 	}
//     return $makes;
// }
// function getModels($make) {
// 	global $conn;
//     $sql = 'SELECT DISTINCT auto_model FROM ads WHERE auto_make = "' . $make . '" ORDER BY auto_model ASC';
// 	// echo $sql;
// 	$result = mysqli_query($conn, $sql);

// 	if (mysqli_num_rows($result) > 0) {
// 		while($row = mysqli_fetch_assoc($result)) {
// 			$models[] = $row['auto_model'];
// 		}
// 	}
//     return $models;
// }

// // if($_GET['action'] == 'years') {
// //     $return_json = getYears($conn);
// // }
// if($_GET['action'] == 'makes') {
//     $return_json = getMakes();
// }
// if($_GET['action'] == 'models') {
//     $return_json = getModels($_GET['make']);
// }

// header('Content-Type: application/json');
// echo json_encode($return_json);

// mysqli_close($conn);

// ?>