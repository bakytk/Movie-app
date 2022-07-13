

const PORT = 3000;
const express = require("express");
const app = express();

var router = require('./routes');
app.use('/', router);

app.listen(PORT, async () => {
  console.log(`Server up on port: ${PORT}`);
});

module.exports = app; // for testing
