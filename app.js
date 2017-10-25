var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const five = require('johnny-five');
const board = new five.Board({repl: false})
let servo

const sleep = async (time) => {
  await new Promise((res, rej) => {
    setTimeout(res, time)
  })
}

board.on('ready', function(){
  servo = new five.Servo({pin: 9, range: [0, 180]})
  servo.to(0)
})

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/light',async function(req, res, next){
  const deg = parseInt(req.query.deg)
  res.json({ok: 'ok'})

  servo.to(deg)
  await sleep(900)
  servo.to(0)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3333)

