const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');
const isAuthenticated = require('../middleware/isAuthenticated');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('node:crypto');
const {
  getRequestHeader,
  getProjects,
  getWorkbooks,
  getViews,
} = require('../utils');

const router = Router();
const prisma = new PrismaClient();

router.get('/token', isAuthenticated, async (req, res) => {
  const { siteId } = req.query;

  if (!siteId) {
    return res.status(400).json({
      error: true,
      message: 'Site ID is required',
    });
  }

  const siteData = await prisma.site.findUnique({
    where: { id: siteId },
  });

  if (!siteData) {
    return res.status(404).json({
      error: true,
      message: 'Site not found',
    });
  }

  if (siteData.userId !== req.user.id) {
    return res.status(403).json({
      error: true,
      message: 'You are not authorized to access this site',
    });
  }

  const {
    tableau_username,
    tableau_client_id,
    tableau_secret_id,
    tableau_secret_value,
  } = siteData;

  const jwtExpirySeconds = 300;

  const payload = {
    jti: randomBytes(64).toString('hex'), // unique token generated on every request
    iss: tableau_client_id,
    aud: 'tableau',
    sub: tableau_username,
    // https://help.tableau.com/current/api/embedding_api/en-us/docs/embedding_api_auth.html#configure-your-web-application-to-use-eas
    scp:
      req.user.role === 'EDITOR'
        ? ['tableau:views:embed', 'tableau:views:embed_authoring']
        : ['tableau:views:embed'],
  };

  const token = jwt.sign(payload, tableau_secret_value, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
    header: {
      kid: tableau_secret_id,
      iss: tableau_client_id,
    },
  });

  res.json({
    error: false,
    message: 'Generated token successfully',
    token,
  });
});

router.get('/projects', async (req, res) => {
  try {
    const { siteId } = req.query;

    if (!siteId) {
      return res.status(400).json({
        error: true,
        message: 'Site ID is required',
      });
    }

    const siteData = await prisma.site.findUnique({
      where: { id: siteId },
    });

    if (!siteData) {
      return res.status(404).json({
        error: true,
        message: 'Site not found',
      });
    }

    const {
      tableau_pat_name,
      tableau_pat_secret,
      tableau_api_base_url,
      tableau_site_id,
      tableau_site_name,
    } = siteData;

    const headers = await getRequestHeader({
      tableau_api_base_url,
      tableau_pat_name,
      tableau_pat_secret,
      tableau_site_name,
    });

    const projects = await getProjects(headers, {
      tableau_api_base_url,
      tableau_site_id,
    }); // get list of projects from Tableau API

    // attach workbooks to each project
    const projectsWithWorkbooks = await Promise.all(
      projects.map(async project => {
        const workbooks = await getWorkbooks(
          project.name,
          {
            tableau_api_base_url,
            tableau_site_id,
          },
          headers
        ); // get list of workbooks for project
        const workbooksWithViews = await Promise.all(
          workbooks.map(async workbook => {
            const views = await getViews(
              workbook.id,
              project.name,
              workbook.name,
              {
                tableau_api_base_url,
                tableau_site_id,
                tableau_site_name,
              },
              headers
            ); // get list of views for workbook
            return { ...workbook, views };
          })
        );
        return { ...project, workbooks: workbooksWithViews };
      })
    );

    res.json({
      error: false,
      message: 'Projects fetched successfully',
      projects: projectsWithWorkbooks,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
});

module.exports = router;
