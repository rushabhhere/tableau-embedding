const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = Router();
const prisma = new PrismaClient();

router.get('/sites', isAuthenticated, async (req, res) => {
  const sites = await prisma.site.findMany({
    where: { userId: req.user.id },
    select: { id: true, name: true },
  });

  return res.json({
    error: false,
    message: `User ${req.user.email}'s sites found`,
    sites,
  });
});

module.exports = router;
