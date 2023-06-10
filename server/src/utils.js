const axios = require('axios').default;

async function getRequestHeader(siteData) {
  const { data } = await axios.post(
    `${siteData.tableau_api_base_url}/auth/signin`,
    {
      credentials: {
        personalAccessTokenName: siteData.tableau_pat_name,
        personalAccessTokenSecret: siteData.tableau_pat_secret,
        site: {
          contentUrl: siteData.tableau_site_name,
        },
      },
    }
  );

  return {
    'X-Tableau-Auth': data.credentials.token,
  };
}

async function getProjects(headers, siteData) {
  const { data } = await axios.get(
    `${siteData.tableau_api_base_url}/sites/${siteData.tableau_site_id}/projects`, // base url stored in the database
    { headers }
  );

  return data.projects.project.map(p => ({ id: p.id, name: p.name }));
}

async function getWorkbooks(projectName, siteData, headers) {
  const { data } = await axios.get(
    `${siteData.tableau_api_base_url}/sites/${siteData.tableau_site_id}/workbooks`,
    {
      headers,
      params: {
        filter: `projectName:eq:${projectName}`,
      },
    }
  );

  if (data.pagination.totalAvailable === '0') {
    return [];
  } else {
    return data.workbooks.workbook.map(w => ({ id: w.id, name: w.name }));
  }
}

async function getViews(
  workbookId,
  projectName,
  workbookName,
  siteData,
  headers
) {
  const { data } = await axios.get(
    `${siteData.tableau_api_base_url}/sites/${siteData.tableau_site_id}/workbooks/${workbookId}`,
    { headers }
  );

  const api_base_url = siteData.tableau_api_base_url;
  const site_url = api_base_url.substring(0, api_base_url.indexOf('/', 8));

  return data.workbook.views.view.map(v => {
    const embedUrl =
      site_url +
      `/#/site/${siteData.tableau_site_name}/views/` +
      v.contentUrl.replace('sheets/', '');

    return {
      id: v.id,
      name: v.name,
      embedUrl,
      path: `${projectName}/${workbookName}/${v.name}`,
      workbookId,
    };
  });
}

async function getSiteId(apiBaseUrl, patName, patSecret, siteName) {
  const { data } = await axios.post(`${apiBaseUrl}/auth/signin`, {
    credentials: {
      personalAccessTokenName: patName,
      personalAccessTokenSecret: patSecret,
      site: {
        contentUrl: siteName,
      },
    },
  });

  return data.credentials.site.id;
}

module.exports = {
  getRequestHeader,
  getProjects,
  getWorkbooks,
  getViews,
  getSiteId,
};
