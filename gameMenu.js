console.log('gameMenu.js started loading');
userInfo = JSON.parse(localStorage.getItem('userInfo_hangmanGame'));

// Dom elements
const menu_section = `
<section class="menu">
    <div class="menu__user center">
        <p class="menu__user--username" id="menu-user-username"></p>
        <img class="menu__user--avatar" id="menu-user-avatar" src="" alt="User avatar">
        <p class="menu__user--level" id="menu-user-level"></p>
        <img class="menu__user--edit" id="user-edit" src="./img/asset/edit.svg">
    </div>
</section>
`

// Variables

// Classes
class Game {
    constructor(){}
}

// Functions
const updateMenu_section = () => {
    menuUserUsername.innerHTML = userInfo.username;
    menuUserAvatar.setAttribute('src', `./img/character/${userInfo.avatar}.jpg`);
    menuUserLevel.innerHTML = `Level ${userInfo.level}`;
}

// Program
main.innerHTML = menu_section;
const menuUserEdit_img = document.getElementById('user-edit');

// User menu
const menuUserUsername = document.getElementById('menu-user-username');
const menuUserAvatar = document.getElementById('menu-user-avatar');
const menuUserLevel = document.getElementById('menu-user-level');
updateMenu_section();

// Edit userInfo
menuUserEdit_img.addEventListener('click', () => showPresentation_login('update'));