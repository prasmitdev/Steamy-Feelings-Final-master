const utils = require('./utils');

const moods ={
    adventurous: 0,
    aggressive: 1,
    cute: 2,
    dark: 3,
    horror: 4,
    quirky: 5,
    humorous: 6,
    imaginative: 7,
    intense: 8,
    light_hearted: 9,
    mysterious: 10,
    peaceful: 11,
    romantic: 12,
    sad: 13,
    sarcastic: 14,
    solitary: 15
}

//Input: 1D array of games sorted by score
//Output: 1D array of games filtered by mood
exports.rocchio = (rankedGames, mood) => {
    console.log("In rocchio");
    /*TODO: Run predict for all the ranked games.
            predict() will return an array in this format: [game, moodNumber].
            Push that output to predictedGames. Format [[game1,mood1],[game2,mood2],[gameN,moodN],...]

            Once all games are predicted, check the mood and push games associated with that mood to the 1D array finalGamesOutput.
            If mood is -1, do not filter. Simply put all games into finalGamesOutput.
            Expected format for finalGamesOutput: [game1,game2,gameN,...]
    */
    // console.log(rankedGames)

    predictedGames = [];

    finalGamesOutput = [];
    if(mood === -1){
        finalGamesOutput = rankedGames;
    }else{
        for(let i =0; i<rankedGames.length; i++){
            let moodVal=predict(rankedGames[i])
            if(moodVal === mood){
                finalGamesOutput.push(rankedGames[i])
            }
        }
    }

    return finalGamesOutput;

}

function predict(game){


    //Normalize input game
    let norm=0
    for (let [k, v] of game.descriptionIndex) {
        norm+=Math.pow(v, 2)
    }
    norm = Math.sqrt(norm)
    let freq=new Map(game.descriptionIndex);
    for (let [k, v] of game.descriptionIndex) {
        freq.set(k,v/norm)
    }


    let maxValue=-1
    let moodValue=-1

    //Calculate similarity between each centroid

    for (let [k, v] of utils.centroids) {


        //Find dot product
        let similarity = 0
        for (let [k2,v2] of freq){
            let multnum=0
            if(v.has(k2)){
                multnum = v.has(k2)
            }
            similarity += v2* multnum
        }

        //Find magnitudes of input game and centroid
        let rightside=0
        for (let [k2,v2] of freq){
            rightside+=Math.pow(v2,2)
        }
        rightside = Math.sqrt(rightside)
        let leftside=0
        for (let [k2,v2] of v){
            leftside+=Math.pow(v2,2)
        }
        leftside= Math.sqrt(leftside)

        //Calculate cosine similarity
        let similarity_full =similarity/(rightside*leftside)

        //See if it's the biggest similarity found so far and save the mood
        if(similarity_full>maxValue && similarity_full !== 0){
            maxValue=similarity_full
            moodValue=k
        }


    }

    //Edit input game's mood to the winning score
    game.mood=moodValue
    return moodValue
}
