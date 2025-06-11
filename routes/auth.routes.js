const router = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User.model")
const verifyToken = require("../middlewares/auth.middlewares")


module.exports = router