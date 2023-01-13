function isMobile() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return true;
    }else{
        return false;
    }
}

const menuItems = Array.from(document.getElementsByClassName('menu-item'));
menuItems.forEach(menuItem => {
    if (isMobile) {
        menuItem.addEventListener('touchend', () => mobileClick(menuItem));
        menuItem.style.pointerEvents = 'none';
    } else {
        menuItem.addEventListener('mouseover', () => menuHover(menuItem));
        menuItem.addEventListener('mouseout', () => menuExit(menuItem));
    }
});

const detailItems = document.getElementsByClassName('menu-image');

function mobileClick(menuItem) {
    const menuName = menuItem.innerHTML.toLowerCase();

}

function menuHover(menuItem) {
    const menuName = menuItem.innerHTML.toLowerCase();
    const menuImage = document.getElementById(menuName + '-image');
    menuImage.style.opacity = '100%';
    menuImage.style.display = 'block';
}

function menuExit(menuItem) {
    const menuName = menuItem.innerHTML.toLowerCase();
    const menuImage = document.getElementById(menuName + '-image');
    menuImage.style.opacity = '0%';
    menuImage.style.display = 'none';
}