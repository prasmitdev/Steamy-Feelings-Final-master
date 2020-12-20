const YAML = require('yaml');
const fs = require('fs');
const path = require('path');



let docFreqs;



exports.serverStartUp = () => {

    console.log("Setting up the server. May take a while");

    let p = path.join(__dirname,'..','data','docFreqs.csv');
    let fileContent = fs.readFileSync(p, {encoding: 'utf8', flag: 'r'});

    let data = fileContent.split("\n");

    let csvData = [];

    for(let i = 0; i < data.length; i++){
        let row = data[i].split(",");
        row[1] = parseInt(row[1],10);
        csvData.push(row);
    }

    exports.docFreqs = new Map(csvData);



    p = path.join(__dirname,'..','data','centroids.yaml');
    const centData = fs.readFileSync(p, {encoding: 'utf8', flag: 'r'});

    const centroidsUnformat = YAML.parse(centData);

    let centroidArr = Object.entries(centroidsUnformat);

    for(let i = 0; i < centroidArr.length; i++){
        centroidArr[i][0] = parseInt(centroidArr[i][0],10);

        centroidArr[i][1] = new Map(Object.entries(centroidArr[i][1]))
    }
    exports.centroids = new Map(centroidArr);



    p = path.join(__dirname,'..','data','games.yaml');
    const gameData = fs.readFileSync(p, {encoding: 'utf8', flag: 'r'});

    const arr = YAML.parse(gameData);

    for(let i = 0; i < arr.length; i++){
        arr[i] = YAML.parse(arr[i]);
        arr[i].descriptionIndex = new Map(Object.entries(arr[i].descriptionIndex));
    }

    exports.games = arr;

    console.log("Finished Startup");


}