var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Reports.findAll({
      include: [db.Users]
    }).then(function(dbData) {
      res.render("index", {
        msg: "Welcome!",
        reports: dbData
      });
    });
  });
};
