console.log("Connected");

var jumpSpeed;
var pipeSpeed;
var screenWidth;
var windowWidth;
var checkPipe;
var checkMario;
var readyJump = true;
var marioPosition = 0;
var pipePosition = 0;
var jumping;
var moving;
var checking;
var startGame = false;
var gameScore = 0;

// functio to jump
function jump() {
    $("#gameMario").attr('src', "./assects/marioJump.jpg");

    var inc = 1;
    jumping = setInterval(function () {
        if (marioPosition == 100) inc = -1;
        marioPosition += inc;
        $("#gameMario").css("bottom", marioPosition + "px");
        if (marioPosition == 0) {
            $("#gameMario").attr('src', "./assects/marioGIF.gif");
            readyJump = true;
            clearInterval(jumping);
        }
    }, jumpSpeed);
}

// for key press (computer)
$(".gameBody").keydown(function () {
    if (readyJump) {
        readyJump = false;
        jump();
    }
});

// for touch (touch devices)
$(".gameBody").on("touchstart", function () {
    if (readyJump && startGame) {
        readyJump = false;
        jump();
    }
});


// function to move pipe
function pipeMoving() {
    pipePosition = -50;
    $(".marioPipe").css("right", pipePosition + "px");
    moving = setInterval(function () {
        pipePosition++;
        if (pipePosition > windowWidth + 50)
            pipePosition = -50;
        $(".marioPipe").css("right", pipePosition + "px");
    }, pipeSpeed);
}

// function to check
function check() {
    checking = setInterval(function () {
        if (pipePosition == parseInt(windowWidth)) {
            gameScore++;
            if (gameScore < 10)
                $("#gameScore").html("0" + gameScore);
            else
                $("#gameScore").html(gameScore);
        }
        if ((pipePosition > (windowWidth - checkPipe) && pipePosition < (windowWidth - 10)) && (marioPosition > -1 && marioPosition < checkMario)) {
            clearInterval(jumping);
            clearInterval(moving);
            clearInterval(checking);
            $("#gameMario").attr('src', "./assects/marioJump.jpg");
            $("#cover").fadeToggle();
            $(".cartain").fadeToggle();
            startGame = false;
        }
    }, 5);
}

// function to initlize game
function myGame() {
    gameScore = 0;
    jumpSpeed = 7;
    pipeSpeed = 5;
    checkPipe = 100;
    checkMario = 60;
    marioPosition = 0;
    readyJump = true;
    startGame = true;

    $("#gameScore").html("0"+gameScore);
    $("#gameMario").css("bottom", marioPosition + "px");
    screenWidth = $("body").width();
    windowWidth = $(".gameBody").width();
    console.log(screenWidth);
    console.log(windowWidth);
    if (screenWidth < 783.3) {
        jumpSpeed = 10;
        checkPipe = 70;
        checkMario = 30;
    }
    $('.gameBody').focus();
    pipeMoving();
    check();
}

$("#gameStart").click(function () {
    var i = 0;
    var imgSrc = $("#gameMario").attr('src');
    if (imgSrc == "./assects/marioStand.jpg" || imgSrc == "./assects/marioJump.jpg") {
        $("#gameMario").attr('src', "./assects/marioGIF.gif");
    }

    $("#cover").fadeToggle();
    $(".cartain").fadeToggle();
    myGame();
});