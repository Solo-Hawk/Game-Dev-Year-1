// JavaScript source code
const spacer = '---------------------------------------------------'
var x;
do {
    x = Math.floor(Math.random() * 100);
    console.log(x);
} while (x != 50);

console.log(spacer);

while (x > 20) {
    x--;
    console.log(x)
}

console.log(spacer);

for (var y = 0; y < 400; y = y + 2) {
    x += y;
    console.log(x)
}


var ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']

var suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']

for (var suit in suits) {
    for (var rank in ranks) {
        console.log(ranks[rank] + ' of ' + suits[suit]);
    }
}
