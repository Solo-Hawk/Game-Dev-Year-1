// JavaScript source code
console.log("Script Loaded")
var canvas = document.getElementById('stage')
var stageWidth = canvas.width;
var stageHeight = canvas.height;
var context = canvas.getContext('2d');
var total = 150;
var balls = [];

console.log(genHex())
generate();
draw();
render();
function render() {
    for (var i = 0; i < total; i++) {
            update(balls[i])
    }
    draw();
    requestAnimationFrame(render)
}

function update(ball) {
    ball.x += ball.vx;
    ball.y += ball.vy;
    if ((ball.x + ball.size) > stageWidth) {
        ball.x = stageWidth - ball.size;
        ball.vx = -ball.vx
    } else if((ball.x - ball.size) < 0){
        ball.x = 0 + ball.size;
        ball.vx = -ball.vx
    }
    if ((ball.y + ball.size) > stageHeight) {
        ball.y = stageHeight - ball.size;
        ball.vy = -ball.vy
    } else if ((ball.y - ball.size) < 0) {
        ball.y = 0 + ball.size;
        ball.vy = -ball.vy
    }
}

function draw() {
    //context.clearRect(0, 0, stageWidth, stageHeight);
    for (var i = 0; i < total; i++) {
        context.fillStyle = balls[i].colour;
        context.beginPath();
        context.arc(balls[i].x, balls[i].y, balls[i].size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        update(balls[i]);
    }
    

}

function generate() {
    var ball;
    for (var i = 0; i < total; i++) {
        ball = {};
        ball.colour = genHex();
        ball.vx = Math.random() * 20 - 10;
        ball.vy = Math.random() * 20 - 10;
        ball.size = 35;
        ball.x = Math.random() * stageWidth;
        ball.y = Math.random() * stageHeight;
        balls.push(ball);
        
    }
    console.log('balls length = ' + balls.length)
}

function genHex() {
    var str = "0123456789ABCDEF";
    var res = "#";
    for (var i = 0; i < 6; i++) {
        res += str.charAt(Math.floor(Math.random() * 16));
    }
    return res;
}