const Event = require("events"),
   FS = require("fs");

const emitter = new Event();

FS.readFile(__dirname + "/log.txt", "utf8", (err) => {
   if (err) {
      emitter.emit("uncaughtException", err.message);
   }
   
   emitter.emit("event", firstFunc());
   emitter.emit("event", "Goodnight");
});

emitter.on("uncaughtException", function (err) {
   console.log(err);
   console.log(this);
   console.log("It's alright, I caught it.");
});

emitter.on("event", (msg) => {
   console.log("%s World", msg);
});

function firstFunc() {
   console.log("Hello");
   return "Hello";
}