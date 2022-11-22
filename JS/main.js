const choices = ["rock", "paper", "scissors"]
//Announce winner once one player reaches 5 points
//take name of player and points and return a message paragraph
function announceWinner(name, points){
    const overalWinnerP = document.createElement('p')
    overalWinnerP.classList.add('text-center', 'overal-winner')  
    overalWinnerP.textContent = `${name} has reached ${points} points`
    return overalWinnerP
}
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
//Refactor getPlayer choice to take player choice form event target
function getPlayerChoice(choice){
    return choice
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
//enclose paragraphs in a div
//resturna div containing paragraphs of results
function makeResultsDiv(paragraphs){
    const resultsDiv = document.createElement('div')
    resultsDiv.classList.add('result')
    paragraphs.forEach(paragraph =>{
        resultsDiv.appendChild(paragraph)
    })
    return resultsDiv
}

//Create paragraphs for each result for rendering to the DOM
//return an array of paragraph elements with textcontents
function makeResultParagraphs(results){
    const p1 = document.createElement('p')  
    p1.textContent = `Computer: ${results[0]}`  
    const p2 = document.createElement('p')  
    p2.textContent = `Player: ${results[1]}` 
    const p3 = document.createElement('p') 
    p3.style.color = 'red' 
    p3.textContent = `Winner: ${results[2]}` 
    let paragraphs = [p1, p2, p3]
    return paragraphs
}

//Load the welcome page when page loads
function openGame(){
    heading.textContent = "Welcome to Rock, Paper, Scissors game"
    const div = document.createElement('div')
    div.classList.add('start')
    button.textContent = "Start Playing"
    button.setAttribute('id','start-btn')
    div.appendChild(button)
    render(div)
}
//When player clicks an option button
//find player choice,computer choice, determines the winner
// and return an array containing the three values 
function play(choicelist,playerChoice){
    let compChoice = getComputerChoice(choicelist)
    let pChoice = getPlayerChoice(playerChoice)
    let winner = determineWinner(compChoice, pChoice)
    let results = [compChoice, pChoice, winner]
    return results
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

    const optionBtns = document.querySelectorAll('.choices button')
    const mainResDiv = document.createElement('div')
    mainResDiv.classList.add('all-results','grid')

    let computerPoints = 0
    let playerPoints = 0
    //Add click event listener to each button
    optionBtns.forEach(btn =>{
        btn.addEventListener('click', (e)=>{
            let player = e.target.textContent
            let results = play(choices,player)//order of results - [computer, player, winner]
            let paragraphs = makeResultParagraphs(results)
            let resultsDiv = makeResultsDiv(paragraphs)
            mainResDiv.appendChild(resultsDiv)
            render(mainResDiv)

            //Anounce winner once one winner has 5 points
            let winner  = results[2]
            // const overalWinnerP = document.createElement('p')
            // overalWinnerP.classList.add('text-center', 'overal-winner')  

            console.log(results)
            if(winner === 'computer'){
                computerPoints++
                if(computerPoints === 5){
                    let name = announceWinner("Computer", computerPoints)
                    container.insertBefore(name, mainResDiv)
                    computerPoints = 0
                    playerPoints = 0
                }       
            } else if(winner === 'player'){
                playerPoints++
                if(playerPoints === 5){
                    let pname = announceWinner("Player", playerPoints)
                    container.insertBefore(pname, mainResDiv)
                    computerPoints = 0
                    playerPoints = 0
                }
            }
            
            
            
        })

    })
})