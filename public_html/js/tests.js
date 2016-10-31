/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function initImageArray() {
    //Use a better way to load the number of images I need (~2-5),
    //rather than filling a large array every time the page is loaded?
    for (var i = 0; i <= nImages; i++) {
        var iPath = "images/rastrograms/image" + i + ".bmp";
        imageArray.push(iPath);
    }
    console.log("imageArray has " + imageArray.length + " elements");
}
function initSoundArray() {
    for (var i = 0; i <= nImages; i++) {
        //var iPath = "sounds/" + i + ".mp3"; //TODO
        //var iPath = "sounds/1.mp3";      //placeholder  
        var iPath = "sounds/audio-numbers/" + i + ".wav";
        soundArray.push(iPath);
    }
    console.log("soundArray has " + soundArray.length + " elements");
}

function chooseImages() {
    //TODO ensure different pics chosen
    var randomNum1 = Math.floor(Math.random() * imageArray.length);
    testImage1.src = imageArray[randomNum1];
    if (debug) {
        testImage1.title = "Texture #" + randomNum1; //gives image index as rollover
    } //for debug
    testImage1.onclick = function () {
        imageClickEvent(randomNum1)
    };
    var randomNum2 = Math.floor(Math.random() * imageArray.length);
    while (randomNum2 == randomNum1) {
        randomNum2 = Math.floor(Math.random() * imageArray.length); //ensure both images are never the same
    }
    testImage2.src = imageArray[randomNum2];
    if (debug) {
        testImage2.title = "Texture #" + randomNum2;
    }
    testImage2.onclick = function () {
        imageClickEvent(randomNum2)
    };

    console.log("load images " + randomNum1 + " and " + randomNum2);
    //pick one of the 2 random numbers to use that sound index
    var picked = Math.random() < 0.5 ? randomNum1 : randomNum2;
    console.log("picking sound " + picked);
    chooseSound(picked);

}

function chooseSound(n) {
    testSound.src = soundArray[n];
    soundId = n;
    testSound.volume = volumeLevel;
}

function playSound() {
    testSound.play();

}
//Various event handlers...

function highlightImage(img) {
    img.style.border = "4px solid springgreen";

}
function deHighlightImage(img) {

    img.style.border = "4px solid black";
}

//volume change event
testSound.onvolumechange = function () {
    volumeLevel = testSound.volume; //store the change to volume level 
    console.log("The volume has been changed to " + testSound.volume);
};

//image click event
function imageClickEvent(n) {
    console.log(n.valueOf()); //echo selcted image id
    if (testScore < 4) {
        if (n == soundId) {
            console.log("***correct!***"); //echo selcted image id
            testScore += 1;
            nTestsCompleted += 1;
            var str = "&#10004; SCORE: " + testScore + " / " + nTestsCompleted; //TODO: better way than this?
            var strColor = str.fontcolor("green");
            scoreDisplay.innerHTML = strColor;


        }
        else {
            console.log("***incorrect!***"); //echo selcted image id
            nTestsCompleted += 1;
            var str = "&#10008 SCORE: " + testScore + " / " + nTestsCompleted;
            var strColor = str.fontcolor("red");
            scoreDisplay.innerHTML = strColor;
        }
        //saveData();
        chooseImages();
        setTimeout(playSound, 1000); //delay start of playback
    }
    else {
        var str = "&#10004; 5 CORRECT!";
        var strColor = str.fontcolor("orange");
        scoreDisplay.innerHTML = strColor;
        setTimeout(nextLevel, 2000);
    }
}
//            function nextLevel() {
//
//            }
            