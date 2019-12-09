console.log("Connected");

/* Copyright (C) Kripa0047,- All Rights Reserved
 * Unauthorized copying, modifying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Kripa Bairagi <kripabairagi0047@gmail.com>, 2019-2020
 */


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
var jumpHeight;
var movingClouds;
var flyingBirds;
var jumpInc;

// function for flying birds
function birds() {
    $("#birdOne").attr('src', "./assects/birdGIF.gif");
    $("#birdTwo").attr('src', "./assects/slowBird.gif");
    var birds1Position = -400;
    var birds2Position = -300;
    $("#birdOne").css("right", birds1Position + "px");
    $("#birdTwo").css("right", birds2Position + "px");
    flyingBirds = setInterval(function () {
        birds1Position++;
        birds2Position += 0.5;
        $("#birdOne").css("right", birds1Position + "px");
        $("#birdTwo").css("right", birds2Position + "px");
        if (parseInt(birds2Position) == parseInt(windowWidth + 300))
            birds2Position = -300;
        if (birds1Position == parseInt(windowWidth + 400))
            birds1Position = -400;
    }, 15);
}

// function for moving clouds
function clouds() {
    var cloudPosition = -200;
    var happyCloudPosition = 200;
    $("#twoClouds").css("right", cloudPosition + "px");
    $("#oneCloud").css("right", happyCloudPosition + "px");
    movingClouds = setInterval(function () {
        cloudPosition += 0.3;
        happyCloudPosition += 0.3;
        $("#twoClouds").css("right", cloudPosition + "px");
        $("#oneCloud").css("right", happyCloudPosition + "px");
        if (parseInt(cloudPosition) == parseInt(windowWidth + 200))
            cloudPosition = -200;
        if (parseInt(happyCloudPosition) == parseInt(windowWidth + 100))
            happyCloudPosition = -100;
    }, 20);
}


// newJump
function newJump() {
    $("#gameMario").attr('src', "./assects/marioJump.png");

    var inc = 1;
    var x = 0;
    var sign = 1;
    jumpSpeed = 0;
    function justJump() {
        jumping = setInterval(function () {
            // console.log(jumpSpeed);
            if (marioPosition == jumpHeight) {
                inc = -1;
                sign = -1;
            }
            x += jumpInc*sign;
            jumpSpeed += x*x*x*sign;
            marioPosition += inc;
            $("#gameMario").css("bottom", marioPosition + "px");
            if (marioPosition == 0) {
                $("#gameMario").attr('src', "./assects/marioGIF.gif");
                readyJump = true;
                clearInterval(jumping);
            }
            else {
                clearInterval(jumping);
                justJump();
            }
        }, jumpSpeed);
    }
    justJump();
}

// functio to jump
// function jump() {
//     $("#gameMario").attr('src', "./assects/marioJump.png");

//     var inc = 1;
//     var jumpInc = 2;
//     jumpSpeed = 8;
//     jumping = setInterval(function () {
//         console.log(jumpSpeed);
//         if (marioPosition == jumpHeight) {
//             inc = -1;
//             jumpInc = -2;
//         }

//         jumpSpeed += jumpInc;
//         marioPosition += inc;
//         $("#gameMario").css("bottom", marioPosition + "px");
//         if (marioPosition == 0) {
//             $("#gameMario").attr('src', "./assects/marioGIF.gif");
//             readyJump = true;
//             clearInterval(jumping);
//         }
//     }, jumpSpeed);
// }

// for key press (computer)
$(".gameBody").keydown(function () {
    if (readyJump && startGame) {
        readyJump = false;
        // jump();
        newJump();
    }
});

// for touch (touch devices)
$(".gameBody").on("touchstart", function (event) {
    if (readyJump && startGame) {
        readyJump = false;
        // jump();
        newJump();
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
            clearInterval(movingClouds);
            clearInterval(flyingBirds);
            $("#birdOne").attr('src', "./assects/birdOne.jpg");
            $("#birdTwo").attr('src', "./assects/birdTwo.jpg");
            $("#gameMario").attr('src', "./assects/marioJump.png");
            $("#cover").fadeToggle();
            $(".cartain").fadeToggle();
            startGame = false;
        }
    }, pipeSpeed);
}

// function to initlize game
function myGame() {
    gameScore = 0;
    pipeSpeed = 5;
    checkPipe = 100;
    checkMario = 60;
    marioPosition = 0;
    readyJump = true;
    startGame = true;
    jumpHeight = 100;
    jumpInc = 0.009;

    $("#gameScore").html("0" + gameScore);
    $("#gameMario").css("bottom", marioPosition + "px");
    screenWidth = $("body").width();
    windowWidth = $(".gameBody").width();
    // console.log(screenWidth);
    // console.log(windowWidth);
    if (screenWidth < 783.3) {
        checkPipe = 70;
        checkMario = 35;
        jumpHeight = 80;
        jumpInc = 0.012;
    }
    $('.gameBody').focus();
    pipeMoving();
    clouds();
    birds();
    check();
}

$("#gameStart").click(function () {
    var i = 0;
    var imgSrc = $("#gameMario").attr('src');
    if (imgSrc == "./assects/marioStand.jpg" || imgSrc == "./assects/marioJump.png") {
        $("#gameMario").attr('src', "./assects/marioGIF.gif");
    }

    $("#cover").fadeToggle();
    $(".cartain").fadeToggle();
    myGame();
});