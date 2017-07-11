//game over if ball hits bottom of screen

if (y + dy < balRadius) {
    dy = -dy;
}
elseif(y + dy > canvas.height - balRadius) {
    alert("GAMEOVER");
    document.location.reload();
}
