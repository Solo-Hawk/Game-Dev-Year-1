function Character(name, franchise, imgURL, strength, intelligence, charisma, releaseYear){
    this.name = name;
    this.franchise = franchise;
    this.img = imgURL;
    this.stats = {
        strength: strength,
        intelligence: intelligence,
        charisma: charisma,
        year: releaseYear
    }
}

var charArray = [
    new Character("Mario", "Mario Bros", "../img/mario.png",              7, 4, 6, 1981),  //18
    new Character("Chibi-Robo", "Chibi-Robo!", "../img/chibi.png",        1, 6, 3, 2005),  //18
    new Character("Nia", "Xenoblade Chronicles", "../img/nia.png",        6, 1, 9, 2017),  //26
    new Character("Marth", "Fire Emblem", "../img/marth.png",             9, 5, 4, 1990),  //22
    new Character("Phoenix Wright", "Ace Attorney", "../img/phoenix.png", 2, 9, 10, 2001), //28
    new Character("Slippy Toad", "Star Fox", "../img/slippy.png",         4, 3, 2, 1993),  //14
    new Character("Zelda", "The Legend of Zelda", "../img/link.png",      5, 8, 8, 1986),  //24
    new Character("Isabelle", "Animal Crossing", "../img/isabelle.png",   3, 10, 5, 2012), //27
    new Character("Isaac", "Golden Sun", "../img/isaac.png",              8, 7, 1, 2000),  //22
    new Character("Mike Tyson", "Punch-Out!!", "../img/tyson.png",       10, 2, 7, 1984)   //21
];



/*
var charArray = [
    new Character("Mario", "Mario Bros", "../img/mario.png",              7, 4, 6, 1981),  //27
    new Character("Chibi-Robo", "Chibi-Robo!", "../img/chibi.png",        1, 6, 3, 2005),  //13
    new Character("Nia", "Xenoblade Chronicles", "../img/nia.png",        6, 1, 9, 2017),  //17
    new Character("Marth", "Fire Emblem", "../img/marth.png",             9, 5, 4, 1990),  //25
    new Character("Phoenix Wright", "Ace Attorney", "../img/phoenix.png", 2, 9, 10, 2001), //25
    new Character("Slippy Toad", "Star Fox", "../img/slippy.png",         4, 3, 2, 1993),  //15
    new Character("Zelda", "The Legend of Zelda", "../img/link.png",      5, 8, 8, 1986),  //29
    new Character("Isabelle", "Animal Crossing", "../img/isabelle.png",   3, 10, 5, 2012), //20
    new Character("Isaac", "Golden Sun", "../img/isaac.png",              8, 7, 1, 2000),  //21
    new Character("Mike Tyson", "Punch-Out!!", "../img/tyson.png",       10, 2, 7, 1984)   //28
];*/

/*
    1. 28 | 29
    2. 27 | 28
    3. 26 | 27
    4. 24 | 25
    5. 22 | 25
    6. 22 |  21
    7. 21 | 20
    8. 18 | 17
    9. 18 | 15
   10. 14 | 13    
*/