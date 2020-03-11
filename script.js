const charmander = document.querySelector('#charmander');
const squirtle = document.querySelector('#squirtle')
const bulbasaur = document.querySelector('#bulbasaur');
const result = document.querySelector('#result');
const scores = document.querySelector('#scores');
const userChoice = document.querySelector('#userChoice');
const computerChoice = document.querySelector('#computerChoice');
let img = document.createElement('img');
let img2 = document.createElement('img'); 
let para = document.createElement('p');
let para2 = document.createElement('p');
let userOption = document.createElement('span');
let computerOption = document.createElement('span');
let playerScore = 0;
let computerScore = 0;

para.textContent = "Start! click on your option.";
para2.textContent = "You: 0 Computer: 0";

function computerPlay() {
    const options = ["fire", "water", "grass"];
    return options[Math.floor(Math.random() * options.length)];
}


function user(optionId){
    userOption.textContent = "You";
    if (optionId === 'charmander') {
        img.src = 'img/charmander.png';
        img.width = "60";

    } else if (optionId === 'squirtle'){
        img.src = 'img/squirtle.png';
        img.width = "60"; 

    } else if ( optionId === 'bulbasaur'){
        img.src = 'img/bulbasaur.png';
        img.width = "60"; 
    }
}

function computer(computerSelection){
    computerOption.textContent = "Computer";
    if (computerSelection === 'fire') {
        img2.src = 'img/charmander.png';
        img2.width = "60";

    } else if (computerSelection === 'water'){
        img2.src = 'img/squirtle.png';
        img2.width = "60"; 

    } else if (computerSelection === 'grass'){
        img2.src = 'img/bulbasaur.png';
        img2.width = "60"; 
    }

}



function playRound(playerSelection, computerSelection, optionId){
        if (computerSelection === playerSelection) {
            para.textContent = `It's a tie, you both chose ${optionId}`;
            para2.textContent = `You: ${playerScore} Computer: ${computerScore}`;
            user(optionId);
            computer(computerSelection);

        } else if (playerSelection === "fire" && computerSelection === "grass" || playerSelection === "water" && computerSelection === "fire" || playerSelection === "grass" && computerSelection === "water") {
            para.textContent = `You win! ${playerSelection} beats ${computerSelection}`;
            playerScore++;
            para2.textContent = `You: ${playerScore} Computer: ${computerScore}`;
            user(optionId);
            computer(computerSelection);

        } else {
            para.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
            computerScore++;
            para2.textContent = `You: ${playerScore} Computer: ${computerScore}`;
            user(optionId);
            computer(computerSelection);
        }
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

  result.appendChild(para);
  scores.appendChild(para2);
  userChoice.appendChild(userOption);
  userChoice.appendChild(img);
  computerChoice.appendChild(computerOption);
  computerChoice.appendChild(img2); 

