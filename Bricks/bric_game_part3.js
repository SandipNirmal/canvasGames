//colission detection

if( x + dx > canvas.width - ballRadius || x + dx < ballRadius){
	 dx = -dx;
}

if( y + dy > canvas.height - ballRadius|| y + dy < balRadius){
	dy = -dy;
}