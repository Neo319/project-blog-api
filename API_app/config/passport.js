// configuration for passport.js

const passport = require("passport");
const JwtStrategy = require("passport-jwt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");

const strategy = new JwtStrategy();
