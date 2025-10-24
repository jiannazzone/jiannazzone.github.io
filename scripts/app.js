// Window Buttons
const closeButtonElems = document.querySelectorAll('.window-closer');
const maxButtonElems = document.querySelectorAll('.window-max');
const minButtonElems = document.querySelectorAll('.window-min');
const toTaskbarButtonElems = document.querySelectorAll('.window-taskbar');

const taskbarItems = document.querySelectorAll('.taskbar-item');
const windowElems = document.querySelectorAll('.window');

const menuItems = document.querySelectorAll('.menu-item');

// Menu Selection Logic
menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', function(e) {
        switchWindow(menuItem);
    });
});

// Menu Toggling
const menuIcon = document.getElementById('menu-icon')
menuIcon.addEventListener('click', toggleMenu);
document.body.addEventListener('click', function(e) {
    if (menuIcon.className != 'menu-icon-active') return;

    if (e.target != menuIcon) {
        toggleMenu();
    }
})

function toggleMenu() {
    const menuElem = document.getElementById('start-menu');
    if (menuElem.classList.contains('menu-hidden')) {
        menuIcon.className = 'menu-icon-active'
        menuElem.className = 'menu glow';
    } else {
        menuIcon.className = '';
        menuElem.className = 'menu glow menu-hidden';
    }
}

// Window Switching Logic
taskbarItems.forEach((taskbarItem) => {
    taskbarItem.addEventListener('click', function(e) {
        switchWindow(taskbarItem)
    });
});
windowElems.forEach((windowElem) => {
    windowElem.addEventListener('click', function(e) {
        if (e.target.classList.contains('window-button') || e.target.classList.contains('window-button-img')) return;
        switchWindow(windowElem);
    });
});

function switchWindow(elem) {
    taskbarItems.forEach((taskbarItem) => {
        const taskbarParentID = taskbarItem.dataset.parent;
        const thisWindow = document.getElementById(taskbarParentID);

        // User has selected an item from the menu
        if (elem.classList.contains('menu-item')) {
            if (elem.dataset.parent == taskbarParentID) {
                showWindow(thisWindow, taskbarItem);
            } else {
                defocusWindow(thisWindow, taskbarItem);
            }
        
        // User has selected a taskbarItem or window
        } else if (elem == taskbarItem || elem.id == taskbarParentID) {
            // Make active window (if not already)
            if (!thisWindow.className.includes('window-active')){
                showWindow(thisWindow, taskbarItem);
            } // if
        } else {
            defocusWindow(thisWindow, taskbarItem);
        }
    });
}

function showWindow(windowElem, taskbarElem) {
    // Show window
    windowElem.className += ' window-active';
    windowElem.className = windowElem.className.replace('window-in-taskbar', '');
    windowElem.className = windowElem.className.replace('window-closed', '');

    // Make taskbar item active
    taskbarElem.className += ' taskbar-active'
    taskbarElem.className = taskbarElem.className.replace('taskbar-closed','');
} // showWindow

function defocusWindow(windowElem, taskbarElem) {
    if (windowElem == null || taskbarElem == null) return;
    windowElem.className = windowElem.className.replace('window-active', '');
    taskbarElem.className = taskbarElem.className.replace('taskbar-active');
} //defocusWindow

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
    windowElem.className = 'window glow draggable window-in-taskbar';

    taskbarItems.forEach((taskbarItem) =>{      
        if (!taskbarItem.classList.contains('taskbar-closed')) {
            taskbarItem.className = 'taskbar-item';
        }
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

// Privacy Policy Toggles
const privacyButtons = document.querySelectorAll('.privacy-button');
privacyButtons.forEach((button) => {
    button.addEventListener('click', function() {
        const privacyPolicy = document.getElementById(button.dataset.toggleTarget)
        
        if (privacyPolicy.classList.contains('privacy-policy-hidden')) {
            privacyPolicy.classList = 'privacy-policy';
        } else {
            privacyPolicy.className = 'privacy-policy privacy-policy-hidden';
        }
    })
});