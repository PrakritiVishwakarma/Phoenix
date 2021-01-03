const express = require('express');
const mysql = require('mysql');
const db = mysql.createConnection({
  host:'localhost',
  user:'pearl',
  password:'pearlprakriti@123',
  database: 'Phoenix'
});
const router = express.Router();

router.get('/',(req,res)=>{
  res.render('intro');
});
router.get('/settings',(req,res)=>{
  res.render('settings')
});
router.get('/index', (req,res)=>{
  var auth = req.query.auth;
  var lastVisit = "";
  db.query("select * from visit inner JOIN users on users.userId = visit.userId and username = ? ", auth, (err,result)=>{
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      lastVisit = result[0].lastVisit;
      // console.log(typeof(lastVisit));
    }
    res.render('index',{message: auth, ls:result[0].lastVisit, ps:result[0].presentVisit,five:result[0].five,four:result[0].four,three:result[0].three,two:result[0].two,one:result[0].one,W1:result[0].pW,W2:result[0].lastW,W3:result[0].fiveW,W4:result[0].fourW,W5:result[0].threeW,W6:result[0].twoW,W7:result[0].oneW})

  })
});

router.get('/login',(req,res)=>{
  res.render('login');
});

router.get('/register',(req,res)=>{
  res.render('register');
});
router.get('/settings',(req,res)=>{
  res.render('settings');
});
// router.get('/auth/login',(req,res)=>{
//   // res.send("hello pearl from routes pages");
//   res.render('index');
// })
module.exports = router;
