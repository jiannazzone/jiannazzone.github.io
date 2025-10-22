const visualsCheckboxElem = document.getElementById('reduce-visuals-checkbox');
visualsCheckboxElem.addEventListener('change', (e) => {
    const root = document.documentElement;
    if (e.currentTarget.checked) {
        root.style.setProperty('--current-font', 'var(--safe-font)');
    } else {
        root.style.setProperty('--current-font', 'var(--mono-font)');
    }
})