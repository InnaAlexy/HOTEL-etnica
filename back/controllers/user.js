const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const { generate } = require("../helpers/token.js");
const ROLES = require("../constants/roles.js");

///register
async function register(login, password) {
  if (!password) {
    throw new Error("введите пароль");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ login, password: passwordHash });
  const token = generate({ id: user.id });
  return { user, token };
}

//login
async function login(login, password) {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error("неверный логин");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("неверный пароль");
  }
  const token = generate({ id: user.id });
  return { user, token };
}

//get users
function getUsers() {
  return User.find();
}

//get user
function getUser(id) {
  return User.findById(id);
}

module.exports = {
  register,
  login,
  getUsers,
  getUser,
};
