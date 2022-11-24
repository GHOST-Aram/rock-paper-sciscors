const choices = ["rock", "paper", "scissors"]
//Announce winner once one player reaches 5 points
//take name of player and points and return a message paragraph
function announceWinner(name, points){
    const overalWinnerP = document.createElement('p')
    overalWinnerP.classList.add('text-center', 'overal-winner')  
    overalWinnerP.textContent = `${name} has won by reaching ${points} points first`
    return overalWinnerP
}
//Create buttons for 3 options rock, paper amd scissors button
function createButton(textContent){
    const btn = document.createElement('button')
    btn.textContent = textContent
    return btn
}

//Clear element
function clearElement(child, parent){
    child.innerHTML = ""
    parent.removeChild(child)
}
//Displays the game when the player is ready to play
function displayGame(headingElement){
    container.innerHTML = ''
    const optionsDiv = document.createElement('div')
    headingElement.textContent = "Pick your choice"
    container.appendChild(headingElement)
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
function endGame(container, headingElement,playBtn, resultsContainer, replayButton){
    //remove results from page
    //remove results div
    headingElement.textContent = "Congrats, we have a Winner"
    clearElement(playBtn.parentElement, container)//remove playing buttons
    resultsContainer.innerHTML = ""
    resultsContainer.appendChild(replayButton)
    resultsContainer.removeAttribute('class', 'grid')
    resultsContainer.classList.add('text-center', 'start')

    //reset results 
    // computerPoints = 0
    // playerPoints = 0
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
function replay(replayButton){
    //Add event listener to restart button
    replayButton.addEventListener('click', (e) =>{
    document.location.reload()
    })
}
function resetPoints(...args){
    playerPoints = args[0]
    computerPoints = args[1]
}





//Open Game
const container = document.querySelector('.container')
const heading = document.querySelector('h2')
const button = document.createElement('button')
openGame()
let computerPoints = 0
let playerPoints = 0
//Start playing
const startBtn = document.querySelector('#start-btn')
startBtn.addEventListener('click', ()=>{
    displayGame(heading)
    const optionBtns = document.querySelectorAll('.choices button')
    const mainResDiv = document.createElement('div')
    mainResDiv.classList.add('all-results','grid')
    const replayButton = createButton("Replay Game")
  
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
            //Execute if winner is computer
            console.log(results)
            if(winner === 'computer'){
                computerPoints++
                if(computerPoints === 5){
                    let name = announceWinner("Computer", computerPoints)
                    container.insertBefore(name, mainResDiv)
                    endGame(container,heading,optionBtns[0],mainResDiv,replayButton)
                    resetPoints(playerPoints,computerPoints)
                    replay(replayButton)  
                } 
             //Execute if winner is human Player         
            } else if(winner === 'player'){
                playerPoints++
                if(playerPoints === 5){
                    let pname = announceWinner("Player", playerPoints)
                    container.insertBefore(pname, mainResDiv)
                    endGame(container,heading,optionBtns[0],mainResDiv,replayButton)
                    replay(replayButton)
                }
            }
        })

    })
})

