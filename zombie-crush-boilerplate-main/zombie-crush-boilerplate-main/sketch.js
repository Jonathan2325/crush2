const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var base,base2,ground,bridge,jointPoint,jointLink;
var stones = []
var stone,zombie,stoneImg,zombieImg,button
var backgroundImg
function preload(){
zombieImg = loadImage("./assets/zombie.png")
backgroundImg = loadImage("./assets/background.png")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  zombie = createSprite(width/2,height-110);
  zombie.addImage(zombieImg);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

button = createButton("");

button.position(500,100);
button.class("breakbutton")
button.mousePressed(handleMousePressed);

  base = new Base(10,350,300,100);
  base2 = new Base(1500,350,300,100);
  ground= new Base(780,700,1600,50);
  bridge = new Bridge (30,{x:width/2-850,y:height/2-100})
  jointPoint = new Base (width-200,height/2-100,40,20)
  Matter.Composite.add(bridge.body,jointPoint);
 jointLink = new Link (bridge,jointPoint);

 for(var s = 0;s <= 8;s++){
var xpos = random(width/2 - 200,width/2 + 300);
var ypos = random(-10,140)
 stone = new Stone(xpos,ypos,40);
stones.push(stone);
 }
  rectMode(CENTER);
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);
  //base.show();
  //base2.show();
  //ground.show();
  bridge.show();
  stone.show();
  drawSprites();
}
function handleMousePressed(){
  jointLink.detach();
  setTimeout(()=>{
    bridge.break();
  },1500);
  }
