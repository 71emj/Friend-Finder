const DEBUG = true;

const FS = require("fs"),
   Path = require("path");

const dataPath = Path.join(__dirname, "../data/friends.js");

class Profile {
   constructor(name, image, scores) {
      this.name = name;
      this.image = image;
      this.score = scores; // array
   }
}

Array.prototype.lastItem = function() {
   return this[this.length - 1];
}

function readProfileData() {
   const log = JSON.parse(FS.readFileSync(dataPath)),
      profileArr = new Array();

   log.forEach((elem) => {
      profileArr.push(elem);
   });

   return profileArr;
}

function writeProfileData(user, arr) {
   // use array.filter instead
   if (!(arr.lastItem()["name"] === user.name)) {
      arr.push(user);
   }
   console.log(arr);
   console.log(JSON.stringify(arr));
   FS.writeFileSync(dataPath, JSON.stringify(arr));
}

function findMatch(user, myscore, arr) {
   let closestIndex, curClosest = 99;

   if (!arr[0]) { return user; }

   arr.forEach((elem, index) => {
      if (elem.name === user.name) { return; } // fool proof multiple submit

      const curDifference = Math.abs(
         myscore - elem.score.reduce((sum, cur) => {
            return sum + cur;
         })
      );

      DEBUG && console.log(curDifference);
      curDifference < curClosest && (closestIndex = index) && (curClosest = curDifference);
   });

   return arr[closestIndex];
}

function dataHandler(data) {
   const user = new Profile(data.name, data.photo, data.scores.map((x) => { return parseInt(x); }));
   const userScore = user.score.reduce((sum, cur) => {
      return sum + cur;
   });

   const profileArr = readProfileData();
   const matchedProfile = findMatch(user, userScore, profileArr); // datatype: object
   console.log(profileArr);
   writeProfileData(user, profileArr);
   return matchedProfile;
}


module.exports = dataHandler;