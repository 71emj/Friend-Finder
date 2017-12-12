module.exports = function(app) {
   const DEBUG = false;

   const Path = require("path");
   // Express = require("express"),
   // const app = Express();
   const dataPath = Path.join(__dirname, "../public/");

   function displayPages(app, route, res) {
      if (route === "survey") {
         return res.sendFile(dataPath + "survey.html");
      }
      return res.sendFile(dataPath + "home.html");

   }
   
   app.get("/:pathname?", (req, res) => {
      displayPages(app, req.params.pathname, res);
   });

   app.get("/assets/images/:image", (req, res) => {
      // this needs to set to root for consistent display
      DEBUG && console.log(Path.join(__dirname, "../public/assets/images", req.params.image));
      DEBUG && console.log(dataPath + "assets/images/" + req.params.image);
      res.sendFile(Path.join(__dirname, "../public/assets/images", req.params.image));
   });

   console.log(dataPath);
}