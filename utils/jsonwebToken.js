const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtToken({ id, email, name} ) {
  const user = { id, email, name };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
  return accessToken;
}
module.exports = {
  jwtToken,
};
