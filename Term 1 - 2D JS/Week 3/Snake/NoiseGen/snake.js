// JavaScript source code
var canvas = document.getElementById('stage')
var ctx = canvas.getContext('2d');
var scene = {
    width: canvas.width,
    height: canvas.height,
}
var grid = 40;
var snake = {
    x: grid * 2,
    y: grid * 2,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};
var apple = {
    x: grid * 4,
    y: grid * 4
}

draw();

function draw() {
    ctx.clearRect(0, 0, scene.width, scene.height);

    for (var x = 0; x < grid; x++) {

        for (var y = 0; y < grid; y++) {
            ctx.fillStyle = genHex();
            ctx.fillRect((scene.width / grid) * x, (scene.height / grid) * y, scene.width / grid, scene.height / grid);
        }
    }
    requestAnimationFrame(draw)
}

function genHex() {
    document.getElementById("stage").style.WebkitFilter = "grayscale(100%)"
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(10);
    

}

