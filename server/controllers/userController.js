const mysql = require('mysql2');

// const pool  = mysql.createConnection({
//     host : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     password : process.env.DB_PASS,
//     database : process.env.DB_NAME
// });

const pool  = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});



exports.view = (req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connection established between the server and database');
    
        connection.query('select * from covid19', (err, rows) => {
            connection.release();
            if(!err){
                res.render('home', {rows});
            }else{
                console.log('error');
            }

            console.log('The data from covid19 table: \n', rows);

        });
    
    });
}

exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connection established between the server and database');
    
    let searchTerm = req.body.search;
    // User the connection
    connection.query('SELECT * FROM covid19 WHERE hospital LIKE ? OR pincode LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
      connection.release();
      if (!err) {
        res.render('home', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
   });
}

exports.form = (req, res) => {
    res.render('addhospital');
}

exports.create =(req, res) => {
    const { pincode, hospital, state, district, beds, oxygentanks} = req.body;
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connection established between the server and database');
    
    
    let searchTerm = req.body.search;
  
    // User the connection
    connection.query('INSERT INTO covid19 SET pincode = ?, hospital = ?, state = ?, district = ?, beds = ?, oxygentanks = ?', [pincode, hospital, state, district, beds, oxygentanks], (err, rows) => {
      if (!err) {
        res.render('addhospital', { alert: 'Hospital added successfully.' });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
});
}

exports.update = (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connection established between the server and database');


      connection.query('SELECT * FROM covid19 WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        res.render('update', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);

    });
  });
}

exports.update2 = (req, res) => {
  const { pincode, hospital, state, district, beds, oxygentanks} = req.body;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connection established between the server and database');


  connection.query('UPDATE covid19 SET pincode = ?, hospital = ?, state = ?, district = ?, beds = ?, oxygentanks = ? WHERE id = ?', [pincode, hospital, state, district, beds, oxygentanks, req.params.id], (err, rows) => {
    connection.release();
    if (!err) {
      // User the connection
      pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connection established between the server and database');
    
      connection.query('SELECT * FROM covid19 WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        connection.release();
        if (!err) {
          res.render('update', { rows, alert: `${hospital} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from table: \n', rows);
        });
      });
    } else {
      console.log(err);
    }
    console.log('The data from table: \n', rows);
    });
  });
}




