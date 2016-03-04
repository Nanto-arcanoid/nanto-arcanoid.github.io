$(document).ready(function(){

	var box = $("#box"),
		boxOffset = box.offset(),
		mouseCoords = boxOffset.left,
		time,
		speed;

	$("body").on("mousemove", box, function(e) {
		mouseCoords = Math.round((e.pageX - boxOffset.left) / 10) * 10 - 50;
	});
	
	if (mouseCoords >= 405) {mouseCoords = 405};
	if (mouseCoords <= -5) {mouseCoords = -5};

	animate();

	function move() {
			var now = new Date().getTime(),
				dt = (now - (time || now)) / 4;
				time = now,
				oldPos = parseFloat($("#mover").css("left")),
				tempPos = oldPos,
				newPos = mouseCoords - tempPos;

			if (newPos > 10) {
				tempPos += dt;
				$("#mover").css("left", tempPos);
			} else if (newPos < -10) {
				tempPos -= dt;
				$("#mover").css("left", tempPos);
			} else {
				$("#mover").css("left", tempPos);
			};
	}

	function animate() {
		requestAnimFrame(animate);
		move();
	}

});

window.requestAnimFrame = (function() {
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(callback, element){
				window.setTimeout(callback, 1000 / 60);
			};
})();