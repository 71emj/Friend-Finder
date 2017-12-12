const DEBUG = true;

const Express = require("express"),
   BodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

const app = Express();

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

app.listen(PORT, function() {
	console.log("Listening from Port: %s", PORT);
});

require("./app/routing/apiRoute.js")(app);
require("./app/routing/htmlRoute.js")(app);