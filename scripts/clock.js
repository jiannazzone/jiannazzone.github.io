window.onload = displayClock();

function displayClock() {
    var clockText = new Date().toLocaleTimeString();
    clockElem = document.getElementById('clock');
    clockElem.innerHTML = clockText
    setTimeout(displayClock, 1000);
}