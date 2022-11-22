let choices = ["rock", "paper", "scissors"]

//Create buttons for 3 options rock, paper amd scissors button
function createButton(textContent){
    const btn = document.createElement('button')
    btn.textContent = textContent
    return btn
}

//Displays the game when the player is ready to play
function displayGame(){
    container.innerHTML = ''
    const heading2 = document.createElement('h2')
    const optionsDiv = document.createElement('div')
    heading2.textContent = "Pick your choice"
    container.appendChild(heading2)
    choices.forEach(choice => {
        let btn = createButton(choice)
        optionsDiv.appendChild(btn)
    })
    
    optionsDiv.classList.add('flex', 'choices')
    render(optionsDiv)
}


function getRandomIndex(min, max){
    let randInt = Math.floor(Math.random() * (max - min) + min)
    return randInt
}
function getComputerChoice(list){
    let index = getRandomIndex(0, 3)
    return list[index]
}
function getPlayerChoice(){
    let choice = prompt("Choose and type one \n- Rock, paper or scissors : ")
    return choice.toLowerCase().trim()
}

function determineWinner(computer, player){
    let winner =''
    if(computer === player){
        winner = 'tie'
    } else if(computer === "rock" && player === "scissors"){
        winner = "computer"
    } else if(computer === "rock" && player === "paper"){
        winner = "player"
    } else if(computer === "paper" && player === "rock"){
        winner = "computer"
    } else if(computer === "paper" && player === "scissors"){
        winner = "player"
    } else if(computer === "scissors" && player === "paper"){
        winner = "computer"
    } else if(computer === "scissors" && player === "rock"){
        winner = "player"
    } else{
        return "You may have entered wrong spelling"
    }
    return winner
}

function openGame(){
    heading.textContent = "Welcome to Rock, Paper, Scissors game"
    const div = document.createElement('div')
    div.classList.add('start')
    button.textContent = "Start Playing"
    button.setAttribute('id','start-btn')
    div.appendChild(button)
    render(div)
}

function render(element){
    container.appendChild(element)
}
//Open Game
const container = document.querySelector('.container')
const heading = document.querySelector('h2')
const button = document.createElement('button')

openGame()

//Start playing
const startBtn = document.querySelector('#start-btn')
startBtn.addEventListener('click', ()=>{
    displayGame()
})
