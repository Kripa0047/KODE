console.log("Connected");

var readyJump = true;
var marioPosition = 0;
var pipePosition = 0;
var jumping;
var moving;

function jump(){
    $("#gameMario").attr('src',"./assects/marioJump.jpg");

    var inc = 1;
    jumping = setInterval(function(){
        if(marioPosition == 100) inc = -1;
        marioPosition += inc;
        $("#gameMario").css("bottom", marioPosition+"px");
        if(marioPosition == 0){
            $("#gameMario").attr('src',"./assects/marioGIF.gif");
            readyJump = true;
            clearInterval(jumping);
        }
    }, 10);
}

// for key press (computer)
$(".gameBody").keydown(function(){
    if(readyJump){
        readyJump = false;
        jump();
    }
});
// for touch (touch devices)
$(".gameBody").click(function(){
    if(readyJump){
        readyJump = false;
        jump();
    }
});

function pipeMoving(){
    pipePosition = -5;
    var inc = 0.1;
    $(".marioPipe").css("right", pipePosition+"%");
    moving = setInterval(function(){
        pipePosition += inc;
        if(pipePosition > 105)
            pipePosition = -5;
        $(".marioPipe").css("right", pipePosition+"%");
    }, 7);
}

function myGame(){
    $('.gameBody').focus();
    pipeMoving();
}

$("#gameStart").click(function () {
    var imgSrc = $("#gameMario").attr('src');
    if(imgSrc == "./assects/marioStand.jpg"){
        $("#gameMario").attr('src',"./assects/marioGIF.gif");
        $("#cover").fadeOut(1000);
        $(".cartain").fadeOut(1000);
    }
    myGame();
});