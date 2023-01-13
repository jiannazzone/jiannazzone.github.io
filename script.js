const menuItems = Array.from(document.getElementsByClassName('menu-item'));
menuItems.forEach(menuItem => {
    menuItem.addEventListener('mouseover', () => menuHover(menuItem));
    menuItem.addEventListener('mouseout', () => menuExit(menuItem));
});

const detailItems = document.getElementsByClassName('menu-image');

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