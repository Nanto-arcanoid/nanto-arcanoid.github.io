$(document).ready(function(){

	var widthBox = 500;
	var heightBox = 600;
	var widthBall = 30;
	var heightBall = 30;
	var innerWidth = widthBox - widthBall;
	var innerHeight = heightBox - heightBall;
	var posX = 70;
	var posY = 40;
	var shiftX = 1;
	var shiftY = 1;
	var mouseCoords = 0;
	var yPos = false;
	$("#box").css("width", widthBox).css("height", heightBox);
	$("#ball.startpos").css("width", widthBall).css("height", heightBall).css("left", posX).css("bottom", posY);


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
				dtBall = (now - (time || now)) / 2;
				time = now,
				oldPos = parseFloat($("#mover").css("left")),
				tempPos = oldPos,
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

				posX = parseInt($("#ball").css("left"));
				posY = parseInt($("#ball").css("bottom"));
				posMovXStart = parseFloat($("#mover").css("left"));
				posMovXEnd = parseFloat($("#mover").css("left")) + 100;

				if(posX > innerWidth) {
					posX = innerWidth;
					shiftX = -(shiftX);
				};

				if(posY > innerHeight) {
					posY = innerHeight;
					shiftY = -(shiftY);
					yPos = true;
				};

				if(posX < 0) {
					posX = 0;
					shiftX = -(shiftX);
				};
				
				if(posY < -30) {
					alert("Упс");
					window.location.reload();
				};

				if(posY <= 41 && yPos == true && posX > posMovXStart && posX < posMovXEnd) {
					shiftY = -(shiftY);
					yPos = false;
				};

				posX += (shiftX * dtBall);
				posY += (shiftY * dtBall);

				$("#ball.movepos").css("left", posX).css("bottom", posY);


			$("body").on("click", box, function() {
				$("#ball").removeClass("startpos");
				$("#ball").addClass("movepos");
			});

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




