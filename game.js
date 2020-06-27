let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level;
let started = false;


$('button').click(function () {
    
    $("button").addClass("pressed");
    setTimeout(function () {
        $("button").removeClass("pressed");
    }, 400);
    if(started == true){
        $("#level-title").text("Game Restarted")
    }
    setTimeout(function(){
            level = 0;
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
    },1000);

});

function nextSequence() {

    started = true;

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);

    $("#level-title").text("Level " + ++level);

    userClickedPattern = [];

    console.log("nextSequence " + gamePattern);

    // $("#" + randomChosenColour).css("text-decoration","blink");
    // setTimeout(function(){
    //     $("#" + randomChosenColour).css("text-decoration","none")
    // },100);

}

$('.btn').click(function () {

    let userChosenColour = $(this).attr('id');

    playSound(userChosenColour);

    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);

    console.log("userclick " + userClickedPattern);

    if (gamePattern.length === userClickedPattern.length) {
        checkAnswer(userClickedPattern.length - 1);
    }

});

function playSound(name) {
    new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        setTimeout(function () {
            nextSequence();
        }, 1000);

    } else {
        console.log("wrong");
        new Audio("sounds/wrong.mp3").play();
        $("#level-title").text("Game Over, Press Cool Looking Button to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
            startover();
        }, 200);
    }
}

function startover() {
    level = 0;
    gamePattern = [];
}