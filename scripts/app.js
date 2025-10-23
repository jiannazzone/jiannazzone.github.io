// Get all windows and add event listeners to the X
const closeButtonElems = document.querySelectorAll('.window-closer');
const maxButtonElems = document.querySelectorAll('.window-max');
const minButtonElems = document.querySelectorAll('.window-min');

closeButtonElems.forEach((el) => {
    el.addEventListener('click', function () {
        const windowElem = document.getElementById(el.dataset.parent);
        closeWindow(windowElem);
    });
});

maxButtonElems.forEach((el) => {
    el.addEventListener('click', function() {
        maximizeWindow(el);
    });
});

// Maximize Windows
function maximizeWindow(button) {

    // Swap button visibility
    minButtonElems.forEach((el) => {
        if (el.dataset.parent == button.dataset.parent) {
            el.className = 'window-min window-button';
        }
    });
    button.className += ' window-button-hidden';

    // Adjust styles
    const windowElem = document.getElementById(button.dataset.parent);
    windowElem.className = 'window glow window-max';
}

// Minimize Windows
for (let i = 0; i < minButtonElems.length; i++) {
    minButtonElems[i].addEventListener('click', function () {
        minimizeWindow(minButtonElems[i]);
    });
}

function minimizeWindow(button) {

    // Swap button visibility
    maxButtonElems.forEach((el) => {
        if (el.dataset.parent == button.dataset.parent) {
            el.className = 'window-max window-button';
        }
    });
    button.className += ' window-button-hidden';

    // Adjust styles
    const windowElem = document.getElementById(button.dataset.parent);
    windowElem.className = 'window glow draggable';
}

function closeWindow(windowElem) {
    windowElem.style.scale = '0';
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