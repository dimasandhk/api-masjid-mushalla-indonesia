const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

// Routers
const mainEndpoint = require('./routers/main');
const masjidEndpoint = require('./routers/masjid');
const mushallaEndpoint = require('./routers/mushalla');

// Config Routers
app.use(mainEndpoint);
app.use(masjidEndpoint);
app.use(mushallaEndpoint);

router.get('*', (req, res) => {
  res.status(404).send({
    error: 'Route not found',
    available: {
      masjidApi: '/api/masjid/:provinsi?page=1',
      mushallaApi: '/api/mushalla/:provinsi?page=1'
    }
  });
});

app.use(router);
app.listen(port, () => console.log(`Up on http://localhost:${port}`));