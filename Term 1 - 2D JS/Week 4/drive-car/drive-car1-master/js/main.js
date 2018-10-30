// JavaScript source code
var htmlSpeed = document.getElementById('speed');
var htmlAccel = document.getElementById('accel');
var htmlAngle = document.getElementById('angle');
var htmlDelta = document.getElementById('delta');
var htmlMod = document.getElementById('mod');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var car;
var laststamp;


car = genCar();

car.image.addEventListener('load', loadHandler, false);

function loadHandler() {
    window.addEventListener('keydown', keypresshandler, false);
    window.addEventListener('keyup', keyUphandler, false);

    requestAnimationFrame(update);
}

function keyUphandler(e) {

    if (e.key == 'w' || e.key == 's') {
        car.mod = 0;
        car.accel = 0;
    }
    if (e.key == 'a' || e.key == 'd') {
        car.rotate = 0;
    }
    if (e.key == 'Shift') {
        car.setBoost(false)
    }
}

function keypresshandler(e) {

    switch (e.key) {

        case 'a':
            car.rotate = -10;
            break;
        case 'd':
            car.rotate = 10;
            break;
        case 'w':
            car.mod = 1;
            break;
        case 's':
            car.mod = -1;
            break;
        case 'r':
            car = genCar();
            break;
        case 'Shift':
            car.setBoost(true)
    }
}

function update(timestamp) {
    var delta = (timestamp - laststamp) / 100;
    laststamp = timestamp;
    delta = Math.round(delta * 100000) / 100000
    updateText(delta);
    updateCar(delta);
    
    checkCollisions();
    
    draw();
    

    requestAnimationFrame(update);

}

function checkCollisions() {
    points = car.getCorners();
    for (var p in points) {
        point = points[p];
        if (point.x > canvas.width) {
            car.x -= point.x - canvas.width;
            car.speed = car.speed * -0.5;
            car.accel -= car.accel * 0.8;
        } else if (point.x < 0) {
            car.x -= point.x;
            car.speed = car.speed * -0.5;
            car.accel -= car.accel * 0.8;
        }
        if (point.y > canvas.height) {
            car.y -= point.y - canvas.height;
            car.speed = car.speed * -0.5;
            car.accel -= car.accel * 0.8;
        } else if (point.y < 0) {
            car.y -= point.y;
            car.speed = car.speed * -0.5;
            car.accel -= car.accel * 0.8;
        }
    }

}

function getCornerPoint(xDiff, yDiff, rad) {
    var rx = (xDiff * Math.cos(rad)) - (yDiff * Math.sin(rad));
    var ry = (xDiff * Math.sin(rad)) - (yDiff * Math.cos(rad));
    return {x:car.x + rx, y:car.y + ry}
}

function drawDebug() {
    if (car.x < canvas.width / 2) {
        if (car.y < canvas.height / 2) {
            ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2)
        } else {
            ctx.fillRect(0, canvas.height / 2, canvas.width / 2, canvas.height / 2)
        }
    } else {
        if (car.y < canvas.height / 2) {
            ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height / 2)
        } else {
            ctx.fillRect(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2)
        }

    }
}

function updateCar(delta) {

    if (car.mod != 0) {

        if (car.speed > car.maxSpeed) {
            car.speed = car.maxSpeed;
        } else if (car.speed < -car.maxSpeed) {
            car.speed = -car.maxSpeed;
        }

        if (car.accel > car.maxAcceleration) {
            car.accel = car.maxAcceleration;
        } else if (car.accel < -car.maxAcceleration) {
            car.accel = -car.maxAcceleration;
        }
        car.accel += car.acceleration * car.mod * delta;
        car.speed += car.accel * delta;    
        
    } else {
        if (car.accel > 0) {
            car.accel -= car.acceleration
        } if (car.accel < 0) {
            car.accel += car.acceleration
        }

        car.speed *= 0.95;
        if (car.speed < 0.1) {
            car.speed = 0;
        }
    }

    car.angle += car.rotate * (car.speed / car.maxSpeed);
    car.x += (car.speed * delta) * Math.cos(Math.PI / 180 * car.angle);
    car.y += (car.speed * delta) * Math.sin(Math.PI / 180 * car.angle);
    
}

function updateText(delta) {
    htmlSpeed.innerHTML = "Speed  : " + car.speed;
    htmlAccel.innerHTML = "Accel  : " + car.accel;
    htmlAngle.innerHTML = "Angle  : " + car.angle;
    htmlDelta.innerHTML = "Delta  : " + delta;
    htmlMod.innerHTML   = "Mod    : " + car.mod;
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle= "blue"
    drawDebug();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);


    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    
    
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(Math.PI / 180 * car.angle);
    ctx.drawImage(car.image, - (car.image.width / 2), - (car.image.height / 2));
    ctx.restore();
    
}

function genCar() {
    var c = {
        image: new Image(),
        x: canvas.width / 2,
        y: canvas.height / 2,
        angle: 10,
        rotate: 0,
        mod: 0,
        speed: 0,
        maxSpeed: 50,
        boost: false,
        boostApplied: false,
        accel: 0,
        acceleration: 1,
        maxAcceleration: 10,
        getCorners: function () {
            var rads = Math.PI / 180 * car.angle;
            var FL = getCornerPoint(this.image.width / 2, this.image.height / 2, rads);
            var BL = getCornerPoint(-this.image.width / 2, this.image.height / 2, rads);
            var FR = getCornerPoint(-this.image.width / 2, -this.image.height / 2, rads);
            var BR = getCornerPoint(this.image.width / 2, -this.image.height / 2, rads);
            return [FL, FR, BL, BR];
        },
        setBoost: function (active) {
            if (active == true && this.boost == false) {
                this.maxSpeed *= 2;
                this.acceleration *= 2.5;
                this.maxAcceleration *= 2;
                this.boost = true;
            } else if (active == false && this.boost == true) {
                this.maxSpeed /= 2;
                this.acceleration /= 2.5;
                this.maxAcceleration /= 2;
                this.boost = false;
            }
        }
    }
    c.image.src = "images/car.png";

    return c;
}