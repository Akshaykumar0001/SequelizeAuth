const jwt = require("jsonwebtoken");
const db = require("../model");
const user = require("../model/user");
require("dotenv").config();
var User = db.userdetails;
var Todo = db.tododetails;
function authentication(req, res, next) {
  const authHeaders = req.headers["authorization"];
  var Token = authHeaders && authHeaders.split(" ")[1],
    decoded;
  try {
    decoded = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send("unauthorized user");
  }
  var demail = decoded.email;

  User.findAll({ where: { email: demail} })
    .then(function (user) {
      let finaluser = user.map((data) => {
        return { name: data.name, email: data.email, phone: data.phone };
      });
      req.user = finaluser;
      next();
    })
    .catch((err) => {
      console.log(err);
    });


//  Todo.findAll({ where: { name: dename } })
//   .then(function (user) {
//     req.user = user;
//     next();
//   })
//   .catch((err) => {
//     console.log(err);
//   });



}
module.exports = {
  authentication,
  
};
