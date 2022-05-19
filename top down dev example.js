
let game_running = true;


let player = {
    x:  0,
    y:  64,
}


function play () {
    loadAssets ();
    while (game_running) {
        drawBackground ();
        drawPlayer ();
        drawMonsters ();
    }
}

function loadAssets () {
}

function drawBackground () {

}

function drawPlayer () {
}

function drawMonsters () {
}
