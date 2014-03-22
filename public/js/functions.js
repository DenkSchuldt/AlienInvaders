	
	var ctx01, ctx02, ctx03, ctx04;
	var score, destroyed, lives, x, y, dx;
	var gameover, showEnd, moving, left, right, winner; //Booleans
	var shootX, shootY, shooting, gridX, gridY, animationTime, currentAnimation;
	var LAST_LEFT, LAST_RIGHT, LAST_VERTICAL, WIDTH, HEIGHT;
	var col11 = false;
	
	var invaders = [
			[true,0,0,'squid'],[true,0,0,'squid'],[true,0,0,'squid'],[true,0,0,'squid'],[true,0,0,'squid'],
			[true,0,0,'squid'],[true,0,0,'squid'],[true,0,0,'squid'],[true,0,0,'squid'],[true,0,0,'squid'],
			[true,0,0,'squid'],[true,0,0,'crab'],[true,0,0,'crab'],[true,0,0,'crab'],[true,0,0,'crab'],
			[true,0,0,'crab'],[true,0,0,'crab'],[true,0,0,'crab'],[true,0,0,'crab'],[true,0,0,'crab'],
			[true,0,0,'crab'],[true,0,0,'crab'],[true,0,0,'crab'],[true,0,0,'crab'],[true,0,0,'crab'],
			[true,0,0,'crab'],[true,0,0,'crab'],[true,0,0,'crab'],[true,0,0,'crab'],[true,0,0,'crab'],
			[true,0,0,'crab'],[true,0,0,'crab'],[true,0,0,'crab'],[true,0,0,'octopus'],[true,0,0,'octopus'],
			[true,0,0,'octopus'],[true,0,0,'octopus'],[true,0,0,'octopus'],[true,0,0,'octopus'],[true,0,0,'octopus'],
			[true,0,0,'octopus'],[true,0,0,'octopus'],[true,0,0,'octopus'],[true,0,0,'octopus'],[true,0,0,'octopus'],
			[true,0,0,'octopus'],[true,0,0,'octopus'],[true,0,0,'octopus'],[true,0,0,'octopus'],[true,0,0,'octopus'],
			[true,0,0,'octopus'],[true,0,0,'octopus'],[true,0,0,'octopus'],[true,0,0,'octopus'],[true,0,0,'octopus']
		];
	
	function init(){
		dx = 5;
		y = 535;
		x = 437.5;
		score = 0;
		lives = 3;
		gridX = 136;
		gridY = 100;
		WIDTH = 920;
		HEIGHT = 650;
		destroyed = 0;
		LAST_LEFT = 16;
		LAST_RIGHT = 256;
		animationTime = 750;
		left = false;
		right = true;
		showEnd = true;
		moving = false;
		winner = false;
		gameover = false;
		button = document.getElementById('ok');		
		ctx01 = document.querySelector("#space").getContext("2d");					
		ctx02 = document.querySelector("#ship").getContext("2d");
		ctx03 = document.querySelector("#shoot").getContext("2d");
		ctx04 = document.querySelector("#invaders").getContext("2d");
		drawBackground();
		setInterval(drawShip, 20);
		setInterval(drawInvaders, 20);
		currentAnimation = setInterval(animate,animationTime);
		drawOctopus();				
	}	
	
	function animate(){
		var clear = false;
		moving = !moving;
		if(lives != 0){
			if(right) gridX += 8;
			if(left) gridX -= 8;
			if(gridX >= LAST_RIGHT - 60)
				evaluateExtremes();
			if(gridX == LAST_RIGHT || gridX <= LAST_LEFT){
				gridY += 16;
				left = !left;
				right = !right;
			}
			if(gridY == 116){
				animationTime = 500;
				clear = true;
			}		
			if(gridY == 148){
				animationTime = 350;
				clear = true;
			}		
			if(gridY == 180){
				animationTime = 300;
				clear = true;
			}
			if(gridY == 196){
				animationTime = 250;
				clear = true;
			}
			if(gridY == 212){
				animationTime = 200;
				clear = true;
			}
			if(gridY == 228){
				animationTime = 150;
				clear = true;
			}
			if(gridY == 244){
				animationTime = 100;
				clear = true;
			}
			if(gridY == 260){
				animationTime = 50;
				clear = true;
			}
			if(clear){
				clearInterval(currentAnimation);
				currentAnimation = setInterval(animate,animationTime);
			}
			if((LAST_VERTICAL <= 556)&&(LAST_VERTICAL >= 548)){
				lives = 0;
			}
		}		
		recalculate();
	}	
	
	function evaluateExtremes(){
		//Still implementing this..
		if(col11) return false;
		console.log("Init: " + LAST_RIGHT);
		if(invaders[10][0]){
			return LAST_RIGHT;
		}
		if(invaders[21][0]){
			return LAST_RIGHT;
		}
		if(invaders[32][0]){
			return LAST_RIGHT;
		}
		if(invaders[43][0]){
			return LAST_RIGHT;
		}
		if(invaders[54][0]){
			return LAST_RIGHT;
		}
		if(!col11){
			LAST_RIGHT += 60;
			col11 = true;
		}
		console.log("Final: " + LAST_RIGHT);
	}
	
	function recalculate(){		
		var ys = new Array();
		for(var invader=0; invader<55; invader++){			
			if(invaders[invader][0]){				
				ys[ys.length] = invaders[invader][2];
			}
		}				
		LAST_VERTICAL = ys[ys.length-1];		
	}	
	
	function compare(a, b) {
		if (a < b)
			return -1;
		if (a > b)
			return 1;		
		return 0;
	}
	
	function drawBackground() {	
		ctx01.clearRect(0, 0, WIDTH, HEIGHT);
		ctx01.fillStyle = "black";
		ctx01.fillRect(0,0,WIDTH,HEIGHT);					
		ctx01.fillStyle = "blue";
		ctx01.fillRect(0,0,WIDTH,30);		
		drawStars("white",25);
		drawStars("#666310",25);
		drawStars("#1a3960",25);
		drawStars("#671810",25);		
		ctx01.restore();
	}				
	
	function drawStars(color, number){
		for (var i = 0; i <= number; i++) {          
			var x = Math.floor(Math.random() * 919);
			var y = Math.floor(Math.random() * 919);
			ctx01.fillStyle = color;
			ctx01.beginPath();
			ctx01.arc(x, y, 1, 0, Math.PI * 2, true);
			ctx01.closePath();
			ctx01.fill();
		}
	}

	function drawInvaders(){
		if(gridX == 20 || gridX == 280) gridY += 10;
		var margin_x, margin_y;
		var alien = 0;
		ctx04.clearRect(0, 0, WIDTH, HEIGHT);
		ctx04.save();		
		// Draw 11 squids.
		for(var a=8; a<=608; a = a+60){
			if(invaders[alien][0])
				drawSquid(gridX+a,gridY);
			invaders[alien][1] = gridX+a;
			invaders[alien][2] = gridY+32;
			alien++;
		}
		// Draw 22 crabs
		margin_x = 2.5;
		margin_y = 50;
		for(var b=0; b<22; b++){
			if(b==11){
				margin_x = 2.5;
				margin_y = 100;
			}
			if(invaders[alien][0])
				drawCrab(gridX+margin_x,gridY+margin_y);
			invaders[alien][1] = gridX+margin_x;
			invaders[alien][2] = gridY+margin_y+32;
			alien++;
			margin_x += 60;			
		}
		// Draw 22 octopus
		margin_x = 0;
		margin_y = 150;
		for(var c=0; c<22; c++){
			if(c==11){
				margin_x = 0;
				margin_y = 200;
			}
			if(invaders[alien][0])
				drawOctopus(gridX+margin_x,gridY+margin_y);			
			invaders[alien][1] = gridX+margin_x;
			invaders[alien][2] = gridY+margin_y+32;
			alien++;
			margin_x += 60;
		}
		ctx04.restore();
	}
	
	/*
	 * Width:  44px
	 * Height: 32px
	 */
	function drawCrab(gridx,gridy){
		ctx04.fillStyle = "#fc341a";		
		ctx04.fillRect(gridx+8,gridy+0,4,4);
		ctx04.fillRect(gridx+32,gridy+0,4,4);
		ctx04.fillRect(gridx+12,gridy+4,4,4);
		ctx04.fillRect(gridx+28,gridy+4,4,4);		
		ctx04.fillRect(gridx+8,gridy+8,28,16);						
		ctx04.fillRect(gridx+0,gridy+16,44,4);				
		if(!moving){
			ctx04.fillRect(gridx+0,gridy+8,4,8);
			ctx04.fillRect(gridx+40,gridy+8,4,8);
			ctx04.fillRect(gridx+4,gridy+28,4,4);		
			ctx04.fillRect(gridx+36,gridy+28,4,4);
		}else{
			ctx04.fillRect(gridx+0,gridy+20,4,8);
			ctx04.fillRect(gridx+40,gridy+20,4,8);
			ctx04.fillRect(gridx+12,gridy+28,8,4);		
			ctx04.fillRect(gridx+24,gridy+28,8,4);
		}
		ctx04.fillRect(gridx+8,gridy+24,4,4);
		ctx04.fillRect(gridx+32,gridy+24,4,4); 				
		ctx04.fillStyle = "#545454";
		ctx04.fillRect(gridx+4,gridy+12,36,4);
		ctx04.fillRect(gridx+8,gridy+16,12,4);
		ctx04.fillRect(gridx+24,gridy+16,12,4);
		ctx04.fillStyle = "white";
		ctx04.fillRect(gridx+12,gridy+12,4,4);
		ctx04.fillRect(gridx+28,gridy+12,4,4);
	}
	
	/*
	 * Width:  48px
	 * Height: 32px
	 */
	function drawOctopus(gridx,gridy){		
		ctx04.fillStyle = "#931191";
		ctx04.fillRect(gridx+16,gridy+0,16,4);
		ctx04.fillRect(gridx+4,gridy+4,40,16);
		ctx04.fillRect(gridx+0,gridy+8,4,12);
		ctx04.fillRect(gridx+44,gridy+8,4,12);		
		ctx04.fillRect(gridx+12,gridy+20,8,4);
		ctx04.fillRect(gridx+28,gridy+20,8,4);
		ctx04.fillRect(gridx+20,gridy+24,8,4);		
		if(moving){
			ctx04.fillRect(gridx+8,gridy+28,8,4);
			ctx04.fillRect(gridx+32,gridy+28,8,4);
			ctx04.fillRect(gridx+4,gridy+24,8,4);		
			ctx04.fillRect(gridx+36,gridy+24,8,4);
		}else{
			ctx04.fillRect(gridx+0,gridy+28,8,4);
			ctx04.fillRect(gridx+40,gridy+28,8,4);
			ctx04.fillRect(gridx+8,gridy+24,8,4);		
			ctx04.fillRect(gridx+32,gridy+24,8,4);
		}
		ctx04.fillStyle = "black";
		ctx04.fillRect(gridx+12,gridy+12,8,4);
		ctx04.fillRect(gridx+28,gridy+12,8,4);
		ctx04.fillStyle = "#fdee02";
		ctx04.fillRect(gridx+20,gridy+0,8,8);
	}
	
	/*
	 * Width:  32px
	 * Height: 32px
	 */
	function drawSquid(gridx,gridy){		
		ctx04.fillStyle = "#53ae3e";
		ctx04.fillRect(gridx+12,gridy+0,8,4);
		ctx04.fillRect(gridx+8,gridy+4,16,16);
		ctx04.fillRect(gridx+4,gridy+8,4,4);
		ctx04.fillRect(gridx+24,gridy+8,4,4);		
		ctx04.fillRect(gridx+0,gridy+12,8,8);
		ctx04.fillRect(gridx+24,gridy+12,8,8);		
		ctx04.fillRect(gridx+8,gridy+16,16,4);
		if(moving){
			ctx04.fillRect(gridx+4,gridy+20,4,4);
			ctx04.fillRect(gridx+0,gridy+24,4,4);
			ctx04.fillRect(gridx+4,gridy+28,4,4);
			ctx04.fillRect(gridx+24,gridy+20,4,4);
			ctx04.fillRect(gridx+28,gridy+24,4,4);
			ctx04.fillRect(gridx+24,gridy+28,4,4);
		}else{
			ctx04.fillRect(gridx+8,gridy+20,4,4);
			ctx04.fillRect(gridx+20,gridy+20,4,4);
			ctx04.fillRect(gridx+4,gridy+24,4,4);
			ctx04.fillRect(gridx+12,gridy+24,8,4);
			ctx04.fillRect(gridx+24,gridy+24,4,4);
			ctx04.fillRect(gridx+0,gridy+28,4,4);
			ctx04.fillRect(gridx+8,gridy+28,4,4);
			ctx04.fillRect(gridx+20,gridy+28,4,4);
			ctx04.fillRect(gridx+28,gridy+28,4,4);
		}
		ctx04.fillStyle = "red";
		ctx04.fillRect(gridx+8,gridy+12,4,4);
		ctx04.fillRect(gridx+20,gridy+12,4,4);
	}
	
	/*
	 * Width:
	 * Height: 32px
	 */
	function drawBonus(){}
	
	
	function drawShip() {
		ctx02.clearRect(0, 0, WIDTH, HEIGHT);
		ctx02.save();
		ctx02.font = "bold 25px Consolas";
		ctx02.fillStyle = "white";
		ctx02.fillText("Score: " + score,5,22);
		ctx02.fillText("Destroyed: " + destroyed,360,22);
		ctx02.fillText("Lives: " + lives,800,22);
		if(gameover){
			ctx02.fillStyle = "#faf2bd";
			ctx02.fillRect(x+20,y+15,5,5);
			ctx02.fillRect(x+25,y+10,5,5);
			ctx02.fillRect(x-10,y+30,5,5);
			ctx02.fillRect(x-5,y+20,5,5);
			ctx02.fillRect(x,y+30,5,10);
			ctx02.fillRect(x+10,y+20,5,10);
			ctx02.fillRect(x+30,y+20,5,10);
			ctx02.fillRect(x,y+30,40,5);
			ctx02.fillRect(x+40,y+30,5,10);
			ctx02.fillRect(x+15,y+35,15,5);
			ctx02.fillRect(x+50,y+30,5,5);
			ctx02.fillRect(x+45,y+20,5,5);
			ctx02.fillStyle = "blue";
			ctx02.fillRect(x+15,y+25,5,10);			
			ctx02.fillRect(x+25,y+25,5,10);		
			ctx02.fillStyle = "red";
			ctx02.fillRect(x,y+40,5,5);
			ctx02.fillRect(x+40,y+40,5,5);
		}else{
			ctx02.fillStyle = "#faf2bd";
			ctx02.fillRect(x,y+25,5,15);
			ctx02.fillRect(x,y+30,40,5);		
			ctx02.fillRect(x+10,y+20,25,15);
			ctx02.fillRect(x+15,y+15,15,5);
			ctx02.fillRect(x+15,y+35,15,5);
			ctx02.fillRect(x+20,y+5,5,10);
			ctx02.fillRect(x+40,y+25,5,15);
			ctx02.fillStyle = "blue";
			ctx02.fillRect(x+15,y+20,5,15);
			ctx02.fillRect(x+20,y+15,5,5);		
			ctx02.fillRect(x+25,y+20,5,15);		
			ctx02.fillStyle = "red";
			ctx02.fillRect(x,y+40,5,5);
			ctx02.fillRect(x+40,y+40,5,5);
		}		
		ctx02.restore();		
		//End on the game.
		if(lives == 0){
			if(showEnd){
				document.getElementById('gameover_pre').style.visibility = 'visible';
				document.getElementById('gameover').style.visibility = 'visible';
				clearInterval(currentAnimation);
				currentAnimation = setInterval(animate,800);
				showEnd = false;			
			}
			window.removeEventListener('keydown',keyPressed,true);
			window.addEventListener('keydown',spaceBar,true);
			gameover = true;
		}
		if(destroyed == 55){
			if(showEnd){
				document.getElementById('winner_pre').style.visibility = 'visible';
				document.getElementById('winner').style.visibility = 'visible';
				showEnd = false;			
			}
		}
	}
		
	function shoot(){
		ctx03.clearRect(0, 0, WIDTH, HEIGHT);
		ctx03.fillStyle = 'red';
		ctx03.save();
		ctx03.beginPath();
		ctx03.arc(shootX,shootY - 4,3, 0, 2 * Math.PI, false);
		ctx03.arc(shootX,shootY - 8,3, 0, 2 * Math.PI, false);
		ctx03.arc(shootX,shootY - 12,3, 0, 2 * Math.PI, false);
		ctx03.arc(shootX,shootY - 16,3, 0, 2 * Math.PI, false);
		ctx03.fill();
		ctx03.restore();
		shootY -= 5;
		
		for(var invader=0; invader<55; invader++){
			var coordx = invaders[invader][1];
			var coordy = invaders[invader][2];
			var clear = false;
			if(invaders[invader][0]){
				if((shootY > coordy-5)&&(shootY < coordy+5)){
					if(invaders[invader][3] == "squid"){
						if((shootX >= coordx)&&(shootX <= coordx+32)){
							invaders[invader][0] = false;
							console.log("indice: "+invader+ " | value: "+invaders[invader][0]);
							clear = true;
							score += 10;
						}
					}
					if(invaders[invader][3] == "crab"){
						if((shootX >= coordx)&&(shootX <= coordx+44)){
							invaders[invader][0] = false;
							console.log("indice: "+invader+ " | value: "+invaders[invader][0]);
							clear = true;
							score += 30;
						}
					}
					if(invaders[invader][3] == "octopus"){
						if((shootX >= coordx)&&(shootX <= coordx+48)){
							invaders[invader][0] = false;
							console.log("indice: "+invader+ " | value: "+invaders[invader][0]);
							clear = true;
							score += 20;
						}
					}
				}
				if(clear){
					clearInterval(shooting);
					shooting = null;
					ctx03.clearRect(0, 0, WIDTH, HEIGHT);
					destroyed++;
				}
				if(shootY < 45){
					clearInterval(shooting);
					shooting = null;
					ctx03.clearRect(0, 0, WIDTH, HEIGHT);
				}
			}
		}
	}	
	
	function spaceBar(evt){
		switch (evt.keyCode) {						
			case 32:	
				if(gameover){
					document.getElementById('gameover_pre').style.visibility = 'hidden';
					document.getElementById('gameover').style.visibility = 'hidden';
					window.removeEventListener('keydown',spaceBar,true);
				}	
			break;
		}		
	}
	
	function keyPressed(evt){
		switch (evt.keyCode) {						
			case 32:
				if(!shooting){
					shootX = x + 22.5;
					shootY = y;
					shooting = setInterval(shoot,20);
				}
			break;
			case 37:
				if (x - dx > 5){
					x -= dx;					
				}
			break;
			case 39:
				if (x + dx < WIDTH - 47.5){
					x += dx;					
				}
			break;
		}
	}	
	
	window.addEventListener('keydown',keyPressed,true);