const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,seed,ground;
var seed_con;
var seed_con_2;
var seed_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;


var fr;


var cut_sound;
var sad_sound;
var eating_sound;
var star1, star2;
var starImage;
var blower;
var stars;
var emptyStar, oneStar, twoStar;
var hamster;
var hamsterOne,hamsterTwo;
var hamsterRunning;
function preload()
{
  bg_img = loadImage('hamsterbackground.jpg');
  food = loadImage('seed.png');
 
  

  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');


  starImage = loadImage('star.png');
  emptyStar = loadAnimation("empty.png");
  oneStar = loadAnimation("one_star.png");  
  twoStar = loadAnimation("stars.png");
 
  //hamsterOne = loadAnimation("hamsterImg1.png,","hamsterImg2.png") 
  
 
  eat.looping = false; 
}

function setup() 
{
  createCanvas(900,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('scissors.png');
  button.position(300,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('scissors.png');
   button2.position(650,175);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   blower = createImg('baloon2.png');
   blower.position(410,250);
   blower.size(120,120);
   blower.mouseClicked(blow);
   hamster = createImg('hamsterImg1.png');
   hamster.position(200,500)
   rope = new Rope(7,{x:320,y:90});
   rope2 = new Rope(7,{x:690,y:175});


  ground = new Ground(300,height,width,20);
  

  
  
  //hamster = createSprite(300,height-150,100,100);
  //hamster.addAnimation('hamsterOne');
  

  star1 = createSprite(520,50,20,20);
  star1.scale = 0.02;
  star1.addImage(starImage);

  star2 = createSprite(250,360,20,20);
  star2.scale = 0.02;
  star2.addImage(starImage);

  stars = createSprite(50,20,30,30);
  stars.scale = 0.2
  stars.addAnimation('empty',emptyStar);
  stars.addAnimation('one',oneStar);
  stars.addAnimation('two',twoStar);
  stars.changeAnimation('empty');
  
  seed = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,seed);

  seed_con = new Link(rope,seed);
  seed_con_2 = new Link(rope2,seed);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(seed!=null){
    image(food,seed.position.x,seed.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(seed,hamster)==true)
  {
    World.remove(engine.world,seed);
    seed = null;
  
    text("You Win")
  }
  if(collide(seed,star1,20)==true)
  {
    star1.visible = false
    stars.changeAnimation('one');
  }
  if(collide(seed,star2,20)==true)
  {
    star2.visible = false
    stars.changeAnimation('two');
  }

  if(seed!=null && seed.position.y>=650)
  {
    
    text("You Lose");
    textSize(100);
    sad_sound.play();
    seed=null;
   }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  seed_con.dettach();
  seed_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  seed_con_2.dettach();
  seed_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}



function blow()
{
  Matter.Body.applyForce(seed,{x:0,y:0},{x:0,y:-0.03});
}

