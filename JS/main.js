let choices = ["rock", "paper", "scissors"]
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


