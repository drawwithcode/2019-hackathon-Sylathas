let globe, Globerotation = 1, tg1, globeTexture, analyzer, bg;

function preload(){
  	globe = loadImage("assets/Img/globetexture.jpg");
	tg1 = loadModel("assets/Obj/logo.obj");
	sigla = loadSound('assets//Audio/TG1_new.mp3');
	trumpet = loadImage("assets/Img/Trumpet.png");
	bg = loadImage("assets/Img/Background.jpg");
}

function setup() {
  	createCanvas(windowWidth, windowHeight, WEBGL);
	noStroke();
	angleMode(DEGREES);
	analyzer = new p5.FFT();
  	analyzer.setInput(sigla);
}

function draw() {
	background(0);
	backgroundImage(bg);
	
	//Analyze Audio
	analyzer.analyze();
	
  	var bass = analyzer.getEnergy(100,150);
  	var treble = analyzer.getEnergy(150,250);
  	var mid = analyzer.getEnergy("mid");

  	var mapmid = map(mid, 0, 255, 1, 2.5);

	var b = map(treble, 0, 255, 155, 255);
	
	//Create Sphere with globe texture
	push();
	rotateY(Globerotation);
	stroke("#00008b");
	texture(globe);
	sphere(150 * mapmid);
	Globerotation += 1;
	pop();
	
	//Load Tg1 logo Model
	push();
	rotateX(-90);
	translate(-60, -150 * mapmid, 100);
	scale(30);
	fill(bass, mid, b);
	stroke(bass, mid, b);
	model(tg1);
	pop();
}

function backgroundImage(img) {
 	push();
  	imageMode(CENTER);
	
	analyzer.analyze();
	var mid = analyzer.getEnergy("mid");
	
  	tint(0, 0, 255, mid);
	let scale = Math.max(width/img.width,height/img.height);
	image(img,0,0,img.width*scale,img.height*scale)
	pop();
}


//Pause and Play on click
function mousePressed() {
  if(!sigla.isPlaying()){
    sigla.play();
  } else{
    sigla.pause();
  }
}

//Responsive Window
function windowResized() {
		resizeCanvas(windowWidth, windowHeight);
  	}
