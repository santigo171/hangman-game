// Dom elements
const menu_section = `
<h1 class="center">Username: <span id="h1-username"></span></h1>
<p>Avatar: </p>
<div class="center" id="div-avatar"></div>
`

// Variables

// Classes
class Game {
    constructor(){}
}

// Functions

// Program
main.innerHTML = menu_section;

const usernameOutput_h1 = document.getElementById('h1-username');
const avatarOutput_div = document.getElementById('div-avatar');

usernameOutput_h1.innerHTML = userInfo.username;
avatarOutput_div.appendChild(userInfo.avatar);