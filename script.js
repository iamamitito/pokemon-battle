const body = document.querySelector('body');

/* Pokémon */
const charmander = document.querySelector('#charmander');
const squirtle = document.querySelector('#squirtle')
const bulbasaur = document.querySelector('#bulbasaur');
const pikachu = document.querySelector('#pikachu');

/* Divs that contain the progress of player and computer */
const playerHP = document.querySelector('#player-hp');
const computerHP = document.querySelector('#computer-hp');

/* Divs that contain the pokemon the player can choose */
const optionsContainer = document.querySelector('.options-container');
const userOptions = document.querySelector('option');


/* Divs that display player and computer's choices */
const userChoice = document.querySelector('#userChoice');
const computerChoice = document.querySelector('#computerChoice');
const choicesContainer = document.querySelector('.choices');

const result = document.querySelector('#result');
const audio = document.querySelector('.sound');
const muteButton = document.querySelector('.mute-button');
let userImg = document.createElement('img');
let computerImg = document.createElement('img');
let battleDescription = document.createElement('p');
let button = document.createElement('button');
let userOption = document.createElement('span');
let computerOption = document.createElement('span');


/* pikachu is not available to use until the user gets 5 points */
pikachu.style.display = 'none';

/* Pikachu is displayed after the user is "half winning" */
function showPikachu() {
    if (computerHP.value <= 50) {
        pikachu.style.display = 'block';
    }
}


battleDescription.textContent = "Start the battle! Choose your pokémon!";

function computerPlay() {
    const options = ["fire", "water", "grass", "electric"];
    return options[Math.floor(Math.random() * options.length)];
}


function showUserOption(optionId) {
    userOption.textContent = "You";
    if (optionId === 'charmander') {
        userImg.src = 'img/usercharmander.png';
        userImg.width = "100";

    } else if (optionId === 'squirtle') {
        userImg.src = 'img/usersquirtle.png';
        userImg.width = "100";


    } else if (optionId === 'pikachu') {
        userImg.src = 'img/userpikachu.png';
        userImg.width = "100";

    } else {
        userImg.src = 'img/userbulbasaur.png';
        userImg.width = "100";
    }
}

function showComputerOption(computerSelection) {
    computerOption.textContent = "Computer";
    if (computerSelection === 'fire') {
        computerImg.src = 'img/computercharmander.png';
        computerImg.width = "45";

    } else if (computerSelection === 'water') {
        computerImg.src = 'img/computersquirtle.png';
        computerImg.width = "45";

    } else if (computerSelection === 'electric') {
        computerImg.src = 'img/computerpikachu.png';
        computerImg.width = "45";

    } else {
        computerImg.src = 'img/computerbulbasaur.png';
        computerImg.width = "45";
    }

}
function restartGame() {
    battleDescription.textContent = "Start the battle! Choose your pokémon!";
    result.removeChild(button);
    userOption.textContent = "";
    computerOption.textContent = "";
    userImg.src = '';
    computerImg.src = '';
    optionsContainer.style.visibility = 'visible';
    pikachu.style.display = 'none';
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 1;
    playerHP.value = 100;
    computerHP.value = 100;
}

function scoreTracker() {
    if (computerHP.value === 0) {
        button.textContent = "Battle again!"
        result.appendChild(button);
        optionsContainer.style.visibility = 'hidden';
        button.addEventListener("click", function () {
            restartGame()
        })
    } else if (playerHP.value === 0) {
        button.textContent = "Battle again!"
        result.appendChild(button);
        optionsContainer.style.visibility = 'hidden';
        button.addEventListener("click", function () {
            restartGame()
        })
    } else {
        return;
    }
}


function playRound(playerSelection, computerSelection, optionId) {
    if (computerSelection === playerSelection) {
        battleDescription.textContent = `It's a tie! You both chose ${optionId}`;
        showUserOption(optionId);
        showComputerOption(computerSelection);

    } else if (playerSelection === "fire" && computerSelection === "grass" || playerSelection === "water" && computerSelection === "fire" || playerSelection === "grass" && computerSelection === "water") {
        battleDescription.textContent = `You win! ${playerSelection.substring(0, 1).toUpperCase() + playerSelection.substring(1).toLowerCase()} beats ${computerSelection}`;
        showUserOption(optionId);
        showComputerOption(computerSelection);
        computerHP.value -= 10;
        scoreTracker();

    } else if (playerSelection === "electric" && computerSelection === "fire" || playerSelection === "fire" && computerSelection === "electric") {
        battleDescription.textContent = `It's a tie! ${playerSelection.substring(0, 1).toUpperCase() + playerSelection.substring(1).toLowerCase()} does NOT beat ${computerSelection}`;
        showUserOption(optionId);
        showComputerOption(computerSelection);

    } else if (playerSelection === "electric" && computerSelection === "water" || playerSelection === "grass" && computerSelection === "electric") {
        battleDescription.textContent = `You win! ${playerSelection.substring(0, 1).toUpperCase() + playerSelection.substring(1).toLowerCase()} beats ${computerSelection}`;
        showUserOption(optionId);
        showComputerOption(computerSelection);
        computerHP.value -= 10;
        scoreTracker();

    } else if (playerSelection === "electric" && computerSelection === "grass" || playerSelection === "water" && computerSelection === "electric") {
        battleDescription.textContent = `You lose! ${computerSelection.substring(0, 1).toUpperCase() + computerSelection.substring(1).toLowerCase()} beats ${playerSelection}`;
        showUserOption(optionId);
        showComputerOption(computerSelection);
        playerHP.value -= 10;
        scoreTracker();

    } else {
        battleDescription.textContent = `You lose! ${computerSelection.substring(0, 1).toUpperCase() + computerSelection.substring(1).toLowerCase()} beats ${playerSelection}`;
        showUserOption(optionId);
        showComputerOption(computerSelection);
        playerHP.value -= 10;
        scoreTracker();
    }
    showPikachu();
}

function startSound() {
    if (!audio) return;
    audio.play();
}

function muteSound() {
    audio.volume = 0;
}


charmander.addEventListener('click', function () {
    playRound("fire", computerPlay(), this.id)
});
squirtle.addEventListener('click', function () {
    playRound("water", computerPlay(), this.id)
});
bulbasaur.addEventListener('click', function () {
    playRound("grass", computerPlay(), this.id)
});
pikachu.addEventListener('click', function () {
    playRound("electric", computerPlay(), this.id)
});
charmander.addEventListener("click", startSound);
squirtle.addEventListener("click", startSound);
bulbasaur.addEventListener("click", startSound);
muteButton.addEventListener("click", muteSound);

result.appendChild(battleDescription);
userChoice.appendChild(userOption);
userChoice.appendChild(userImg);
computerChoice.appendChild(computerOption);
computerChoice.appendChild(computerImg);


