const DEBUG = true;

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

module.exports = function(app) {
   app.get("/:pathname?", (req, res) => {
      displayPages(app, req.params.pathname, res);
   });


   app.get("/assets/images/:image", (req, res) => {
   	console.log("I got the request");
   	res.sendFile(dataPath + "assets/images/" + req.params.image);
   });

   console.log(dataPath);
}

