const cookieParser = require("cookie-parser");
const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const path = require("path");
const app = express();
const db = mysql.createConnection({
  host:'localhost',
  user:'pearl',
  password:'pearlprakriti@123',
  database: 'Phoenix'
});

db.connect((err)=>{
  if(err){
    throw err;
  }
  console.log("MySQL connected...");
});

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
// console.log(publicDirectory);
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.set('view engine','hbs');

//define route in seperate file
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
// app.use('/works',require('./routes/works'));
// app.use('/auth/login', require('./routes/pages'));

app.listen(3000, ()=>{
  console.log('Server started on port 3000...');
})
app.on('connection',(socket)=>{
  console.log('New Connection');
})
