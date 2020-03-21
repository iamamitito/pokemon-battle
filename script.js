const body = document.querySelector('body');

/* Pokémon */
const charmander = document.querySelector('#charmander');
const squirtle = document.querySelector('#squirtle')
const bulbasaur = document.querySelector('#bulbasaur');
const pikachu = document.querySelector('#pikachu');
const articuno = document.querySelector('#articuno');
const onix = document.querySelector('#onix');

/* Divs that contain the progress of player and computer */
const playerHP = document.querySelector('#player-hp');
const computerHP = document.querySelector('#computer-hp');

/* Divs that contain the pokemon the player can choose */
const optionsContainer = document.querySelector('.options-container');
const userOptions = document.querySelector('option');

/* Divs that display player and computer's choices in battle */
const userChoice = document.querySelector('#userChoice');
const computerChoice = document.querySelector('#computerChoice');
const choicesContainer = document.querySelector('.choices');

const result = document.querySelector('#result');
const audio = document.querySelector('.sound');
const muteButton = document.querySelector('.mute-button');
const muteIcon = document.querySelector('.mute-icon');
const userImg = document.createElement('img');
const computerImg = document.createElement('img');
const button = document.createElement('button');

let userOption = document.createElement('span');
let computerOption = document.createElement('span');
let battleDescription = document.createElement('p');
let finalMessage = document.querySelector('.final-message');

/* pikachu, articuno and onix are not available to use */
pikachu.style.display = 'none';
articuno.style.display = 'none';
onix.style.display = 'none';

/* Pikachu is displayed after the computer loses 50 points */
function showPikachu() {
    if (computerHP.value <= 150) {
        pikachu.style.display = 'block';
    }
}

/* Articuno is displayed after the computer loses 100 points */
function showArticuno() {
    if (computerHP.value <= 100) {
        articuno.style.display = 'block';
    }
}

/* Onix is displayed after the computer loses 150 points */
function showOnix() {
    if (computerHP.value <= 50) {
        onix.style.display = 'block';
    }
}

battleDescription.textContent = "Start the battle! Choose your pokémon!";

function computerPlay() {
    const options = ["fire", "water", "grass", "electric", "ice", "rock"];
    return options[Math.floor(Math.random() * options.length)];
}

function showUserOption(optionId) {
    userOption.textContent = "You";
    if (optionId === 'charmander') {
        userImg.src = 'img/usercharmander.png';
        userImg.width = "90";

    } else if (optionId === 'squirtle') {
        userImg.src = 'img/usersquirtle.png';
        userImg.width = "90";

    } else if (optionId === 'pikachu') {
        userImg.src = 'img/userpikachu.png';
        userImg.width = "90";

    } else if (optionId === 'articuno') {
        userImg.src = 'img/userarticuno.png';
        userImg.width = "110";

    } else if (optionId === 'onix') {
        userImg.src = 'img/useronix.png';
        userImg.width = "120";

    } else {
        userImg.src = 'img/userbulbasaur.png';
        userImg.width = "90";
    }
}

function showComputerOption(computerSelection) {
    computerOption.textContent = "Computer";
    if (computerSelection === 'fire') {
        computerImg.src = 'img/computercharmander.png';
        computerImg.width = "40";

    } else if (computerSelection === 'water') {
        computerImg.src = 'img/computersquirtle.png';
        computerImg.width = "40";

    } else if (computerSelection === 'electric') {
        computerImg.src = 'img/computerpikachu.png';
        computerImg.width = "40";

    } else if (computerSelection === 'ice') {
        computerImg.src = 'img/computerarticuno.png';
        computerImg.width = "55";

    } else if (computerSelection === 'rock') {
        computerImg.src = 'img/computeronix.png';
        computerImg.width = "55";

    }else {
        computerImg.src = 'img/computerbulbasaur.png';
        computerImg.width = "40";
    }

}
function restartGame() {
    battleDescription.textContent = "Start the battle! Choose your pokémon!";
    result.removeChild(button);
    userOption.textContent = '';
    computerOption.textContent = '';
    userImg.src = '';
    computerImg.src = '';
    optionsContainer.style.visibility = 'visible';
    choicesContainer.style.display = 'flex';
    pikachu.style.display = 'none';
    articuno.style.display = 'none';
    onix.style.display = 'none';
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 1;
    playerHP.value = 200;
    computerHP.value = 200;
    finalMessage.textContent = '';
}

function scoreTracker() {
    if (computerHP.value === 0) {
        button.textContent = 'Battle again?';
        result.appendChild(button);
        optionsContainer.style.visibility = 'hidden';
        choicesContainer.style.display = 'none';
        battleDescription.textContent = '';
        finalMessage.textContent = 'Congratulations! You are a great trainer!';
        button.addEventListener("click", function () {
            restartGame()
        })
    } else if (playerHP.value === 0) {
        button.textContent = 'Battle again?';
        result.appendChild(button);
        optionsContainer.style.visibility = 'hidden';
        choicesContainer.style.display = 'none';
        battleDescription.textContent = 'You lost the battle... Maybe next time.';
        button.addEventListener("click", function () {
            restartGame()
        })
    } else {
        return;
    }
}

function playRound(playerSelection, computerSelection, optionId) {
    switch (playerSelection + computerSelection) {
        case 'firegrass':
        case 'waterfire':
        case 'grasswater':
        case 'electricwater':
        case 'grasselectric':
        case 'icegrass':
        case 'fireice':
        case 'rockice':
        case 'rockfire':
        case 'waterrock':
        case 'grassrock':
            battleDescription.textContent = `You win! ${playerSelection.substring(0, 1).toUpperCase() + playerSelection.substring(1).toLowerCase()} beats ${computerSelection}`;
            showUserOption(optionId);
            showComputerOption(computerSelection);
            computerHP.value -= 10;
            scoreTracker();
            break;
        case 'grassfire':
        case 'firewater':
        case 'watergrass':
        case 'waterelectric':
        case 'electricgrass':
        case 'grassice':
        case 'icefire':
        case 'rockwater':
        case 'firerock':
        case 'rockgrass':
            battleDescription.textContent = `You lose! ${computerSelection.substring(0, 1).toUpperCase() + computerSelection.substring(1).toLowerCase()} beats ${playerSelection}`;
            showUserOption(optionId);
            showComputerOption(computerSelection);
            playerHP.value -= 10;
            scoreTracker();
            break;
        case 'grassgrass':
        case 'firefire':
        case 'waterwater':
        case 'electricelectric':
        case 'iceice':
        case 'rockrock':
            battleDescription.textContent = `It's a tie! You both chose ${optionId}`;
            showUserOption(optionId);
            showComputerOption(computerSelection);
            break;
        case 'electricfire':
        case 'fireelectric':
        case 'iceelectric':
        case 'electricice':
        case 'icewater':
        case 'waterice':
        case 'rockelectric':
        case 'electricrock':
        case 'icerock':   
            battleDescription.textContent = `${playerSelection.substring(0, 1).toUpperCase() + playerSelection.substring(1).toLowerCase()} doesn't beat ${computerSelection}!`;
            showUserOption(optionId);
            showComputerOption(computerSelection);
            break;
    }
    showPikachu();
    showArticuno();
    showOnix();
}

function startSound() {
    if (!audio) return;
    audio.play();
}

function muteSound() {
    audio.muted = !audio.muted;
    if (audio.muted == true) {
        muteIcon.src = 'img/unmute.png';
    } else {
        muteIcon.src = 'img/mute.png';
    }
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
articuno.addEventListener('click', function () {
    playRound("ice", computerPlay(), this.id)
});
onix.addEventListener('click', function () {
    playRound("rock", computerPlay(), this.id)
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


