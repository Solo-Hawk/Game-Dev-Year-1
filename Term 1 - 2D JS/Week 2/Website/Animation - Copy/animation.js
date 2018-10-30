// JavaScript source code
console.log("Script Loaded")
var canvas = document.getElementById('stage')
var stageWidth = canvas.width;
var stageHeight = canvas.height;
var context = canvas.getContext('2d');
var total = 50;
var balls = [];
var drag = .99;
var gravity = 0.6;
var mouseX, mouseY;
var currentDrag = null;
document.addEventListener('mousemove', getMouseXY)
document.addEventListener('mouseup',onMouseUp)
document.addEventListener('mousedown',onMouseDown)

console.log(genHex())
generate(total);
draw();
render();

function onMouseDown() {
    console.log("Mouse Down")
    var dx, dy, dist;
    for (var i = 0; i < total; i++) {
        
        dx = mouseX - balls[i].x;
        dy = mouseY - balls[i].y;
        console.log(dx)
        console.log(dy)
        dist = Math.sqrt((dx * dx) + (dy * dy));
        console.log(dist);
        console.log(dist + " < " + balls[i].size)
        console.log(dist < balls[i].size / 2);
        if (dist < balls[i].size / 2) {
            currentDrag = balls[i];
            currentDrag.dragging = true;
            console.log("Drag Found " + balls[i])
            break;
        }
    }

}
function onMouseUp() {
    if (currentDrag != null) {
        currentDrag = null;
        currentDrag.dragging = false;
    }
}
function getMouseXY(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
    if (mouseX < 0) {
        mouseX = 0;
    }
    if (mouseY < 0) {
        mouseY = 0;
    }
    console.log("mouse x = " + mouseX + " mouse y = " + mouseY);
}

function render() {
    for (var i = 0; i < balls.length; i++) {
            update(balls[i])
    }
    draw();
    requestAnimationFrame(render)
}

function update(ball) {
    if (ball == currentDrag) {
        ball.x = mouseX;
        ball.y = mouseY;
    } else {
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vx *= drag;
        ball.vy *= drag;
        if ((ball.x + ball.size) > stageWidth) {
            ball.x = stageWidth - ball.size;
            ball.vx = -ball.vx;
        } else if ((ball.x - ball.size) < 0) {
            ball.x = 0 + ball.size;
            ball.vx = -ball.vx;
        }
        if ((ball.y + ball.size) > stageHeight) {
            ball.y = stageHeight - ball.size;
            ball.vy = -ball.vy;
        } else if ((ball.y - ball.size) < 0) {
            ball.y = 0 + ball.size;
            ball.vy = -ball.vy;
        }
        ball.vy = ball.vy * drag + gravity;
    }
    for (var i = 0; i < total; i++) {
        if (balls[i] == ball) {
            break
        }
        var minDist = ball.size + balls[i].size;
        var lx = ball.x - balls[i].x;
        var ly = ball.y - balls[i].y;
        if (lx < 0) {
            lx *= -1;
        }
        if (ly < 0) {
            ly *= -1;
        }
        var dist = Math.sqrt(lx * lx + ly * ly);
        if (dist < minDist) {
            var muffle = 0.4;
            var mx = ((ball.x - balls[i].x) / 2) * muffle;
            var my = ((ball.y - balls[i].y) / 2) * muffle;
            ball.x += mx;
            ball.y += my;
            balls[i].x += -mx;
            balls[i].y += -my;
        }

    }
}

function draw() {
    context.clearRect(0, 0, stageWidth, stageHeight);
    for (var i = 0; i < balls.length; i++) {
        context.fillStyle = balls[i].colour;
        context.beginPath();
        context.arc(balls[i].x, balls[i].y, balls[i].size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        update(balls[i]);
    }
    

}

function generate(amnt) {
    var ball;
    for (var i = 0; i < amnt; i++) {
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