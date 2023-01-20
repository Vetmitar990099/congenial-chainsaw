const express = require('express');
const app = express();
const users = require('./data');
const routes = require('./routes')(users);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});