const express = require('express');
const chargers_router = require('./routes/chargers.js').chargers;

const app = express();

const PORT = 8080;

app.use(express.json());
app.use("/chargers", chargers_router);

app.listen(PORT || process.env.PORT, () => console.log(`Server is running at http://localhost:${PORT}/`));