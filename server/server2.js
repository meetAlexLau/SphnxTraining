let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let dbConfig = require('./database/db');
let graphqlHTTP = require('express-graphql')

mongoose.connect("mongodb+srv://Alex:<Password1->@cluster0.x2pii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{promiseLibrary: require('axios'), useNewUrlParser: true})
.catch((err) => console.log(err));

var objectRoutes = require('./routes/routes');

var app = require('express');
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/graphql', cors(), graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
}))

app.listen(4000, () => console.log("Server on 4000"))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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
  
  module.exports = app;