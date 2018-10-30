function drawMap(){
    var mapString = "";
    var character = "";

    console.clear();    

    //Use console.clear() to refresh the console
    
    for(row in map){
        for(col in map[row]){
            
            if (row == player.row && col == player.col) {
                mapString += '@'
                if (map[row][col] === '*') {
                    gameWin();
                }
            } else {
                mapString += map[row][col];
            }
            
            
        }
        mapString += '\n';
    }

    //Loop through all rows in the array
        //Loop through all columns in the array
            //Read the character in the array
            //If the character is '@', representing the player, 
                //Set player.row and player.col
            //Append the character to map string
        //Append new line "\n" to map string
    
    console.log(mapString); //Draws the map
}

/**Switch statement that goes through the 4 arrow key keycodes, runs the specific move functino*/
document.onkeydown = function (keyPress) {

    console.log(keyPress.keyCode)
    //keyPress.keyCode
    switch (keyPress.keyCode) {
        case 37:
            moveLeft();
            break;
        case 38:
            moveUp();
            break;
        case 39:
            moveRight();
            break;
        case 40:
            moveDown();
            break;
    }
}

function moveLeft() {
    if (map[player.row][player.col - 1] !== '#') {
        player.col--
        drawMap();
    } else {
        console.log("invalid move")
    }    
}

function moveRight(){
    if (map[player.row][player.col + 1] !== '#') {
        player.col++;
        drawMap();
    } else {
        console.log("invalid move")
    }    
}

function moveUp(){
    if (map[player.row - 1][player.col] !== '#') {
        player.row--;
        drawMap();
    } else {
        console.log("invalid move")
    }
}

function moveDown(){
    if (map[player.row + 1][player.col] !== '#') {
        player.row++;
        drawMap();
    } else {
        console.log("invalid move")
    }
}

function gameWin(){
    console.log("You are a winner!!");
    gameActive = false;
}

var map = [
    ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'], //row 1
    ['#','.','#','#','#','.','.','.','.','.','.','#','.','.','.','#','.','.','.','#'], //row 2
    ['#','.','#','.','.','.','#','#','#','#','.','.','.','#','.','#','.','#','.','#'], //row 3
    ['#','.','#','.','#','#','#','#','#','#','#','#','#','#','.','#','.','#','.','#'], //row 4
    ['#','.','#','.','#','.','.','.','.','.','#','.','.','.','.','#','*','#','.','#'], //row 5
    ['#','.','#','.','.','#','#','#','#','.','#','.','#','#','#','#','#','.','.','#'], //row 6
    ['#','.','#','#','.','.','#','#','.','.','#','.','.','.','.','.','#','.','#','#'], //row 7
    ['#','.','#','#','#','.','#','.','.','#','.','#','#','#','#','.','.','.','#','#'], //row 8
    ['#','.','.','.','.','.','.','#','.','#','.','#','#','.','#','#','#','#','.','#'], //row 9
    ['#','.','#','#','#','#','.','.','.','#','.','.','.','.','.','#','#','#','.','#'], //row 10
    ['#','.','#','#','#','#','#','#','.','#','#','#','#','#','.','#','#','#','.','#'], //row 11
    ['#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'], //row 12
    ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'], //row 13
]

var player = {row: 1, col: 1};
var gameActive = true;

drawMap();