function focusWindow(windowElem) {
    windowElem.classList.add('window-active');
    windowElem.classList.remove('window-in-taskbar');
    windowElem.classList.remove('window-closed');

    // Find paired taskbar and focus it
    const taskbarElem = document.getElementById(`${windowElem.id}-taskbar`);
    taskbarElem.classList.add('taskbar-active');
    taskbarElem.classList.remove('taskbar-closed');
} // focusWindow

function defocusWindow(windowElem) {
    if (windowElem == null) return;
    const taskbarElem = document.getElementById(`${windowElem.id}-taskbar`);

    if (taskbarElem == null) return;
    windowElem.classList.remove('window-active');
    taskbarElem.classList.remove('taskbar-active');
} //defocusWindow

function switchWindow(windowID) {
    if (compactWindow) {
        windowElems.forEach((windowElem) => {
            if (windowElem.id == windowID) {
                focusWindow(windowElem);
                maximizeWindow(document.querySelector(`.window-max[data-parent=${windowID}`));
            } else {
                closeWindow(windowElem.id);
            }
        });
    } else {
        windowElems.forEach((windowElem) => {
            if (windowElem.id == windowID) {
                focusWindow(windowElem);
            } else {
                defocusWindow(windowElem);
            }
        });
    }
} // switchWindow

function closeWindow(windowID) {
    const windowElem = document.getElementById(windowID);
    const taskbarElem = document.querySelector(`.taskbar-item[data-parent=${windowID}]`);
    windowElem.className = 'window glow draggable window-closed';
    taskbarElem.className = 'taskbar-item taskbar-closed';
} // closeWindow

function maximizeWindow(button) {
    // Swap button visibility
    minButtonElems.forEach((el) => {
        if (el.dataset.parent == button.dataset.parent && !compactWindow) {
            el.className = 'window-min window-button';
        }
    });
    button.classList.add('window-button-hidden');

    // Adjust styles
    const windowElem = document.getElementById(button.dataset.parent);
    windowElems.forEach((el) => {
        if (el == windowElem) {
            focusWindow(el);
            windowElem.classList.add('window-max');
        } else {
            el.classList.remove('window-max');
            defocusWindow(el)
        }
    });
} // maximizeWindow

function reduceToTaskbar(button) {
    const windowElem = document.getElementById(button.dataset.parent);
    const taskbarItem = document.querySelector(`.taskbar-item[data-parent=${button.dataset.parent}`);
    windowElem.classList.add('window-in-taskbar');
    taskbarItem.className = 'taskbar-item';
} // reduceToTaskbar

function minimizeWindow(button) {
    // Swap button visibility
    maxButtonElems.forEach((el) => {
        if (el.dataset.parent == button.dataset.parent && !compactWindow) {
            el.className = 'window-max window-button';
        }
    });
    button.classList.add('window-button-hidden');

    // Adjust styles
    const windowElem = document.getElementById(button.dataset.parent);
    windowElem.className = 'window glow draggable window-active';
} // minimizeWindow