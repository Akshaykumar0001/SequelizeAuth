var db = require("../model/index");
const { jwtToken } = require("../utils/jsonwebtoken");
var User = db.userdetails;
var Todo = db.tododetails;
const bcrypt = require("bcrypt");



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
  const { email } = req.user[0];
  console.log(email);
  const details = await Todo.findAll({ where: { userEmail: email } });
  if (details) {
    res.send(details);
  }
};



module.exports = {
  createTodo,
  getTodo,
};