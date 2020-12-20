const utils = require('./utils');

class Game{
    constructor(title,url,descSnippet,descriptionIndex, descriptionLength){
        this.title = title;
        this.url = url;
        this.descSnippet = descSnippet;
        this.descriptionIndex = descriptionIndex;
        this.descriptionLength = descriptionLength;
    }
}


//Input: Stripped query
//Output: 100 games sorted by score
exports.bm25 = (query) => {
    console.log("In bm25");

    /*TODO: Associate each game with a similarity score. 
            Do this by putting all the games in an array of arrays
            in this format: [[game1, score1],[game2],[score2],[gameN,scoreN],...].
            Regular reference to these games is fine for now as you're not editing them here.
            Make use of the utils export on line one which contains docFreqs and games. 
            Please do not edit the original utils.games array
            
            Once games are put into this format, return a 1D array of 100 DEEP COPIED games sorted by score.
            For example: [game1,game2,gameN,...].
    */
    
    scoredGames = []; //Push games to this 2D array as stated in the TODO

    finalGamesOutput = []; //Push top 100 DEEP COPIED games into this and return it

    return finalGamesOutput;
}



function copy(game){
    let copiedMap = new Map(game.descriptionIndex); //Need to copy map like this or you'll just save a reference to the orignal by accident
    return new Game(game.title, game.descSnippet, copiedMap, game.descriptionLength);

}