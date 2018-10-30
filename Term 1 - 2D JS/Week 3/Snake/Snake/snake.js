// JavaScript source code
var canvas = document.getElementById('stage')
var ctx = canvas.getContext('2d');
var scene = {
    width: canvas.width,
    height: canvas.height,
}
const move = {
    UP: 0,
    DOWN: 1,
    LEFT: 3,
    RIGHT: 4
}
var grid = 20;
var snake = {
    x: genInt(),
    y: genInt(),
    dx: 0,
    dy: 1,
    cells: [],
    maxCells: 4,
    direction: move.DOWN
};
var newDirection = move.DOWN;
var apple = {
    x: genInt(),
    y: genInt()
}
var count = 0;



render();

document.addEventListener('keypress', (event) => {
    key = event.key.toLowerCase();
    console.log(snake.direction);
    if (key == "w" && snake.direction != move.DOWN) {
        newDirection = move.UP;
    } else if (key == "s" && snake.direction != move.UP) {
        newDirection = move.DOWN;
    } else if (key == "a" && snake.direction != move.RIGHT) {
        newDirection = move.LEFT;
    } else if (key == "d" && snake.direction != move.LEFT) {
        newDirection = move.RIGHT;
    }
    console.log(newDirection)

});


function render() {
    
    requestAnimationFrame(render)
    if (++count < 4) {
        //console.log(count)
        return
    }
    updateSnake();
    draw();
    checkCollisions();
}

function draw() {
    ctx.clearRect(0, 0, scene.width, scene.height);
    for (var x = 0; x < grid; x++) {
        
        for (var y = 0; y < grid; y++) {
            ctx.fillStyle = 'black';
            if (apple.x == x && apple.y == y) {
                ctx.fillStyle = 'red';
            } else {
                for (var c in snake.cells) {
                    cell = snake.cells[c]
                    if (cell.x == x && cell.y == y) {
                        ctx.fillStyle = genHex();
                        break;
                    }
                }
            }

            ctx.fillRect((scene.width / grid) * x, (scene.height / grid) * y, scene.width / grid , scene.height / grid);
        }
    } 
    count = 0
}

function updateSnake() {

    if (newDirection == move.UP) {
        snake.direction = move.UP;
        snake.dy = -1;
        snake.dx = 0;
    } else if (newDirection == move.DOWN) {
        snake.direction = move.DOWN;
        snake.dy = 1;
        snake.dx = 0;
    } else if (newDirection == move.LEFT) {
        snake.direction = move.LEFT;
        snake.dy = 0;
        snake.dx = -1;
    } else if (newDirection == move.RIGHT) {
        snake.direction = move.RIGHT;
        snake.dy = 0;
        snake.dx = 1;
    }

    snake.x += snake.dx;
    snake.y += snake.dy;
    if (snake.x < 0) {
        snake.x = grid - 1;
    } else if (snake.x > grid-1){
        snake.x = 0
    }
    if (snake.y < 0) {
        snake.y = grid - 1;
    } else if (snake.y > grid-1){
        snake.y = 0
    }
    if (snake.x == apple.x && snake.y == apple.y) {
        snake.maxCells++;
        newApple();
    }
    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    
}

function checkCollisions() {
    for (var x in snake.cells) {
        for (var y in snake.cells) {
            if (x !== y) {
                if (snake.cells[x].x === snake.cells[y].x && snake.cells[x].y === snake.cells[y].y) {
                    console.log(snake.cells[x].x)
                    console.log(snake.cells[x].y)
                    console.log('Against')
                    console.log(snake.cells[y].x)
                    console.log(snake.cells[y].y)
                    alert('You have lost');
                    location.reload(); 
                }
            }
        }
    }
}

function newApple() {
    apple.x = genInt();
    apple.y = genInt();
}

function genHex() {

    var color = '#' + ((0x2222DD << 0 )+ (Math.random() * 0x222222 << 0)).toString(16);
    return color;
}

function genInt() {
    return Math.floor(Math.random() * grid);
}