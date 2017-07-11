//Draw Ball and move it

var x = canvas.width/2;
var y = canvas.height-30;

//
var dx = 2;
var dy = -2;

functiondraw(){
//drawingcode
	ctx.beginPath();
	ctx.arc(50,50,10,0,Math.PI*2);
	ctx.filStyle="#0095DD";
	ctx.fil();
	ctx.closePath();
}

setInterval(draw,10);


function drawBal(){
	ctx.beginPath();
	ctx.arc(x,y,10,0,Math.PI*2);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBall();
	x+=dx;
	y+=dy;
}