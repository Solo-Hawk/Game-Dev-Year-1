// JavaScript source code
var stage = document.getElementById("stage");
var canvasHeight = stage.height;
var canvasWidth = stage.width;

var ctx = stage.getContext('2d');

var balls = []

var total = 100;

var spring = 0.1;
var drag = 0.6;
var gravity = 0.9;
var dampening = 0.9;


console.log("Working")

generate();
render();

function render() {

    simCollision();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < total; i++) {
        update(balls[i]);
        ctx.beginPath();
        ctx.fillStyle = balls[i].color
        ctx.arc(balls[i].x, balls[i].y, balls[i].size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        
    }
    requestAnimationFrame(render)
}

function simCollision() {
    for (var i = 0; i < total; i++) {
        var ball = balls[i]
        for (var j = i+1; j < total; j++) {
            if (i != j) {
                var mindist = ball.size + balls[j].size;
                distx = ball.x - balls[j].x;
                disty = ball.y - balls[j].y;
                var dist = Math.sqrt(distx * distx + disty * disty)
                if (dist && dist < mindist) {
                    console.log("Collision")
                    var ballA = ball;
                    var ballB = balls[j];

                    var tx = ballA.x + (ballB.x - ballA.x) / dist * mindist;
                    var ty = ballA.y + (ballB.y - ballA.y) / dist * mindist;
                    var ax = (tx - ballA.x);
                    var ay = (ty - ballA.y);
                    ballA.x -= ax;
                    ballA.y -= ay;
                    ballB.x += ax;
                    ballB.y += ay;
                    ballA.vx -= (ax * spring);
                    ballA.vy -= (ax * spring);
                    ballB.vx -= (ax * spring);
                    ballB.vy -= (ax * spring);
                    


                    /*
                    var angle = getAngle(ball, balls[j])

                    var length1 = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy) < (dist - mindist) ? dist - mindist : Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
                    var length2 = Math.sqrt(balls[j].vx * balls[j].vx + balls[j].vy * balls[j].vy) < (dist - mindist) ? dist - mindist : Math.sqrt(balls[j].vx * balls[j].vx + balls[j].vy * balls[j].vy);

                    var vector1 = genVector(ball.vx, ball.vy, angle, length1)
                    var vector2 = genVector(balls[j].vx, balls[j].vy, angle + 180, length2)
                    

                    ball.vx = vector1[0];
                    ball.vy = vector1[1];
                    ball.x += ball.vx;
                    ball.y += ball.vy
                    vector2[0] *= -1;
                    vector2[1] *= -1;
                    balls[j].vx = vector2[0];
                    balls[j].vy = vector2[1];
                    balls[j].x += balls[j].vx;
                    balls[j].y += balls[j].vy

                    console.log("Sending ball1 " + angle)
                    console.log("Sending ball2 " + (angle + 180))
                    console.log("Ball1 Vector" + vector1)
                    console.log("Ball2 Vector" + vector2)

                    */
                    
                    break;

                }

            }
        }
    }
}

function update(ball) {
    //console.log(currentx + "  " + currenty + "VS" + newx + " " + newy)

    if (ball.x + ball.size > canvasWidth) {
        ball.x = canvasWidth - ball.size;
        ball.vx *= -1 * drag;
    } else if (ball.x - ball.size < 0) {
        ball.x = 0 + ball.size;
        ball.vx *= -1 * drag;
    }
    if (ball.y + ball.size > canvasHeight) {
        ball.y = canvasHeight - ball.size;
        ball.vy *= -1 * drag;
    } else if (ball.y - ball.size < 0) {
        ball.y = 0 + ball.size;
        ball.vy *= -1 * drag;
    }
  

    ball.x += ball.vx * drag;
    ball.y += ball.vy * drag * gravity;
    
    
    

}

//function genVector(x, y, angle, length) {
//    console.log(x)
//    console.log(y)
//    length *= 0.01
//    angle = angle * Math.PI / 180;
//    return [length * Math.cos(angle) + x, length * Math.sin(angle) + y]
//}

//function getAngle(ball1, ball2) {
//    var x1 = ball1.x;
//    var y1 = ball1.y;
//    var x2 = ball2.x;
//    var y2 = ball2.y;
//    var ax = x2 - x1;
//    var ay = y2 - y1;
//    return Math.atan2(ay, ax) * 180 / Math.PI;
//}


function generate() {
    for (var i = 0; i < total; i++) {
        var ball = {}
        ball.color = genHex();
        ball.x = Math.random() * stage.width;
        ball.y = Math.random() * stage.height;
        ball.size = Math.floor(Math.random() * 35)
        ball.vx = 3 - (Math.random() * 6);
        ball.vy = 3 - (Math.random() * 6);
        balls.push(ball)
    }
    console.log(balls);
}

function genHex() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);


}