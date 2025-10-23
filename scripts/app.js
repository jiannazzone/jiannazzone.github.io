// Window Buttons
const closeButtonElems = document.querySelectorAll('.window-closer');
const maxButtonElems = document.querySelectorAll('.window-max');
const minButtonElems = document.querySelectorAll('.window-min');
const toTaskbarButtonElems = document.querySelectorAll('.window-taskbar');

const taskbarItems = document.querySelectorAll('.taskbar-item');
const windowElems = document.querySelectorAll('.window');

// Window Switching Logic
taskbarItems.forEach((taskbarItem) => {
    taskbarItem.addEventListener('click', function(e) {
        // if (e.target.classList.includes('window-button')) return;
        switchWindow(taskbarItem)
    });
});
windowElems.forEach((windowElem) => {
    windowElem.addEventListener('click', function(e) {
        if (e.target.classList.includes('window-button')) return;
        switchWindow(windowElem)
    });
});

function switchWindow(elem) {
    taskbarItems.forEach((taskbarItem) => {
        const taskbarParentID = taskbarItem.dataset.parent;
        const thisWindow = document.getElementById(taskbarParentID);

        // We have identified the correct window and/or taskbar-item
        if (elem == taskbarItem || elem.id == taskbarParentID) {
            
            // Make active window (if not already)
            if (!thisWindow.className.includes('window-active')){
                thisWindow.className += ' window-active';
                thisWindow.className = thisWindow.className.replace('window-in-taskbar', '');
            }
            
            // Make active taskbar-item (if not already)
            if (!taskbarItem.className.includes('taskbar-active')) {
                taskbarItem.className += ' taskbar-active'
            }

        // This window and taskbar-item should NOT be active
        } else {
            if (thisWindow != null) {
                thisWindow.className = thisWindow.className.replace('window-active', '');
                taskbarItem.className = taskbarItem.className.replace('taskbar-active', '');
            }
        }
    });
}

// Close Windows
closeButtonElems.forEach((el) => {
    el.addEventListener('click', function() {
        closeWindow(el);
    });
});

function closeWindow(button) {
    const windowElem = document.getElementById(button.dataset.parent);
    windowElem.style.display = 'none';
    taskbarItems.forEach((el) =>{
        if (el.dataset.parent == windowElem.id) {
            el.style.display = 'none';
        }
    })
}

// Maximize Windows
maxButtonElems.forEach((el) => {
    el.addEventListener('click', function() {
        maximizeWindow(el);
    });
});

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
minButtonElems.forEach((el) => {
    el.addEventListener('click', function() {
        minimizeWindow(el)
    })
});

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

// Minimize to Taskbar
toTaskbarButtonElems.forEach((toTaskbarButton) => {
    toTaskbarButton.addEventListener('click', function() {
        reduceToTaskbar(toTaskbarButton);
    });
});

function reduceToTaskbar(button) {
    const windowElem = document.getElementById(button.dataset.parent);
    windowElem.className = windowElem.className.replace('window-active', '');
    windowElem.className += ' window-in-taskbar';

    taskbarItems.forEach((taskbarItem) =>{        
        taskbarItem.className = 'taskbar-item';
    });
}

// Window Dragging
document.querySelectorAll('.window-header').forEach(header => {
    const windowEl = header.closest('.window');
    let offsetX = 0, offsetY = 0, isDragging = false;

    header.addEventListener('pointerdown', e => {
        if (e.target.closest('.window-button')) return;
        if (!e.target.closest('.window').className.includes('draggable')) return;
        switchWindow(windowEl);

        isDragging = true;
        const rect = windowEl.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        windowEl.style.position = 'absolute';
    });

    document.addEventListener('pointermove', e => {
        if (!isDragging) return;
        e.preventDefault();
        windowEl.style.left = `${e.clientX - offsetX}px`;
        windowEl.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('pointerup', () => {
        isDragging = false;
    });
});