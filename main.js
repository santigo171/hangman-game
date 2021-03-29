// The hangman app. in this app:
// - play the hangman
// - create own hangman
// - save hangman games in local storage
// - share hangman games with django
// - choose avatar and username

const main = document.getElementById('main');

// Messages
const presentation_section = `
<div class="presentation__login-father center" id="presentation-login" style="display: none;">
    <div class="presentation__login">
        <p class="presentation__login--p">Looks like is the first time you play...</p>
        <div class="presentation__login__form">
            <label for="username">Enter your name:</label>
            <input id="username-input" name="username" maxlength="20" type="text">
            <label>Select an avatar:</label>
            <div class="presentation__login__avatar" id="login-avatar-div"></div>
            <div id="avatar-error-message" class="presentation__login__error"> </div>
            <div class="center presentation__login--summit" id="presentation-login-summit">
                <p>Finished!</p>
            </div>
        </div>
    </div>
</div>
<section class="presentation center">
    <div class="presentation__image">
        <img src="./img/principal.jpg" alt="A person being hanged.">
        <img id="img-hang" src="./img/character/1.jpg" alt="A person hanging another person.">
    </div>
    <div class="presentation__button center" id="presentation-button"><p>Let's play!</p></div>
</section>
`;

const menu_section = `
<h1 class="center">hola <span id="h1-username"></span></h1>
`

// Variables
let iAnimate = 2;
const imgNumber = 45;
let continueAnimating = true;

let imgList = '<img id="presentation_img1" src="./img/character/1.jpg" alt="character" class="presentation__login__avatar--img">';
let avatar;

let userInfo = {};


// Classes:
class User {
    constructor(username, avatar, level) {
        this.username = username;
        this.avatar = avatar;
        this.level = level;
    }
}

// Functions:
function animatePresentation_img() {
    setTimeout(() => {
        if (iAnimate == imgNumber + 1) {
            iAnimate = 1;
        }
        presentation_img.setAttribute("src", `./img/character/${iAnimate}.jpg`);
        presentation_img.style.top = '-7px';
        setTimeout(() => {
            presentation_img.style.top = '0px';
            iAnimate++;
            if (continueAnimating == true) {
                window.requestAnimationFrame(animatePresentation_img);
            }
        }, 100);
    }, 300);
}

// Presentation
main.innerHTML = presentation_section;
const presentationButton_div = document.getElementById('presentation-button');
const presentation_img = document.getElementById('img-hang');
const presentationLogin_div = document.getElementById('presentation-login');
const presentationLoginAvatar_div = document.getElementById('login-avatar-div');
const presentationLoginUsername_input = document.getElementById('username-input');
const presentationLoginSummit = document.getElementById('presentation-login-summit');
const presentationLoginError_div = document.getElementById('avatar-error-message');

// Put all images into the presentationLoginAvatar_div
for(i = 2; i <= imgNumber; i++) {
    imgList = imgList + `<img id="presentation_img${i}" src="./img/character/${i}.jpg" alt="character" class="presentation__login__avatar--img">`;
}
presentationLoginAvatar_div.innerHTML = imgList;

// Every image now have an add event listener
for(let i = 1; i <= imgNumber; i++) {
    let img = document.getElementById(`presentation_img${i}`);
    img.addEventListener('click', (e) => {
        for(let i = 1; i <= imgNumber; i++) { // Erase the border of all img
            let img = document.getElementById(`presentation_img${i}`);
            img.style.border = ''
        }
        let element = e.path[0];
        element.style.border = 'solid 3px red';
        avatar = element;
    })
}

// When click the button put the log in window
presentationButton_div.addEventListener('click', _ => {
    presentationLogin_div.style.display = 'grid';
    continueAnimating = false;
});

// Add event listener for the summit button in the login
presentationLoginSummit.addEventListener('click', _ => {
    let username = presentationLoginUsername_input.value;
    username = username.trim();

    if (username == '' || username == ' ') {
        presentationLoginError_div.innerHTML = `Please enter a username.`
    } else if (username.includes('<') || username.includes('<')) {
        presentationLoginError_div.innerHTML = `You can't use "<" or ">" in your username.`
    } else if (avatar == undefined) {
        presentationLoginError_div.innerHTML = `Please select an avatar.`
    } else {
        userInfo = new User(username, avatar, 0.0);
        main.innerHTML = menu_section;
        const usernameOutput_h1 = document.getElementById('h1-username');
        usernameOutput_h1.innerHTML = userInfo.username;
    }
    setTimeout(() => {
        presentationLoginError_div.innerHTML = "";
    }, 3000)
})

animatePresentation_img();