const FS = require("fs"),
   Path = require("path");

function apiData(res) {
   const data = JSON.parse(FS.readFileSync(Path.join(__dirname, "friends.js")));
   res.json(data);
}

module.exports = function(app) {
  
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