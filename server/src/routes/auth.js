const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = Router();
const prisma = new PrismaClient();

router.get('/user', isAuthenticated, (req, res) => {
  return res.json({
    error: false,
    message: 'User found',
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // checking if user exists
  const userCheck = await prisma.user.findUnique({
    where: { email },
  });

  if (userCheck) {
    return res.status(400).json({
      error: true,
      message: `User with email ${email} already exists`,
    });
  }

  // validating password
  if (password.trim().length < 6) {
    return res.status(400).json({
      error: true,
      message: 'Password must be at least 6 characters long',
    });
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));

  // creating user
  const newUser = await prisma.user.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, salt),
    },
  });

  res.cookie('_uid', jwt.sign(newUser.id, process.env.JWT_SECRET), {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.json({
    error: false,
    message: `User registration successful for ${email}`,
    user: {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(400).json({
      error: true,
      message: 'Invalid username or password',
    });
  }

  res.cookie('_uid', jwt.sign(user.id, process.env.JWT_SECRET), {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.json({
    error: false,
    message: 'Logged in successfully',
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
});

router.post('/logout', async (_req, res) => {
  res.clearCookie('_uid');
  res.json({ error: false, message: 'Logged out successfully' });
});

module.exports = router;
