var userClickedPattern = [];
var gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour;
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  level++;
  $("h1").html("level" + level);
  ShowSequence();
}

function ShowSequence() {
  var x = 0;
  ShowAnElement(x);
}
function ShowAnElement(x) {
  var i = x;
  setTimeout(function () {
    $("." + gamePattern[i])
      .fadeOut(100)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    i++;
    if (i < gamePattern.length) {
      ShowAnElement(i);
    }
  }, 500);
}

function PlaySound(key) {
  switch (key) {
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    default:
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      break;
  }
}

let userChosenColour;
$(".btn").click(function () {
  var id = $(this).attr("id");
  userChosenColour = id;
  userClickedPattern.push(userChosenColour);
  PlaySound(id);
  animatePress(id);
  if (CheckAnswer() == "false") {
    userClickedPattern = [];
    setTimeout(function () {
      $("body").toggleClass("game-over");
    }, 200);
    $("body").toggleClass("game-over");
    $("h1").html("You FAILED! Press anything to restart");
    checker = false;
  } else if (CheckAnswer() == "finish") {
    userClickedPattern = [];
    setTimeout(nextSequence(), 500);
  }
});

function animatePress(key) {
  $("." + key).addClass("pressed");
  setTimeout(function () {
    $("." + key).removeClass("pressed");
  }, 100);
}

var level = 0;
var checker = false;
$("body").keydown(function () {
  if (checker == false) {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    nextSequence();
    $("h1").html("level" + level);
    checker = true;
  }
});

function CheckAnswer() {
  var i = 0;
  while (i < userClickedPattern.length) {
    if (CheckEachElement(i) == false) {
      return "false";
    }
    i++;
  }
  if (i == gamePattern.length) {
    return "finish";
  }
  return "true";
}

function CheckEachElement(i) {
  if (userClickedPattern[i] != gamePattern[i]) {
    return false;
  } else {
    return true;
  }
}
