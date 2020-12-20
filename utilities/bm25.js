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
    
    k1 = 1.5;
    b = 0.75;
    currentScore = 0;

    queryArr = query.split(/\s+/g);
    queryArr = queryArr.sort();

    scoredGames = []; //Push games to this 2D array as stated in the TODO

    for(let i = 0; i < utils.games.length; i++){
        for(let j = 0; j < queryArr.length; j++) {
            if (utils.games[i].descriptionIndex.has(queryArr[j])) {

                currentScore += (Math.log(utils.games.length/utils.docFreqs.get(queryArr[j]))*((k1+1)*utils.games[i].descriptionIndex.get(queryArr[j])))/(k1*((1-b)+b*(utils.games[i].descriptionLength/223.15495672860013))+utils.games[i].descriptionIndex.get(queryArr[j]));
                
            }
        }
        currentGameAndScore = [utils.games[i], currentScore];
        scoredGames.push(currentGameAndScore);
        currentScore = 0;
    }

    scoredGames.sort((a,b) => {
        if (a[1] < b[1]) {
            return 1;
        } else {
            return -1;
        }
    })

    finalGamesOutput = []; //Push top 100 DEEP COPIED games into this and return it

    for(let i = 0; i < 100; i++){
        // console.log('\n');
        finalGamesOutput.push(copy(scoredGames[i][0]));
        console.log(scoredGames[i][0].title);
        console.log(scoredGames[i][1]);
        // console.log('\n');
    }

    return finalGamesOutput;
}



function copy(game){
    let copiedMap = new Map(game.descriptionIndex); //Need to copy map like this or you'll just save a reference to the orignal by accident
    return new Game(game.title, game.url, game.descSnippet, copiedMap, game.descriptionLength);

}