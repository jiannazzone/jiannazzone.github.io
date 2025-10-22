window.onload = displayClock();

function displayClock() {
    clockElem = document.getElementById('clock');
    const visualsCheckboxElem = document.getElementById('reduce-visuals-checkbox');
    let clockText;

    if (visualsCheckboxElem.checked) {
        clockText = new Date().toLocaleTimeString([], {timeStyle: 'short'});
    } else {
        clockText = new Date().toLocaleTimeString();
    }
    clockElem.innerHTML = clockText
    setTimeout(displayClock, 1000);
}