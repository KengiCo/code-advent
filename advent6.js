const readFile = require("fs").readFileSync;
const numbers = readFile(__dirname + "/advent6.txt", "utf-8").split(",");


// for semplicity of tracking the numbers of fish an object
// will map the amount of fish grouping them
// by how many days left till they hatch.

let obj = {
  9: 0,
  8: 0,
  7: 0,
  6: 0,
  5: 0,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
  0: 0,
};

// populate the starting object with the input
numbers.forEach((num) => obj[num]++);

let oneDay = (obj, days) => {
    finalCount = 0;
  // when all days have passed count all the values in obj to get
  // the total number of lantern fish
  if (days == 0) {
    for (key in obj) {
      finalCount += obj[key];
    }
    return console.log(finalCount);
  }

  for (key in obj) {
    if (key == 0) {
      // 9 is used as a temporary value to store info on how many
      // new fish have hatched that day
      obj[9] = obj[0];
    } else {
      // all the values from a key after a day is passed will be
      // transfered in the key that represent one less day till hatching

      obj[key - 1] = obj[key];
    }
  }
  // fish that have created a new fish will have now 6 days
  // until they generate a new fish.
  // new fish will have 8 days to generate a new fish.
  // this data is stored in obj[9] from previous iteration
  obj[6] += obj[9];
  obj[8] = obj[9];

  // reset temp data and take one from the total amount of day left
  // before starting a new day
  obj[9] = 0;
  days--;
  oneDay(obj, days);
};

oneDay(obj, 80)
oneDay(obj, 256);


// this was the initial solution with an array instead of an object
// let lanternFish = (array, days) => {
//     if (days == 0)
//     {return console.log(array.length)}

//     days--

//     array.forEach( (lantern,index) => {
//         if (lantern == 0){
//         numbers[index] = 6
//         numbers.push(8)
//         } else {
//             numbers[index]--
//         }
//     })
//     lanternFish(array,days)
// }

// lanternFish(numbers, 10)
