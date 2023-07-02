var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
var sound;
$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);    
  checkAnswer(userClickedPattern.length-1);
})
$(document).on("keydown",function(){
  if(!started){
    nextSequence();
    started=true;
  }
})

function nextSequence(){
  userClickedPattern=[]
  $("#level-title").text("Level "+level);
  var randomNumber=Math.random();
  randomNumber=Math.floor(randomNumber*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
}

function playSound(name){
  sound=new Audio("sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    if(gamePattern.length===userClickedPattern.length)
    {
      setTimeout(function()
      {
        nextSequence()
      },1000);
      console.log("success");
    }
  }
  else{
    console.log("wrong");
    playSound("wrong")
    $("#level-title").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    startOver();
  }
}

function startOver(){
  gamePattern=[];
  started=false;
  level=0;
}




