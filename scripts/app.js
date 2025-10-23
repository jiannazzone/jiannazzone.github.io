// Get all windows and add event listeners to the X
const closeButtonElems = document.getElementsByClassName('window-closer')
const maxButtonElems = document.getElementsByClassName('window-max');
const minButtonElems = document.getElementsByClassName('window-min');
const allButtons = document.getElementsByClassName('window-button');

for (let i = 0; i < allButtons.length; i++) {

}



for (let i = 0; i < closeButtonElems.length; i++) {
    closeButtonElems[i].addEventListener('click', function() {
        windowElem = document.getElementById(this.dataset.parent);
        closeWindow(windowElem);
    });
}

for (let i = 0; i < maxButtonElems.length; i++) {
    maxButtonElems[i].addEventListener('click', function() {
        windowElem = document.getElementById(this.dataset.parent);
        maximizeWindow(windowElem);
    });
}

for (let i = 0; i < minButtonElems.length; i++) {
    minButtonElems[i].addEventListener('click', function() {
        windowElem = document.getElementById(this.dataset.parent);
        minimizeWindow(windowElem);
    });
}

function closeWindow(windowElem) {
    console.log('closing...')
    windowElem.style.scale = '0';
}

function maximizeWindow(windowElem) {
    windowElem.style.width = "100%";
    windowElem.style.height = "100%";
}

function minimizeWindow(windowElem) {
    windowElem.style.width = "66%";
    windowElem.style.height = "50%";
}