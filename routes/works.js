// const express = require('express');
// const authController = require('../controllers/auth');
// const router = express.Router();
// const mysql = require('mysql');
// const NodeCache = require( "node-cache" );
// const myCache = new NodeCache();
// const db = mysql.createConnection({
//   host:'localhost',
//   user:'pearl',
//   password:'pearlprakriti@123',
//   database: 'Phoenix'
// });
// router.post("/newWork", (req,res,next)=> {
//   res.send("hi from newWork");
//   var str = req.body.noOfAssign +" "+ req.body.hrs+" "+ req.body.AssignName;
//   var date = new Date();
//   var day = "";
//   var daydate = "";
//   switch (date.getDay()) {
//     case 1: day = "mon";break;
//     case 2: day = "tue";break;
//     case 3: day = "wed";break;
//     case 4: day = "thu";break;
//     case 5: day = "fri";break;
//     case 6: day = "sat";break;
//     case 7: day = "sun";break;
//   }
//   daydate = day + "date";
//   console.log(day);
//   console.log(daydate);
//   console.log(myCache.get("userdata"));
//   var tday = date.getFullYear() +'-'+(date.getMonth()+1)+ '-' +date.getDate();
//   console.log(str);
//   console.log();
// // ----------------------------------DB QUERY--------------------------
//   // db.query("SELECT * FROM weeklyactivity where ")
//
//   // res.render('index');
// });
//
// module.exports = router;
