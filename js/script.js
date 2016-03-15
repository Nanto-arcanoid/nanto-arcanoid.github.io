$(document).ready(function(){

	var widthBox = 500;
	var heightBox = 600;
	var widthBall = 30;
	var heightBall = 30;
	var innerWidth = widthBox - widthBall;
	var innerHeight = heightBox - heightBall;
	var moverX = 0;
	var ballX = moverX + 70;
	var ballY = 40;
	var shiftX = 1;
	var shiftY = 1;
	var mouseCoords = 0;
	var yPos = false;
	var tempPos = moverX;
	
	$("#box").css("width", widthBox).css("height", heightBox);
	$("#ball.startpos").css("width", widthBall).css("height", heightBall).css("left", ballX).css("bottom", ballY);
	$("#mover").css("left", moverX);


	var box = $("#box"),
		boxOffset = box.offset(),
		time,
		speed;

	$("body").on("mousemove", box, function(e) {
		mouseCoords = Math.round((e.pageX - boxOffset.left) / 10) * 10;
	});


	animate();

	function move() {
			if (mouseCoords >= (innerWidth - 70)) {mouseCoords = (innerWidth - 70)};
			if (mouseCoords <= -5) {mouseCoords = -5};
			
			var now = new Date().getTime(),
				dt = (now - (time || now));
				dtBall = (now - (time || now));
				time = now,
				newPos = mouseCoords - tempPos;

			if (newPos > 10) {
				tempPos += dt;
				$("#mover").css("left", tempPos);
				$("#ball.startpos").css("left", tempPos + 70);
			} else if (newPos < -10) {
				tempPos -= dt;
				$("#mover").css("left", tempPos);
				$("#ball.startpos").css("left", tempPos + 70);
			} else {
				$("#mover").css("left", tempPos);
				$("#ball.startpos").css("left", tempPos + 70);
			};

				ballX += (shiftX * dtBall);
				ballY += (shiftY * dtBall);
				posMovXStart = tempPos;
				posMovXEnd = tempPos + 100;
				console.log(ballY);

				if(ballX > innerWidth) {
					ballX = innerWidth;
					shiftX = -(shiftX);
				};

				if(ballY > innerHeight) {
					ballY = innerHeight;
					shiftY = -(shiftY);
					yPos = true;
				};

				if(ballX < 0) {
					ballX = 0;
					shiftX = -(shiftX);
				};
				
				if(ballY <= 39) {
					alert("Упс");
					window.location.reload();
				};

				if(ballY <= 41 && ballY > 39 && yPos == true && ballX > posMovXStart && ballX < posMovXEnd) {
					shiftY = -(shiftY);
					yPos = false;
				};

				$("#ball.movepos").css("left", ballX).css("bottom", ballY);


			$("body").on("click", box, function() {
				$("#ball").removeClass("startpos");
				$("#ball").addClass("movepos");
			});

	}

	function animate() {
		requestAnimFrame(animate);
		//move();
		setTimeout(move(), 10);
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




