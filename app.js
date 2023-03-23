
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/api/auth');
const dynamicRouter = require("./routes/api/dynamics");
const transactionRouter = require('./routes/api/expenses');
dotenv.config();

const { swaggerUi, swaggerDocument } = require('./services/swagger/swagger');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
require('./config/config-passport'); // ????
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRouter);
app.use('/api/user', transactionRouter);
app.use("/dynamic", dynamicRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });

});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
