var db = require("../model/index");
const { jwtToken } = require("../utils/jsonwebtoken");
var User = db.userdetails;
var Todo = db.tododetails;
const bcrypt = require("bcrypt");

var getuser = async (req, res) => {
  res.json(req.user);
};
var addUser = async (req, res) => {
  const { password, email, name, phone } = req.body;
  const existingUser = await User.findOne({
    where: { name },
  });
  if (existingUser) {
    return res.status(400).json("username already exists");
  }
  const existingemail = await User.findOne({
    where: { email: email },
  });
  if (existingemail) {
    return res.status(400).json("email already exists");
  }
  const existingPhone = await User.findOne({ where: { phone } });
  if (existingPhone) {
    return res.status(400).json("phone already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(req.body);
  let data = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });
  res.send(data);
};

const loginauthenticateduser = async (req, res) => {
  const { email, password } = req.body;
  const userEmail = await User.findOne({ where: { email: email } });
  let Token = jwtToken(userEmail);
  const encryptedpassword = await bcrypt.compare(password, userEmail.password);
  if (encryptedpassword) {
    res.status(200).json({ token: Token });
  } else {
    res.send("wrong password");
  }
};

// TodoparT
var createTodo = async (req, res) => {
  const { userEmail, Task, isCompleted } = req.body;
  let details = await Todo.create({ userEmail, Task, isCompleted });
  console.log(details);
  res.send({
    email: details.userEmail,
    Task: details.Task,
    completed: details.isCompleted,
    createdAt: details.createdAt,
  });
};
var getTodo = async (req, res) => {
    const {email} = req.user[0];
    console.log(email)
    const details = await Todo.findAll({where:{userEmail:email}})
    if(details){
    res.send(details)
}
};

module.exports = {
  addUser,
  loginauthenticateduser,
  getuser,
  createTodo,
  getTodo,
};
