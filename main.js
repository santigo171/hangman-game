// The hangman app. in this app:
// - play the hangman
// - create own hangman
// - save hangman games in local storage
// - share hangman games with django
// - choose avatar and username
// - Share with navigator.share({}) to other people

const main = document.getElementById('main');
const body = document.getElementById('body');

/*------- Dom elements -------*/ 
const presentation_login = document.createElement('div');
presentation_login.className += 'presentation__login-father', 'center';
presentation_login.setAttribute('id', 'presentation-login');
presentation_login.setAttribute('style', 'display: none;'); // <div class="presentation__login-father center" id="presentation-login" style="display: none;">
presentation_login.innerHTML = `
    <div class="presentation__login">
        <p class="presentation__login--p">Looks like is the first time you play...</p>
        <div class="presentation__login__form">
            <label for="username">Enter your name:</label>
            <input id="username-input" name="username" maxlength="25" type="text">
            <label>Select an avatar:</label>
            <div class="presentation__login__avatar" id="login-avatar-div"></div>
            <div id="avatar-error-message" class="presentation__login__error"> </div>
            <div class="center presentation__login--summit" id="presentation-login-summit">
                <p>Finished!</p>
            </div>
        </div>
    </div>
`

const presentation_section = `
<section class="presentation center">
    <div class="presentation__image">
        <img src="./img/principal.jpg" alt="A person being hanged.">
        <img id="img-hang" src="./img/character/1.jpg" alt="A person hanging another person.">
    </div>
    <div class="presentation__button center" id="presentation-button"><p>Let's play!</p></div>
</section>
`;

const gameMenu_script = document.createElement('script');
gameMenu_script.type = 'text/javascript';
gameMenu_script.src = './gameMenu.js';

/*------- Variables -------*/ 
var userInfo_localStorage = localStorage.getItem('userInfo_hangmanGame');

let iAnimate = 2;
const imgNumber = 45;
let continueAnimating = true;

let imgList = '<img onclick="avatarSelection(this)" id="presentation_img1" src="./img/character/1.jpg" alt="character" class="presentation__login__avatar--img">';
let avatar;

let userInfo = {};


/*------- Classes -------*/ 
class User {
    constructor(username, avatar, level) {
        this.username = username;
        this.avatar = avatar;
        this.level = level;
    }
}

/*------- Functions -------*/ 
const avatarSelection = (element) => {
    for(let i = 1; i <= imgNumber; i++) { //Erase the border of all img
        let img = document.getElementById(`presentation_img${i}`);
        img.style.border = '';
    }
    element.style.border = 'solid 3px red';
    avatar = element.getAttribute('id');
    avatar = avatar.charAt(16) + avatar.charAt(17) + avatar.charAt(18);
}

function showPresentation_login(createOrUpdate) {
    main.appendChild(presentation_login);
    const presentationLogin_div = document.getElementById('presentation-login');
    const presentationLoginAvatar_div = document.getElementById('login-avatar-div');
    const presentationLoginUsername_input = document.getElementById('username-input');
    const presentationLoginSummit = document.getElementById('presentation-login-summit');
    const presentationLoginError_div = document.getElementById('avatar-error-message');

    // Put all images into the presentationLoginAvatar_div    
    for(i = 2; i <= imgNumber; i++) {
        imgList = imgList + `<img onclick="avatarSelection(this)" id="presentation_img${i}" src="./img/character/${i}.jpg" alt="character" class="presentation__login__avatar--img">`;
    }
    presentationLoginAvatar_div.innerHTML = imgList;

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
            userInfo = new User(username, avatar, level);
            localStorage.setItem('userInfo_hangmanGame', JSON.stringify(userInfo));
            presentation_login.remove();
            if (createOrUpdate == 'update') {
                updateMenu_section();
            } else if (createOrUpdate == 'create') {
                body.appendChild(gameMenu_script);
            }
        }
        setTimeout(() => {
            presentationLoginError_div.innerHTML = "";
        }, 3000)
    })

    // Put the presentation login div visible
    continueAnimating = false;
    if (createOrUpdate == 'create') {
        console.log('showPresentation_login create section started')
        if (userInfo_localStorage == null) {
            level = 0.0;
            presentationLogin_div.style.display = 'grid';
        } else {
            body.appendChild(gameMenu_script);
        }
    } else if (createOrUpdate == 'update') {
        presentationLogin_div.style.display = 'grid';
        const presentationLogin_p = document.querySelector('.presentation__login--p');
        presentationLogin_p.innerText = 'Modify your username and you avatar!';

        presentationLoginUsername_input.value = userInfo.username;
        level = userInfo.level;
    }

}

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

/*------- Program -------*/ 
// Presentation
main.innerHTML = presentation_section;
const presentationButton_div = document.getElementById('presentation-button');
const presentation_img = document.getElementById('img-hang');

// When click the button put the log in window or change to the game menu.
presentationButton_div.addEventListener('click', _ => showPresentation_login('create'));

animatePresentation_img();