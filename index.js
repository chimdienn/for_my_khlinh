function nextSequence(){
    level++;
    if (level > maxLevel){
        newGame();
    }
    else{
        $("h1").html("level " + level + "/" + maxLevel);
        var randomNumber = Math.floor(Math.random()*4);
        var randomChosenColor = buttonColours[randomNumber];
        gamePattern.push(randomChosenColor);

        setTimeout(function(){
            flashAnimation(randomChosenColor);
            playSound(gamePatternSound[level]);
        }, 200);
        console.log(gamePattern);
    }
}

function flashAnimation(id){
    $("#"+id).animate({opacity: 0.4}, 70).animate({opacity: 1}, 70);
}

function playSound(id){
    var sound = new Audio("sounds/" + id + ".mp3");
    if (id == "wrong"){
        sound.volume = 0.15;
    }
    sound.play();
}

function animatePress(id){
    $("#"+id).addClass("pressed");
    setTimeout(function(){
        $("#"+id).removeClass("pressed")
    }, 100);
}

function restartGame(){
    $("h1").html("Game Over, Press This Line to Restart");
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    levelWon = true;
    level = 0;
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
}

function newGame(){
    $("h1").html("You Won! Press This Line to Restart");
    var message = loveMessages[Math.floor(Math.random() * 4)];
    $("footer").html(message);
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    levelWon = true;
    
}

const maxLevel = 10;
const buttonColours = ["green", "red", "yellow", "blue"];
const gamePatternSound = [0, "e4", "c4", "b4", "a4", "f4", "f4", "e4", "c4", "d4", "c4"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStarted = false;
var levelWon = true;

const loveMessages = [
    "em giỏi lắm! iu em.",
    "sinh nhật hạnh phúc nha, thương em.",
    "khi nào gặp cho anh ôm cái nha ^^",
    "anh nhớ khánh linh quá."
]


$("h1").on("click", function(){
    if (!gameStarted){
        level = 0;
        $("footer").html("Made with ❤️ from Trọng Đức.");
        nextSequence();
    }
    gameStarted = true;
});
    
$(".btn").on("click", function(){
    if (level <= maxLevel){
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        animatePress(userChosenColor);
        if (gamePattern.length === 0){
            restartGame();
        }

        else {
            for (var i=0; i<userClickedPattern.length; i++){
                if (userClickedPattern[i] != gamePattern[i]){
                    levelWon = false;
                    break;
                }
                else if (i === userClickedPattern.length - 1){
                    playSound(gamePatternSound[i+1]);
                }
            }
            if (!levelWon){
                restartGame();
            }
            else if (userClickedPattern.length === level && levelWon){
                userClickedPattern = [];
                setTimeout(function(){
                    nextSequence();
                }, 200); 
            }
        }
    }
});
