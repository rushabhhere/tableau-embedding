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

router.post('/sites', isAuthenticated, async (req, res) => {
  const {
    name,
    tableau_username,
    tableau_client_id,
    tableau_secret_id,
    tableau_secret_value,
    tableau_pat_name,
    tableau_pat_secret,
    tableau_api_base_url,
    tableau_site_id,
    tableau_site_name,
  } = req.body;

  try {
    const site = await prisma.site.create({
      data: {
        name,
        tableau_username,
        tableau_client_id,
        tableau_secret_id,
        tableau_secret_value,
        tableau_pat_name,
        tableau_pat_secret,
        tableau_api_base_url,
        tableau_site_id,
        tableau_site_name,
        user: {
          connect: { id: req.user.id },
        },
      },
      select: { id: true, name: true },
    });

    return res.json({
      error: false,
      message: `Site ${site.name} created`,
      site,
    });
  } catch (error) {
    console.log(error.message);

    return res.json({
      error: true,
      message: `Site "${name}" could not be created`,
    });
  }
});

module.exports = router;
