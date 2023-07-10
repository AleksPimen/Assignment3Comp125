// Game variables
var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");
var bugImage = new Image();
bugImage.src = "bug.png";
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "grass.png";

var scoreDisplay = document.getElementById("score");
var resetSpeedButton = document.getElementById("resetSpeedButton");
var resetScoreButton = document.getElementById("resetScoreButton");

// Game constants
var bugSize = 40;
var bugSpeed = 1000; // Initial hopping interval in milliseconds
var score = 0;

// Bug object
var bug = {
    x: 0,
    y: 0
};

// Handle mouse click event
canvas.addEventListener("click", function(event) {
    var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;
    
    if (clickX >= bug.x && clickX <= bug.x + bugSize &&
        clickY >= bug.y && clickY <= bug.y + bugSize) {
        score++;
        scoreDisplay.textContent = score;
        bugSpeed -= 50;
        resetBugPosition();
    }
});

// Handle reset speed button click event
resetSpeedButton.addEventListener("click", function() {
    bugSpeed = 1000;
});

// Handle reset score button click event
resetScoreButton.addEventListener("click", function() {
    score = 0;
    scoreDisplay.textContent = score;
});

// Reset bug position
function resetBugPosition() {
    bug.x = Math.random() * (canvas.width - bugSize);
    bug.y = Math.random() * (canvas.height - bugSize);
}

// Update bug position
function updateBugPosition() {
    bug.x = Math.random() * (canvas.width - bugSize);
    bug.y = Math.random() * (canvas.height - bugSize);
}

// Game loop
function main() {
    updateBugPosition();
    render();

    // Request to do this again after bugSpeed milliseconds
    setTimeout(main, bugSpeed);
}

// Draw bug on the canvas
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    }
    
    // Draw bug
    ctx.drawImage(bugImage, bug.x, bug.y, bugSize, bugSize);
}

// Load bug image and start the game loop
bugImage.onload = function() {
    resetBugPosition();
    main();
};


