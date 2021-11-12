const createError = require('http-errors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const morganMiddleware = require('./config/morganMiddleware');
const cors = require('cors');
const indexRouter = require('./routes/index');
const imagesRoute = require('./routes/images');
const db = require('./models');
const app = express();
app.use(cors());

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// index Router
app.use('/api', indexRouter);
app.use('/images', imagesRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  const error = err.message;
  const stack = req.app.get('env') === 'development' ? err : {};

  // send error
  res.status(err.status || 500).json({ error, stack });
});
const setup = async () => {
  await db.sequelize.authenticate();
};

module.exports = { app, setup };
