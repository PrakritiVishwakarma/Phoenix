const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const mysql = require('mysql');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const url = require('url');
const path = require('path')
const app = express();
const publicDirectory = path.join(__dirname,'../public');
// console.log(publicDirectory);
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended:false}));

const db = mysql.createConnection({
  host:'localhost',
  user:'pearl',
  password:'pearlprakriti@123',
  database: 'Phoenix'
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const globalresults ="";
  db.query('SELECT * FROM users WHERE username = ?', username, (err,result) =>{
    if(err){
        throw err;
      }
    else if (result.length===0 || result[0].pass!==password) {
        return res.render('login',{
          message: 'Invalid Username or Password'
        })
      }
    else{
      var data = {id:result[0].userId, name:result[0].username}
      myCache.set("userdata",data,10000);   //caching userdata
      var lastVisit = "";
      var date = new Date();
      var tday = date.getFullYear() +'-'+(date.getMonth()+1)+ '-' +date.getDate();
      var newUserTalk = "";
      // console.log(myCache.get("userdata").name);

      const id = result[0].userId;
      db.query('SELECT * from visit where userId = ?',result[0].userId,(err,visitResults)=>{
        if(err){
          throw err;
        }
        else if(visitResults.length === 0){// new user------------------------------Already present then change date
                console.log(visitResults.length);

                db.query('INSERT INTO visit SET ? ',{lastVisit: tday, presentVisit:tday, userId: id,five:tday,four:tday,three:tday,two:tday,one:tday},(err,result)=>{
                  if(err){
                    throw err;
                  }
                  else{
                    console.log('Inserted');
                    newUserTalk = "Welcome i am glad you came here";
                  }
                })
              }
          else{//old user-----------------------------if not then enter date
            var present = String(visitResults[0].presentVisit);
            // var last = String(visitResults[0].lastVisit);
            console.log(typeof(String(visitResults[0].presentVisit)));
            console.log("date "+ date);
            if (String(visitResults[0].presentVisit) !== tday) {
                db.query('UPDATE visit SET ? WHERE userId = ?',[{one:String(visitResults[0].two),two: String(visitResults[0].three),three:String(visitResults[0].four) ,four:String(visitResults[0].five) , five:String(visitResults[0].lastVisit) ,lastVisit: present,presentVisit:tday, oneW:String(visitResults[0].twoW),twoW:String(visitResults[0].threeW),threeW:String(visitResults[0].fourW), fourW:String(visitResults[0].fiveW),fiveW:String(visitResults[0].lastW), lastW:String(visitResults[0].pW), pW:"" }, id], (err,res)=>{
                  if(err){
                    throw err;
                    }
                  else{
                    console.log('Visit Updated');

                    }
                  })
                }
              }
              lastVisit = visitResults[0].presentVisit;

            // console.log(newUserTalk);

        }
      )
      // console.log(result[0].userId);
      const name = "juhi";
          return res.redirect('/index?auth='+result[0].username);
    }
  });
}) //router post

router.post("/newWork", (req,res,next)=> {
  res.send("hi from newWork");
  var str = "assignments: "+req.body.noOfAssign +" hours: "+ req.body.hrs+"  name:"+ req.body.AssignName;
  var date = new Date();
  var day = "";
  var daydate = "";
  var id = myCache.get("userdata").id;
  var tday = date.getFullYear() +'-'+(date.getMonth()+1)+ '-' +date.getDate();
  db.query('SELECT * from visit where userId = ?',id,(err,visitResults)=>{
    if (String(visitResults[0].presentVisit)===tday) {
      db.query("UPDATE visit SET ? where userId = ?",[{pW:str},id],(err,result)=>{
        if (err) {
          throw err;
        }
        else {
          console.log("Work updated !!");
        }
      })
    }
    else {
      console.log('some error has occured');
    }
  })
  console.log("today's day---"+date.getDay());
  // console.log(daydate);
  // console.log(myCache.get("userdata"));
  // console.log(str);
  // console.log();
// ----------------------------------DB QUERY--------------------------


  // res.render('index');
});

router.post('/register', authController.register);




module.exports = router;
