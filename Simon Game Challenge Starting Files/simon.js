var gamePattern = [];
var userClickedPattern = [];
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success');
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('wrong');
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    $("body").addClass('game-over');
    setTimeout(function() {
      $("body").removeClass('game-over');
    }, 2000);
    $("#level-title").text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playColorAnimation(randomChosenColour);
  level++;
  $("#level-title").text(`Level: ${level}`);
  checkAnswer(userClickedPattern.length - 1);
}

function playColorAnimation(color) {
  $("#" + color).fadeOut(100).fadeIn(100);
  var colorAudioString = "sounds/" + color + ".mp3";
  var colorAudio = new Audio(colorAudioString);
  colorAudio.play();
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playColorAnimation(userChosenColour);
  var lastIndex = userClickedPattern.length - 1;
  checkAnswer(lastIndex);
});


function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
  }
  

