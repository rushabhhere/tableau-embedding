const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

module.exports = async function isAuthenticated(req, res, next) {
  const { _uid } = req.cookies;

  if (!_uid) {
    return res.status(401).json({
      error: true,
      message: 'Unauthorized',
    });
  }

  try {
    const userId = jwt.verify(_uid, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      message: 'Unauthorized',
    });
  }
};
