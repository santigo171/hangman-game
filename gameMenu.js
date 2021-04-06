console.log('gameMenu.js started loading');
userInfo = JSON.parse(localStorage.getItem('userInfo_hangmanGame'));

// Dom elements
const menu_section = `
<section class="menu">
    <div class="menu__user center">
        <p class="menu__user--username">${userInfo.username}</p>
        <img class="menu__user--avatar" src="./img/character/${userInfo.avatar}.jpg" alt="User avatar">
        <p class="menu__user--level">Level ${userInfo.level}</p>
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
    const menu_section = `
    <section class="menu">
        <div class="menu__user center">
            <p class="menu__user--username">${userInfo.username}</p>
            <img class="menu__user--avatar" src="./img/character/${userInfo.avatar}.jpg" alt="User avatar">
            <p class="menu__user--level">Level ${userInfo.level}</p>
            <img class="menu__user--edit" id="user-edit" src="./img/asset/edit.svg">
        </div>
    </section>
    `
    main.innerHTML = menu_section;
}

// Program
main.innerHTML = menu_section;
const menuUserEdit_img = document.getElementById('user-edit');
menuUserEdit_img.addEventListener('click', _ => showPresentation_login('update'));