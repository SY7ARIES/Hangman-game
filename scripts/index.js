const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const maxGuesses = 9;
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const hintBtn = document.querySelector(".hint-text button");
const hintText = document.querySelector(".hint-text");
const hintTextB = document.querySelector(".hint-text b");

var correctSound = new Audio("sound-tracks/correct-sound.mp3");
var failSound = new Audio("sound-tracks/fail-sound.mp3");
var youLostSound = new Audio("sound-tracks/you-lost.mp3");
var youWonSound = new Audio("sound-tracks/you-won.mp3");
var hintBtnSound = new Audio("sound-tracks/hint-btn-sound.mp3");
var bgm = new Audio("sound-tracks/bgm.mp3");

bgm.play();

const restGame = () => {
    //ressetting all game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/stage-${wrongGuessCount + 1}.png`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.classList.remove("correctWord"));
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
    hintTextB.innerHTML = "";
    hintBtn.disabled = false;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
};

let currentWord, correctLetters = [], wrongGuessCount = 0;

//generate a random word and its hint
const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    hintBtn.addEventListener("click", e => {
        hintTextB.innerHTML = `: ${hint}`;
        hintBtn.disabled = true;
        hintBtnSound.play();
    });
    restGame();
}

const gameOver = (isVictory) => {
    //after 600ms of game completed, show modal with relevant details
    setTimeout(() => {
        const modalText = isVictory ? `You found the word: ` : `The correct word was: `;
        gameModal.querySelector("img").src = `${isVictory ? 'images/you-win' : 'images/game-over'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats !' : 'Game Over !'}`;
        isVictory ? youWonSound.play() : youLostSound.play();
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.querySelector("img").classList.add(`${isVictory ? `won` : `lost`}`);
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        //showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
                correctSound.play();
            }
        })
        button.classList.add("correctWord");
    }else{
        //if clicked letter doesn't exist then update the wrongGuessesCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/stage-${wrongGuessCount + 1}.png`;
        button.disabled = true;
        failSound.play();
    }

    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    
    //calling gameOver function of any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

//creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);
playAgainBtn.addEventListener("click", e => hintBtnSound.play());