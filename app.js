const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(express.static('public'));

// app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');

// conection pool
// const pool  = mysql.createConnection({
//     host : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     password : process.env.DB_PASS,
//     database : process.env.DB_NAME
// });

// pool.connect(function(err){
//     if(err) throw err;
//     console.log('connection established between the server and database');
// });

const pool  = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connection established between the server and database');
});

const routes = require('./server/routes/user');
app.use('/', routes);



app.listen(port, () => console.log(`listening on port ${port}`));