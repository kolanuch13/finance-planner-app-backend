const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/api/auth');
const dynamicRouter = require('./routes/api/dynamics');
const statisticRouter = require('./routes/api/statistics');
const transactionRouter = require('./routes/api/expenses');
const personalRouter = require('./routes/api/personal');
dotenv.config();

const { swaggerUi, swaggerDocument } = require('./services/swagger/swagger');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.session());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRouter);
app.use('/api/statistic', statisticRouter);
app.use('/api', transactionRouter);
app.use('/api/dynamic', dynamicRouter);
app.use('/api/personal', personalRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
