// The hangman app. in this app:
// - play the hangman
// - create own hangman
// - save hangman games in local storage
// - share hangman games with django

// const changePerson_img = () => {new Promise((resolve, reject) => {
//     setTimeout(() => {
//         (true)
//             ? resolve(() => {
//                 if (i == 17) {
//                     i = 0;
//                 } else {
//                     console.log('pichula')
//                     persentation_img.setAttribute("src", `i${i}.jpg`);
//                     i++;
//                 }
//             })
//             : reject(new Error('There was an error'))
//     }, 700)
// })
// };

const presentationButton_div = document.getElementById('presentation-button');
const presentation_img = document.getElementById('img-hang');

const presentation = ``;

let currentStage_dom = "presentation";
let i = 2;

// Functions:

function animatePresentation_img() {
    setTimeout(() => {
        if (i == 18) {
            i = 1;
        }
        presentation_img.setAttribute("src", `./img/${i}.jpg`);
        i++;
        window.requestAnimationFrame(animatePresentation_img);
    }, 500)
}

// Program

animatePresentation_img();