var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(".col-btn").click(function()
{
    userClickedPattern.push(this.id);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence()
{
    $("h2").text("level "+level);
    level++;
    var randomNumber= Math.floor(Math.random()*4);
    var randomChooseColor=buttonColors[randomNumber];
    gamePattern.push(randomChooseColor);
    $("#"+randomChooseColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChooseColor);
}

function playSound(name)
{
    var aud=new Audio("sounds/"+name+".mp3");
    aud.play();
}

function animatePress(currentColor)
{
    var activebutton=$("."+currentColor);
    activebutton.addClass("pressed");
    setTimeout(function(){
        activebutton.removeClass("pressed");
    },100);
}

$(document).keypress
(
    function(){
    if(started===false)
    {
   
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if(gamePattern.length===userClickedPattern.length)
        {
            userClickedPattern=[];
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        $("h2").text("Game Over, Press Any Key to Restart");
        gamePattern=[];
        userClickedPattern=[];
        started=false;
        level=0;
    }
}