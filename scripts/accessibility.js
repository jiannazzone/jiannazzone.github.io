const visualsCheckboxElem = document.getElementById('reduce-visuals-checkbox');

visualsCheckboxElem.addEventListener('change', (e) => {
    const root = document.documentElement;
    const glowElems = document.getElementsByClassName('glow');

    if (e.currentTarget.checked) {
        root.style.setProperty('--current-font', 'var(--safe-font)');

        // Remove all glows
        Array.from(glowElems).forEach((elem) => {
            elem.style.setProperty('box-shadow', 'none');
        });

    } else {
        root.style.setProperty('--current-font', 'var(--mono-font)');

        // Replace glows
        Array.from(glowElems).forEach((elem) => {
            elem.style.setProperty('box-shadow', '0 0 1rem -0.5rem var(--crt-glow)');
        });
    }

    displayClock();
})