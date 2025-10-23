// Get all windows and add event listeners to the X
const closeButtonElems = document.getElementsByClassName('window-closer')
const maxButtonElems = document.getElementsByClassName('window-max');
const minButtonElems = document.getElementsByClassName('window-min');
const allButtons = document.getElementsByClassName('window-button');

for (let i = 0; i < closeButtonElems.length; i++) {
    closeButtonElems[i].addEventListener('click', function () {
        const windowElem = document.getElementById(this.dataset.parent);
        closeWindow(windowElem);
    });
}

for (let i = 0; i < maxButtonElems.length; i++) {
    maxButtonElems[i].addEventListener('click', function () {
        const windowElem = document.getElementById(this.dataset.parent);
        maximizeWindow(windowElem);
    });
}

for (let i = 0; i < minButtonElems.length; i++) {
    minButtonElems[i].addEventListener('click', function () {
        const windowElem = document.getElementById(this.dataset.parent);
        minimizeWindow(windowElem);
    });
}

function closeWindow(windowElem) {
    windowElem.style.scale = '0';
}

function maximizeWindow(windowElem) {
    windowElem.style.position = 'static';
    windowElem.className = 'window glow';
    windowElem.style.width = "100%";
    windowElem.style.height = "100%";
}

function minimizeWindow(windowElem) {
    windowElem.style.position = 'absolute';
    windowElem.className += 'draggable';
    windowElem.style.width = "66%";
    windowElem.style.height = "50%";
}

// Window Dragging
document.querySelectorAll('.window-header').forEach(header => {
    const windowEl = header.closest('.window');
    let offsetX = 0, offsetY = 0, isDragging = false;

    header.addEventListener('mousedown', e => {
        if (e.target.closest('.window-button')) return;
        if (!e.target.closest('.window').className.includes('draggable')) return;

        isDragging = true;
        const rect = windowEl.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        windowEl.style.position = 'absolute';
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        e.preventDefault();
        windowEl.style.left = `${e.clientX - offsetX}px`;
        windowEl.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});

// Window Switching Logic
const taskbarItems = document.getElementsByClassName('taskbar-item');
const windowElems = document.getElementsByClassName('window');
for (let i = 0; i < taskbarItems.length; i++) {
    taskbarItems[i].addEventListener('click', function() {
        switchWindow(this)
    });
}
for (let i = 0; i < windowElems.length; i++) {
    windowElems[i].addEventListener('click', function() {
        switchWindow(this);
    });
}

function switchWindow(elem) {
    for (let i = 0; i < taskbarItems.length; i++) {
        const taskbarParent = taskbarItems[i].dataset.parent;
        const thisWindow = document.getElementById(taskbarParent);
        if (elem == taskbarItems[i] || elem.id == taskbarParent) {
            if (thisWindow != null) {
                thisWindow.className += ' window-active';
                taskbarItems[i].className += ' taskbar-active'
            }
        } else {
            if (thisWindow != null) {
                thisWindow.className = 'window glow draggable';
                taskbarItems[i].className = 'taskbar-item'
            }
        }
    }
}