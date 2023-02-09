const scrambleLinks = document.querySelectorAll('.scramble');
const scrambleStatus = Array(scrambleLinks.length).fill(false);

scrambleLinks.forEach(link => {
    link.addEventListener('pointerover', function animateScramble(event) {
        const thisIndex = Array.from(scrambleLinks).indexOf(link)
        if (scrambleStatus[thisIndex] || event.pointerType != 'mouse') { return }
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let interval = null;
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return event.target.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 26)]
                })
                .join("");

            if (iteration >= event.target.dataset.value.length) {
                clearInterval(interval);
            }

            iteration += 1;
        }, 30);
        scrambleStatus[thisIndex] = true;
    });
});

const appScreenshots = document.getElementsByClassName('screenshot')
for (i = 0; i < appScreenshots.length; i++) {
    appScreenshots[i].style.animationDelay = (i*0.1 + 's');
}