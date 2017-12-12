module.exports = function(app) {
   const FS = require("fs"),
      Path = require("path"),
      BodyParser = require("body-parser");

   app.use(BodyParser.urlencoded({ extended: false }));
   app.use(BodyParser.json());

   function apiData(res) {
      const data = JSON.parse(FS.readFileSync(Path.join(__dirname, "../data/friends.js")));
      res.json(data);
   }

   app.post("/api/friends", (req, res) => {
      // DEBUG && console.log(req.body);
      const serverCore = require("./server_core.js"),
         userData = req.body;

      const macthedProfile = serverCore(userData);
      res.json(macthedProfile);
   });

   app.get("/api/friends", (req, res) => {
      apiData(res);
   });

}