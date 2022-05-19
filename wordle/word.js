let grid = [];
let kb = [];    
let words = [];

let tries = 0;
let guess = '';
let word = '';

let msg = document.getElementById('msg');

// Labels for our buttons
let labels = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    '✔︎', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '✘'];

/*
    craeateGrid
    Create a number of divs for the play area of
    our game. Note that the grid is arranged using 
    CSS, so these nested loops can be replaced by 
    a single loop that creates the same number of 
    divs.
*/
function createGrid () {
    let div = document.getElementById ('play');
    for(let i = 0; i < 6; i += 1) {
        for(let j = 0; j < 5; j += 1) {
            let d = document.createElement('div');
            div .appendChild (d);
            grid .push(d);
        }    
    }
}

/*
    createKeyboard
    create the 28 buttons needed for the keyboard.
    The CSS handles the layout the first row needs
    special handling. We can mark which buttons belong to to the first row by setting the class attribute.

    Additionally, the buttons need labels and an
    action to perform when pressed. Look at the loop variable i. It represents the index of the
    current button if we start from top left and count to the right. Note our labels above are ordered in the same way.

    We can also set the onclick action for each button. 
*/
function createKeyboard () {
    let div = document.getElementById ('keyboard');
    for(let i = 0; i < 28; i++) {
        let b = document.createElement('button');
        
        // if statement to set class. Why does it 
        // work?
        if (i < 10) b.className = 'r1';
        else        b.className = 'ro';

        // think about which button we're creating
        // at the moment and its relationship labels
        b.innerHTML = labels[i];

        // This is a new feature: Anonymous functions 
        // or lambdas. This unnamed function will call
        // the press function and pass it the label of
        // the button that was pressed.
        b.onclick = function() { pressed (labels[i]) }
        div .appendChild (b);
        kb .push(b);
    }
}

/*  The above code can be made clearer and perhaps shorter.
    createKeyboard() does a lot of the same things as
    createGrid(). Is there a way combine this common stuff
    into a single function? Think about it.
*/


/*
    pressed (what)
    Handle a press from a button. It receives the label of
    the button that was pressed.
*/
function pressed (what) {

    if (guess.length === 5) {
        msg.innerHTML = 'Try again';
        return;
    }

    let div = grid [5* tries + guess.length];
    guess += what;
    div.innerHTML = what;
}

function checkGuess () {
    msg.innerHTML = '';

    let counts = {};
    let lcg = guess.toLocaleLowerCase ();
    let row = turn * 5;

    for (let c of word) {
        if (counts[c] === undefined) 
            counts[c] = 1;
        else 
            counts [c] += 1;
    }

    for (let i = 0; i < lcg.length; i++) {
        if (lcg[i] === word[i]) {
            grid[row + i].className = 'correct';
            counts [word[i]] -= 1;
            markCorrect(guess[i]);
        }   
    }

    for (let i = 0; i < lcg.length; i++) {
        let k = lcg[i];

        if (grid [row + i].className !== 'correct') {
            if (word.indexOf (k) >= 0 && counts[k] > 0) {
                grid[row + i].className = 'partial';
                counts[k] -= 1;
                markPartial (guess[i]);
            }
            else {
                grid [row + i].className = 'wrong';
                markWrong (guess[i]);
            }
        }
    }

    updateGame ();
}

fetch('words.txt')
.then ((r) => {return r.text()})
.then ((t) => {
    words = t.split (/\r?\n/);
    word = words[Math.floor(Math.random() * words.length)];
    createGrid();
    createKeyboard();
});
