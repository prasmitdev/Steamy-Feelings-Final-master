const path = require('path');
const bm25 = require('../utilities/bm25');
const rocchio = require('../utilities/rocchio');
const utils = require('../utilities/utils');

exports.getRequest = (req, res, next) =>{
    //DON'T TOUCH THIS PLEASE
    res.render('main', {data: req.dataProcessed});
}

exports.postRequest = (req, res, next) =>{
    /* TODO: Strip req.body.query of non-alphanumeric characters.
             Run bm25, then pass output to rocchio and run it

    */

    console.log(req.body.query);
    console.log(req.body.mood);

    let query = req.body.query;
    let moodNumber = parseInt(req.body.mood, 10);


    //Strip query here
    let rgx = /[^a-zA-Z0-9 -]/gi;

    query = query.replace(rgx, "");
    query = query.toLowerCase().trim();

    console.log(query);





    let rankedGames = bm25.bm25(query);
    let finalOutput = rocchio.rocchio(rankedGames, moodNumber);
    // console.log(rankedGames);





    let arr = utils.games.slice(0,100); //Test output for games on front end.
    // req.dataProcessed = rankedGames; // <-- Comment this once you think your output is ready

    req.dataProcessed = finalOutput; // <-- Uncomment this once you think your output is ready.
    next();
}
