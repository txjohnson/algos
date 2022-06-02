let grid = [];
let btns = [];
let words = [];
let turn = 0;
let guess = '';
let word;
let msg = document.getElementById('msg');

let labels = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    '✔', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '✘'];

function createGrid(where, what, howmany, save) {
    for(let i = 0; i < howmany; i += 1) {
        let e = document.createElement(what);
        where.appendChild (e);
        save.push(e)
    }
}

function setupButtons() {
    for (let i = 0; i < 28; i += 1) {
        if (i < 10) btns[i].className = 'r1';
        else btns[i].className = 'ro'
        btns[i]
        btns[i].innerHTML = labels[i];
        btns[i].onclick = function() {press (labels[i]) };
    }
}

function press (key) {
    let row = turn * 5;
 
    if (key === '✘') {
        if (guess.length > 0) {
            grid[row + guess.length - 1].innerHTML = '';
            guess = guess.slice (0, guess.length - 1);
        }
    }

    else if (key === '✔') {
        if (guess.length === 5) {
            submit ();
        }
    } 
    
    else if (guess.length < 5) {
        guess += key;
        grid[row + guess.length - 1].innerHTML = key;
    }
}


function submit () {
    console.log('submitting...')
    if (words.indexOf(guess.toLocaleLowerCase()) >= 0) {
        checkGuess ();
    }

    else {
        msg.innerHTML = `${guess} is not a word in our dictionary. Try a different word.`
    }
}

function checkGuess () {
    msg.innerHTML = '';

    let counts = {};
    let lcg = guess.toLocaleLowerCase ();
    let row = turn * 5;

    for (let c of word) {
        if (counts[c] === undefined) counts[c] = 1;
        else counts [c] += 1;
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

function updateGame () {
    if (turn === 6) {
        msg.innerHTML = `You Lose. The word was ${word}`;
    }

    else if (guess.toLocaleLowerCase() === word){
        msg.innerHTML = `You Win!`;
    }

    else {
        turn += 1;
        guess="";
    }
}

function letterToButton (a) {
    console.log(a);
    let i = labels .indexOf(a);
    return btns[i];
}

function markCorrect (a) {
    let btn = letterToButton (a);
    btn.classList.remove('partial');
    btn.classList.add ('correct');
}

function markPartial (a) {
    let btn = letterToButton (a);
    if (!btn.classList .contains ('correct')) 
        btn.classList.add ('partial');
}

function markWrong (a) {
    let btn = letterToButton (a);
    if (!btn.classList .contains ('correct') && !btn.classList.contains ('partial')) 
        btn.classList.add ('wrong');
}


fetch('words.txt')
.then ((r) => {return r.text()})
.then ((t) => {
    words = t.split (/\r?\n/);
    word = words[Math.floor(Math.random() * words.length)];
    console.log(word);
    createGrid(document.getElementById('grid'), 'div', 30, grid);
    createGrid(document.getElementById('kb'), 'button', 28, btns);
    setupButtons();

});