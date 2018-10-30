/**
 * Display the names of the players that are playing at the top of each box on the web page.
 */
function displayPlayerNames(){
    for (var player in players.list) {
        document.getElementById("player" + players.list[player].playerNum + "name").innerHTML = players.list[player].playerName;
    }
}

/**
 * Displays the provided player's, player, card's properties.
 */
function displayCard(player){
    var character = player.currentCard;
    var playerNum = player.playerNum;
    
    document.getElementById("name" + playerNum).innerHTML = "Name: " + character.name;
    document.getElementById("franchise" + playerNum).innerHTML = "Franchise: " + character.franchise;
    document.getElementById("image" + playerNum).src = character.img;
    document.getElementById("strength" + playerNum).innerHTML = "Strength: " + character.stats.strength;
    document.getElementById("intelligence" + playerNum).innerHTML = "Intelligence: " + character.stats.intelligence;
    document.getElementById("charisma" + playerNum).innerHTML = "Charisma: " + character.stats.charisma;
    document.getElementById("year" + playerNum).innerHTML = "Year: " + character.stats.year;        
    
    player.showCard();
}

/**
 * Moves the stat select radio buttons to the current active player.
 */
function moveStatSelect(activePlayer){
    document.getElementById("player"+activePlayer.playerNum+"field").appendChild(
        document.getElementById("statSelect")
    );
}

/**
 * Displays the stat select radio buttons.
 */
function showStatSelect(){        
    document.getElementById("statSelect").style.display = "";
}

/**
 * Hides the stat select radio buttons.
 */
function hideStatSelect(){        
    document.getElementById("statSelect").style.display = "none";
}

/**
 * Finds the stat that has been selected by the player.
 */
function getSelectedStat(){
    var checkedRadio;
    var radios = document.getElementsByName("stat");
    
    radios.forEach( function(element){
        if(element.checked){
            checkedRadio = element.value;
        }
    });
    
    return checkedRadio;
}

/**
 * Hides the text box that displays the results of the game in the HTML.
 */
function hideResult(){
    document.getElementById("resultBox").style.display = "none";
}

/**
 * Shows the text box that displays the results of the game in the HTML.
 */
function showResult(){
    document.getElementById("resultBox").style.display = "";
}

/**
 * Modifies the HTML in the resultText box to specify which player won, 
 * which stat was chosen and how many points they had in the stat.
 */
function displayWinner(winningObj, selectedStat){    
    document.getElementById("resultText").innerHTML = players.list[winningObj.winningPlayer].playerName + " won with " + winningObj.winningStat + " points in " + selectedStat;    
}