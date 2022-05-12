
const ui = {
    button: document.querySelector('#command'),
};


function onCommand () {
    if (ui.button.innerHTML === 'Start') {
        ui.button.innerHTML = 'Pause';
    }

    else if (ui.button.innerHTML === 'Pause') {
        ui.button.innerHTML = 'Resume';
    }

    else {
        ui.button.innerHTML = 'Pause';
    }
}