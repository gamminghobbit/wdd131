const pi = 3.14;
let radius = 3;
let area = 0;
area = radius * radius * pi;
radius = 4;
area = radius * radius * pi;

console.log("Radius:", radius);
console.log("Area:", area);


function circleArea(radius) {
  const PI = 3.14;
  return radius * radius * PI;
}

let area2 = circleArea(3);
console.log("Area when radius is 3:", area2);

area2 = circleArea(4);
console.log("Area when radius is 4:", area2);
