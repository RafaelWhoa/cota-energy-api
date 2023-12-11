const express = require('express');
const {listen} = require("express/lib/application");

const app = express();

const PORT = 8080;

app.use(express.json());

app.listen(PORT || process.env.PORT, () => console.log(`Server is running at http://localhost:${PORT}/`));