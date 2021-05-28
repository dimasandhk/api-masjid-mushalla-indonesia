const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Routers
const mainEndpoint = require('./routers/main');
const router = require('./routers/masjid');
const masjidEndpoint = require('./routers/masjid');

// Config Routers
app.use(mainEndpoint);
app.use(masjidEndpoint);

router.get('/api/*', (req, res) => {
  res.status(404).send({
    error: 'API Endpoint not found'
  });
});

router.get('*', (req, res) => {
  res.status(404).send({
    error: 'Route not found'
  });
});

app.listen(port, () => console.log(`Up on http://localhost:${port}`));