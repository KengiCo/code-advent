const readFile = require("fs").readFileSync;

const numbers = readFile(__dirname + "/input5.txt", "utf-8");
let firstFormatter = numbers.split("\n").map((x) => x.split(" -> "));

let form = [];

// a for loop to populate the form array in a iterable manner
for (let i = 0; i < firstFormatter.length; i++) {
  form.push(firstFormatter[i].join(",").split(","));
}
// so now i have an array of arrays
// form[0] = [ '223', '805', '223', '548' ]

//function that returns true if the difference
//among both x and both y is equal in absolute(so it ignores + or - sign)
let isDiagonal = (x0, x1, x2, x3) => {
  if (Math.abs(x0 - x2) == Math.abs(x1 - x3)) {
    return true;
  }
};

// diag contains only those lines that are 45deg diagonals
let diag = form.filter((line) =>
  isDiagonal(line[0], line[1], line[2], line[3])
);

// filt contains only those lines that are horizontal or vertical
let filt = form.filter((x) => x[0] == x[2] || x[1] == x[3]);

// populate a 1000x1000 matrix with all zeroes
let arr = Array(1000)
  .fill(0)
  .map(() => Array(1000).fill(0));

// this function was created to pass in a sort method so that
// the dot(x,y) with the lowest x value was first
function mycomparator(a, b) {
  return a.x - b.x;
}

// diagArray is populated with lines that have their dot
// sorted by the lowest x value
let traceDiag = (diag) => {
  let diagArray = [];
  for (let i = 0; i < diag.length; i++) {
    const line = diag[i];
    diagArray.push(
      [
        {
          x: +line[0],
          y: +line[1],
        },
        {
          x: +line[2],
          y: +line[3],
        },
      ].sort(mycomparator)
    );
  }
  for (let j = 0; j < diagArray.length; j++) {
    const line = diagArray[j];
    let y = line[0].y;
    //if this line has the first dot with both x and y value lower
    //than the second dot,
    //it means that the diagonal next dot is formed by adding 1 at x and y
    if (line[0].x < line[1].x && line[0].y < line[1].y) {
      for (let k = line[0].x; k <= line[1].x; k++) {
        arr[y][k]++;
        y++;
      }
    } else {
      // if y of the first dot is higher than the y of the second dot
      // the next dot will have a x raised by 1, but an y decreased by 1
      for (let z = line[0].x; z <= line[1].x; z++) {
        arr[y][z]++;
        y--;
      }
    }
  }
};

traceDiag(diag);

//this is for the horizontal lines
for (let i = 0; i < filt.length; i++) {
  const line = filt[i];
  // if both x have the same value the line is vertical
  if (line[0] == line[2]) {
    let temp = [line[1], line[3]];
    temp.sort((a, b) => a - b);
    for (let j = +temp[0]; j <= +temp[1]; j++) {
      arr[j][line[0]]++;
    }
  }
  //if both y of the given dots are equal than the line is horizontal
  else if (line[1] == line[3]) {
    let temp1 = [line[0], line[2]];
    temp1.sort((a, b) => a - b);
    let start = +temp1[0];
    let end = +temp1[1];
    for (let z = start; z <= end; z++) {
      arr[line[1]][z]++;
    }
  }
}

// console.log(arr)

counter = 0;

//loop through every value of the matrix and count whatever is
//higher than 1
for (let i of arr) {
  for (let j of i) {
    if (j > 1) counter++;
  }
}

console.log(counter);
