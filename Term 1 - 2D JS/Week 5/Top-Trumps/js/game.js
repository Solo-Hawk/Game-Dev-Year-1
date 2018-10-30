/**
 * TODO - Look up all of the TODO comments I have left for you. These are the tasks for you to complete.
 * Some of the tasks are obviously trickier than others so look for all of them and do the oens you're
 * most comfortable with, then try some of the trickier ones. I'm not expecting them all to be done in
 * time so don't worry. Just try and see what you can do, and ask me for any help!
 *
 * Note that any code that modifies the HTML is in the html-functions.js file to keep this game.js file cleaner.
 *
 * TODO Prevent the same card being drawn by multiple players.
 * TODO Add in a third player.
 * TODO Add in an option/prompt for the player to name themselves.
 */

function Player(playerName, playerNum){
    this.playerName = playerName;
    this.playerNum = playerNum;
    this.playerTurn = false;
    this.currentCard = undefined;
    this.score = 0;

    this.drawCard = function(cardNum){
        this.currentCard = charArray[cardNum];    
    }  

    this.hideCard = function(){
            document.getElementById("player"+ this.playerNum +"card").style.display = "none";
    }  

    this.showCard = function(){
            document.getElementById("player"+ this.playerNum +"card").style.display = "";
    },
        
    this.resetCard = function(){
            this.currentCard = undefined;
    }

}

/** This players object contains a list of all players. Has the capacity to include more than
 *  two players with a tiny bit of html modification.
 *  TODO Modify this object so that the Player constructor you have made is called instead of the current implementation.
 */
var players = {
    list:{
        player1: new Player(prompt("Enter Player 1's Name"), 1),
        player2: new Player(prompt("Enter Player 2's Name"), 2)
    },
    /**
     * Finds whose turn it currently is, who will be selecting and has selected a stat for this round, 
     * referred to as Active Player
     */
    findActivePlayer: function (){
        for (var player in this.list) {
            if (this.list[player].playerTurn){
                return this.list[player];
            }
        }
        this.list["player1"].playerTurn = true;
        return this.list["player1"];
    },
    /**
     * Finds a player from the players object based on their playerNum property
     */
    findByPlayerNum: function (playerNum){
        for (var player in this.list) {
            if (this.list[player].playerNum === playerNum){
                return this.list[player];
            }
        }
    
        return console.log("Error, no player found " + playerNum);
    },
    /**
     * Increase's the players score by one.
     */

    updateScore:function (winningPlayer){
        this.list[winningPlayer].score++;
    }
}

/**
 * The function called to reset the html and the player's cards.
 * Ends by leaving the active player with the stat select screen.
 */
function restartGame(){
    resetAllCards();
    hideResult();        
    
    var activePlayer = players.findActivePlayer();
    document.getElementById("playerMovePrompt").innerHTML = activePlayer.playerName + "'s move";
    activePlayer.drawCard(randNumGen());
    displayCard(activePlayer);
    
    
    moveStatSelect(activePlayer);
    showStatSelect();
}

/**
 * The main game loop that gets called when the player selects a stat to play with.
 * Ends by setting the next player along as the active player and displaying the result of the game.
 */
function gameLoop(){
    var selectedStat = getSelectedStat(); //Set the selected stat
    
    hideStatSelect();
    
    //Loop through all players finding any that aren't the active player
    for (var player in players.list) {
        if (!players.list[player].playerTurn){
            players.list[player].drawCard(randNumGen()); //Draw card for not active players
            displayCard(players.list[player]);
        }
    }
    
    var winningObj = compareSelectedStat(selectedStat);
    
    players.updateScore(winningObj.winningPlayer);
    displayWinner(winningObj, selectedStat);    
    showResult();    
    
    setNewActivePlayer(players.findActivePlayer());  
}


/**
 * Generates a random number.
 */
function randNumGen(){
    var randomNum = 0;
    
    randomNum = Math.floor(Math.random()*charArray.length);
    
    return randomNum;
}

/**
 * Hides all of the cards in the HTML then sets them back to undefined for each player.
 */
function resetAllCards(){
    for (var player in players.list) {
        players.list[player].hideCard();
        players.list[player].resetCard();
    }       
}

/**
 * Takes the stat the active player selected and looks through all players' cards's stat.
 * Returns both the value of the selected stat of the winner and the player number.
 * TODO What if the stats of the cards result in a draw/tie? Should there be a winner, if so who?
 */
function compareSelectedStat(selectedStat){
    var bestStat = 0;
    var bestPlayer;
    
    for (var player in players.list) {        
        var cardStat = players.list[player]["currentCard"]["stats"][selectedStat];
        
        if(cardStat > bestStat){
            bestStat = cardStat;
            bestPlayer = player;
        }
    }
    
    return {winningStat: bestStat, winningPlayer: bestPlayer};
}



/**
 * Finds the current active player and sets the next player along in the list of players as the new active player.
 * If the last player in the list is found, the active player goes back to the start.
 */
function setNewActivePlayer(oldActivePlayer){
    var newActivePlayerNum = oldActivePlayer.playerNum + 1;
    
    if(newActivePlayerNum > Object.keys(players.list).length){
        newActivePlayerNum = 1;
    }
    
    var newActivePlayer = players.findByPlayerNum(newActivePlayerNum);
    
    newActivePlayer.playerTurn = true;
    oldActivePlayer.playerTurn = false;        
}

displayPlayerNames();
restartGame(); //Initialises the game.