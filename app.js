const { default: mongoose } = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
var cons = require('consolidate');
require('dotenv').config();
require("./models/photo");

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Database connection
const db_url = process.env.DATABASE_URL
mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  });

  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(require("./router/my_router"));

// Listening at port:5000
app.listen(PORT, () => {
  console.log("connected to port:", PORT);
});

