    //declaring global variables

   var dog,dogimg,happydog,happydogimg,database,foodS,foodStock;
   var foodobj;
   var addfood,feedpet;
   var fedtime,lastfed;
   var input2;
   var feedTime,feedTime1;
   var greeting;
  function preload()
  {
      //loading images
    
      dogimg=loadImage("dogImg.png");

      happydogimg=loadImage("dogImg1.png");
  }

function setup() {
   
  database=firebase.database();
  
  createCanvas(1000, 500);
   foodStock=database.ref('Food');
   foodStock.on("value",readStock);

   dog=createSprite(450,350,10,10);
   dog.addImage(dogimg);
   dog.scale=0.15;


   feedTime=database.ref('FeedTime');
   feedTime.on("value",readtime);

  foodobj=new food();
 
    
   addfood=createButton("ADD FOOD");
  
  addfood.position(350,250);

addfood.mousePressed(addfood);

   feedpet=createButton("FEED");

   feedpet.position(450,250);
   feedpet.mousePressed(feedDog);
   input2=createInput("ADD NAME");
   input2.position(550,250);
 
   greeting=createElement('h3');
   SaveName=createButton("save name");
   SaveName.position(550,300);
   SaveName.mousePressed(function(){
   
  
    var name = input2.value();
   
    greeting.html("WELCOME"+name);
    greeting.position(350,300);
  
  })
   
  
  
}

function draw() {  
   background(46,139,87);

  



  

  


if(foodS==0){
  dog.addImage(dogimg)
  foodS=20;
}
  

  drawSprites();
 textSize(20);
 fill("pink");
 stroke("yellow");
 
  text("PRESS UP ARROW KEY TO FEED DRAGO MILK",30,100);
   text("FOOD STOCK:"+     foodS,100,480);
   text("PRESS DOWN KEY TO STOP FEEDING DRAGO",30,180);

if(lastfed>=12){
  text("LAST FEED"+lastfed%12+"PM",350,30);

}else if(lastfed==0){
  text("LAST FEED:12 AM",350,30);

}else {
  text("LAST FEED:"+lastfed+"AM",350,30);
}
/*if(addfood.mousePressed(function()){
  foodobj.display();
)}*/
 foodobj.display();

  

  
 
  



}

function addfood(){
  
  foodS++;
  console.log(foodS);
  database.ref('/').update({
    Food:foodS
  })
}
function readtime(data)
{
  
  lastfed=data.val();
 
}
function feedDog() {
  console.log("this is a message");
  dog.addImage(happydogimg);
  foodobj.deductFood(foodS);
  database.ref('/').update({
   Food:foodS,
    feedTime: hour()
  })
}

function readStock(data)
 {
   foodS=data.val();
 }
 
 function writeStock(x){
 if(x<=0){
   x=0;
 }
 else{
   x=x-1;
 }
 database.ref('/').update({
   Food:x
 })
 }

