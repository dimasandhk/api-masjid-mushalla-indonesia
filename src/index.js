const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Routers
const mainEndpoint = require('./routers/main');

// Config Routers
app.use(mainEndpoint);


app.listen(port, () => console.log(`Up on http://localhost:${port}`));