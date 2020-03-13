const body = document.querySelector('body');
const charmander = document.querySelector('#charmander');
const squirtle = document.querySelector('#squirtle')
const bulbasaur = document.querySelector('#bulbasaur');
const pikachu = document.querySelector('#pikachu');
const optionsContainer = document.querySelector('.options-container');
const userOptions = document.querySelector('option');
const resultsContainer = document.querySelector('.results-container')
const result = document.querySelector('#result');
const scores = document.querySelector('#scores');
const userChoice = document.querySelector('#userChoice');
const computerChoice = document.querySelector('#computerChoice');
const choicesContainer = document.querySelector('.choices');
let userImg = document.createElement('img');
let computerImg = document.createElement('img'); 
let para = document.createElement('p');
let para2 = document.createElement('p');
let button = document.createElement('button');
let userOption = document.createElement('span');
let computerOption = document.createElement('span');
let playerScore = 0;
let computerScore = 0;

/* pikachu is not available to use until the user gets 5 points */
pikachu.style.display= 'none';

/* Styles also change when pikachu is displayed */
function showPikachu() {
    if (playerScore >= 5) {
        pikachu.style.display= 'block';
        body.style.backgroundColor = '#d7acec';
        resultsContainer.style.backgroundColor = '#6355b3';
    }
}



para.textContent = "Start the battle! Choose your pokémon!";
para2.textContent = "You: 0 Computer: 0";

function computerPlay() {
    const options = ["fire", "water", "grass", "electric"];
    return options[Math.floor(Math.random() * options.length)];
}


function showUserOption(optionId){
    userOption.textContent = "You";
    if (optionId === 'charmander') {
        userImg.src = 'img/charmander.png';
        userImg.width = "80";

    } else if (optionId === 'squirtle'){
        userImg.src = 'img/squirtle.png';
        userImg.width = "80"; 

    } else if (optionId === 'pikachu'){
        userImg.src = 'img/pikachu.png';
        userImg.width = "75"; 

    }else {
        userImg.src = 'img/bulbasaur.png';
        userImg.width = "80"; 
    }
}

function showComputerOption(computerSelection){
    computerOption.textContent = "Computer";
    if (computerSelection === 'fire') {
        computerImg.src = 'img/charmander.png';
        computerImg.width = "80";

    } else if (computerSelection === 'water'){
        computerImg.src = 'img/squirtle.png';
        computerImg.width = "80"; 

    } else if (computerSelection === 'electric'){
        computerImg.src = 'img/pikachu.png';
        computerImg.width = "75"; 

    } else {
        computerImg.src = 'img/bulbasaur.png';
        computerImg.width = "80"; 
    }

}
function restartGame() {
    playerScore = 0;
    computerScore = 0;
    para.textContent = "Start the battle! Choose your pokémon!";
    para2.textContent = "You: 0 Computer: 0";
    result.removeChild(button);
    userOption.textContent = "";
    computerOption.textContent = "";
    userImg.src = '';
    computerImg.src = '';
    optionsContainer.style.display= 'flex';
    choicesContainer.style.display= 'flex';
    pikachu.style.display= 'none';
    body.style.backgroundColor = 'skyblue';
    resultsContainer.style.backgroundColor = 'green';  
}

function scoreTracker() {
    if (playerScore >= 10) {
        para.textContent = "Congrats! You're a great trainer!";
        button.textContent = "Restart game"
        result.appendChild(button);
        optionsContainer.style.display= 'none';
        choicesContainer.style.display= 'none';
        button.addEventListener("click", function(){
            restartGame()
          })
    } else if (computerScore >= 10) {
        para.textContent = "You're not such a good trainer, are you?";
        button.textContent = "Restart game"
        result.appendChild(button);
        optionsContainer.style.display= 'none';
        choicesContainer.style.display= 'none';
        button.addEventListener("click", function(){
            restartGame()
          })
    } else {
        return;
    }
}


function playRound(playerSelection, computerSelection, optionId){
        if (computerSelection === playerSelection) {
            para.textContent = `It's a tie, you both chose ${optionId}`;
            para2.textContent = `You: ${playerScore} Computer: ${computerScore}`;
            showUserOption(optionId);
            showComputerOption(computerSelection);

        } else if (playerSelection === "fire" && computerSelection === "grass" || playerSelection === "water" && computerSelection === "fire" || playerSelection === "grass" && computerSelection === "water") {
            para.textContent = `You win! ${playerSelection} beats ${computerSelection}`;
            playerScore++;
            para2.textContent = `You: ${playerScore} Computer: ${computerScore}`;
            showUserOption(optionId);
            showComputerOption(computerSelection);
            scoreTracker();

        } else if (playerSelection === "electric" && computerSelection === "fire" || playerSelection === "fire" && computerSelection === "electric") {
            para.textContent = `It's a tie, ${playerSelection} does NOT beat ${computerSelection}`;
            para2.textContent = `You: ${playerScore} Computer: ${computerScore}`;
            showUserOption(optionId);
            showComputerOption(computerSelection);

        } else if (playerSelection === "electric" && computerSelection === "water" || playerSelection === "grass" && computerSelection === "electric") {
            para.textContent = `You win! ${playerSelection} beats ${computerSelection}`;
            playerScore ++;
            para2.textContent = `You: ${playerScore} Computer: ${computerScore}`;
            showUserOption(optionId);
            showComputerOption(computerSelection);
            scoreTracker();

        } else if (playerSelection === "electric" && computerSelection === "grass" || playerSelection === "water" && computerSelection === "electric" ) {
            para.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
            computerScore ++;
            para2.textContent = `You: ${playerScore} Computer: ${computerScore}`;
            showUserOption(optionId);
            showComputerOption(computerSelection);
            scoreTracker();

        }else {
            para.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
            computerScore++;
            para2.textContent = `You: ${playerScore} Computer: ${computerScore}`;
            showUserOption(optionId);
            showComputerOption(computerSelection);
            scoreTracker();
        }
    showPikachu();
}


charmander.addEventListener('click', function(){
    playRound("fire", computerPlay(), this.id)
  });
squirtle.addEventListener('click', function(){
    playRound("water", computerPlay(), this.id)
  });
bulbasaur.addEventListener('click', function(){
    playRound("grass", computerPlay(), this.id)
  });
pikachu.addEventListener('click', function(){
    playRound("electric", computerPlay(), this.id)
});

  result.appendChild(para);
  scores.appendChild(para2);
  userChoice.appendChild(userOption);
  userChoice.appendChild(userImg);
  computerChoice.appendChild(computerOption);
  computerChoice.appendChild(computerImg);


