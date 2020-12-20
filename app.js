const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const utils = require('./utilities/utils');
const bm25 = require('./utilities/bm25');

utils.serverStartUp();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

const routes = require('./routes/routes');

app.use(routes);

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

app.listen(process.env.PORT||3000);