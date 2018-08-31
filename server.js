const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const chalk = require('chalk');
const moment = require('moment');
const indexRouter = require('./router/index');

// use native promises
mongoose.Promise = global.Promise;

// Load environment variables from .env file
dotenv.load();

// Passport OAuth strategies
require('./config/passport');

const app = express();

mongoose.connect(
  process.env.MONGODB,
  { useMongoClient: true }
);
mongoose.connection.on('error', function() {
  console.log(
    chalk.red(
      'MongoDB Connection Error. Please make sure that MongoDB is running.'
    )
  );
  process.exit(1);
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.moment = moment;
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

// import and show all schema here
require('./models/Comment');
require('./models/User');
require('./models/Post');

// Routers here
app.use(indexRouter);

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log(
    chalk.blue('Express server listening on port ' + app.get('port'))
  );
});

module.exports = app;
