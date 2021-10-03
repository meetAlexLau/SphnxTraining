let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let dbConfig = require('./database/db');

// Express Route
const objectRoute = require('./routes/routes')

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)

const allowedOrigins = ['http://localhost:3000'];

let options = cors.CorsOptions = {
  origin: allowedOrigins
};

const app = express();

app.use(cors());
app.use(cors(options));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/objects', objectRoute)


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports= app;