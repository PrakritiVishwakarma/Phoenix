const jwt = require("jsonwebtoken");
const mysql = require('mysql');
const db = mysql.createConnection({
  host:'localhost',
  user:'pearl',
  password:'pearlprakriti@123',
  database: 'Phoenix'
});



exports.register = (req,res)=>{
  console.log(req.body);
   var fullname = req.body.fullname;
   const username = req.body.username;
   const email = req.body.email;
   const password = req.body.password;
   const confirmPassword = req.body.confirmPassword;

   db.query('SELECT email FROM users WHERE username = ?',username, (err,result)=>{
     if(err){
       throw err;
     }
     if(result.length > 0){
       return res.render('register',{
         message: 'This email is already in use'
       });
     } else if(password !== confirmPassword){
        return res.render('register',{
          message: 'Password do not matched'
        });
      }

      db.query('INSERT INTO users SET ?',{fullname:fullname, username: username, email: email, pass: password},(err, result)=>{
        if(err){
          throw err;
        }
        else{
          // return res.redirect('/index?auth=',+username);
          return res.render('index',{
            message:username
          });
        }
      });
   })
};


// exports.login = (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//
//   db.query('SELECT * FROM users WHERE username = ?', username, (err,result) =>{
//     if(err){
//       throw err;
//     }
//     else if (!result || result[0].pass!==password) {
//       return res.render('login',{
//         message: 'Invalid Username or Password'
//       })
//     }
//     else{
//       // console.log("yes i logged in");
//       // // console.log(result[0].pass);
//       // return res.render('index');
//       const id = result.userId;
//           const token = jwt.sign({id: id}, 'superSecretPassword',{
//             expiresIn: '90d'
//           });
//           console.log("token is "+token);
//
//           const cookieOptions = {
//             expires: new Date(
//               Date.now()+ 90 *24*60*60*1000
//             ),
//             httpOnly:true
//           }
//           res.cookie('jwt', token, cookieOptions);
//           // res.status(200).redirect('/');
//           res.render('index');
//     }
//   })
// }






// exports.login = async (req,res)=>{
//
//     const username = req.body.username;
//     const password = req.body.password;
//
//     db.query('SELECT * FROM register WHERE username = ?', username, (err, result)=>{
//       if(err){
//         throw err;
//       }
//       else {
//         console.log("password " +result);
//       })
//     }
    //   else if(!result || result.password!==password){
    //     return res.status(401).render('login',{
    //       message: 'User name or Password is incorrect'
    //     })
    //   }
    //   else {
    //     const id = result.userId;
    //     const token = jwt.sign({id: id}, 'superSecretPassword',{
    //       expiresIn: '90d'
    //     });
    //     console.log("token is "+token);
    //
    //     const cookieOptions = {
    //       expires: new Date(
    //         Date.now()+ 90 *24*60*60*1000
    //       ),
    //       httpOnly:true
    //     }
    //     res.cookie('jwt', token, cookieOptions);
    //     res.status(200).redirect('/');
    //   }
    // })
