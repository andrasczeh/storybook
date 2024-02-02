const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('node:path');
const { logger } = require('@storybook/node-logger');

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => res.send('Hello World!'));

app.get(/storybook_preview\/(.*)/, (req, res) => {
  res.render(req.params[0], req.query);
});

app.listen(port, () => logger.info(`Server listening on port ${port}!`));
