// Window Buttons
const closeButtonElems = document.querySelectorAll('.window-closer');
const maxButtonElems = document.querySelectorAll('.window-max');
const minButtonElems = document.querySelectorAll('.window-min');
const toTaskbarButtonElems = document.querySelectorAll('.window-taskbar');

const taskbarItems = document.querySelectorAll('.taskbar-item');
const windowElems = document.querySelectorAll('.window');
const menuItems = document.querySelectorAll('.menu-item');

// Change layout for window sizing
let width = getWidth();
let compactWindow = getWidth() < 768;

onResize(function() {
    width = getWidth();
    if (width < 768) {
        maxButtonElems.forEach((button) => {
            button.classList.add('window-button-hidden');
        });
        toTaskbarButtonElems.forEach((button) => {
            button.classList.add('window-button-hidden');
        });

        if (compactWindow) return;
        windowElems.forEach((windowElem) => {
            if (windowElem.classList.contains('window-active')) {
                maximizeWindow(document.querySelector(`.window-max[data-parent=${windowElem.id}`));
            } else {
                closeWindow(windowElem.id);
            }
        });
        compactWindow = true;
    } else {
        if (!compactWindow) return;
        minButtonElems.forEach((button) => {
            button.classList = button.classList.remove('window-button-hidden');
        });
        toTaskbarButtonElems.forEach((button) => {
            button.classList = button.classList.remove('window-button-hidden');
        });
        compactWindow = false
    }
})(); // onResize

function onResize(c, t) {
    onresize = function () {
        clearTimeout(t);
        t = setTimeout(c, 100);
    };
    return c
} // onResize

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
} // getWidth

// App routing for incoming URLs
function parseURL() {
    const incomingURL = window.location.href;
    const destinations = incomingURL.split('#').splice(1);
    if (destinations.length == 0 && compactWindow) {
        maximizeWindow(document.querySelector('.window-max[data-parent=welcome-window'));
    }

    let delay = 500;
    let count = 0;
    let skipRemaining = false;
    destinations.forEach((destination) => {
        if (!skipRemaining) {
            setTimeout(function () {
                switchWindow(`${destination}-window`);
                if (compactWindow) {
                    skipRemaining = true;
                }
            }, delay * count);
            count++;
        }
    });
} // parseURL

parseURL();

// Menu Selection Logic
menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', function () {
        switchWindow(menuItem.dataset.parent);
        toggleMenu();
    });
});

// Menu Toggling
const menuIcon = document.getElementById('menu-icon')
menuIcon.addEventListener('click', toggleMenu);
document.body.addEventListener('click', function (e) {
    if (menuIcon.className != 'menu-icon-active') return;

    if (e.target != menuIcon) {
        toggleMenu();
    }
})

function toggleMenu() {
    const menuElem = document.getElementById('start-menu');
    menuElem.classList.toggle('menu-hidden');
}

taskbarItems.forEach((taskbarItem) => {
    taskbarItem.addEventListener('click', function () {
        switchWindow(taskbarItem.dataset.parent);
    });
});

windowElems.forEach((windowElem) => {
    windowElem.addEventListener('click', function (e) {
        if (e.currentTarget.classList.contains('window-button') || e.target.classList.contains('window-button-img')) return;
        switchWindow(windowElem.id);
    });
});

// Close Windows
closeButtonElems.forEach((el) => {
    el.addEventListener('click', function(e) {
        e.stopPropagation();
        closeWindow(el.dataset.parent);
    });
});

// Maximize Windows
maxButtonElems.forEach((el) => {
    el.addEventListener('click', function (e) {
        e.stopPropagation();
        maximizeWindow(el);
    });
});

// Minimize Windows
minButtonElems.forEach((el) => {
    el.addEventListener('click', function (e) {
        e.stopPropagation();
        minimizeWindow(el)
    })
});

// Minimize to Taskbar
toTaskbarButtonElems.forEach((toTaskbarButton) => {
    toTaskbarButton.addEventListener('click', function (e) {
        e.stopPropagation();
        reduceToTaskbar(toTaskbarButton);
    });
});

// Window Dragging
document.querySelectorAll('.window-header').forEach(header => {
    const windowElem = header.closest('.window');
    let offsetX = 0, offsetY = 0, isDragging = false;

    header.addEventListener('pointerdown', e => {
        if (e.target.closest('.window-button')) return;
        if (!e.target.closest('.window').classList.contains('draggable')) return;
        switchWindow(windowElem.id);

        isDragging = true;
        const rect = windowElem.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        windowElem.style.position = 'absolute';
    });

    document.addEventListener('pointermove', e => {
        if (!isDragging) return;
        e.preventDefault();
        windowElem.style.left = `${e.clientX - offsetX}px`;
        windowElem.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('pointerup', () => {
        isDragging = false;
    });
});

// Privacy Policy Toggles
const privacyButtons = document.querySelectorAll('.privacy-button');
privacyButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const privacyPolicy = document.getElementById(button.dataset.toggleTarget)
        privacyPolicy.classList.toggle('privacy-policy-hidden');
    })
});