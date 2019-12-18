var gamePattern = [];
//empty array to remember the sequence of colour.
var buttonColours = ["red", "blue", "green", "yellow"];

//array containing colours
var started = false;
var userClickedPattern = [];
//an empty array to get the sequence of button pressed
var level = 0;
///we have to check whether any key is pressed if pressed call nextSequence as initially we have to show press any key to start;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


  function checkAnswer(currentLevel) {

      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      }
  else{
    console.log("wrong");
    playsound("wrong");
    //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function nextSequence() {
  var userClickedPattern = [];
  //an empty array to get the sequence of button pressed
  level++;
  //increase the level by 1 whenever called.
  $("#level-title").text("Level " + level);
  var num = Math.floor(Math.random() * 3) + 1;
  var RandomChosenColour = buttonColours[num];

  //selecting the colour from 4 colours we have.
  gamePattern.push(RandomChosenColour);
  $("#" + RandomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //to get a flash on selected button
  playsound(RandomChosenColour);
}

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  //add class to the buttom that gets clicked.
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
