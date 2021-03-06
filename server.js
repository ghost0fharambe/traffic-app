// *** Dependencies
// =============================================================
var express = require("express");
var exphbs = require("express-handlebars");;

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/report-api-routes.js")(app);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize
  .sync({
    force: true
  })
  .then(function() {
    app.listen(PORT, function() {
      console.log("App listening on http://localhost:" + PORT);
    });
  });
