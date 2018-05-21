const {Divinity} = require('./divinity');
const READLINE = require('readline');
const HTTP = require('http');
const URL = require('url');
const FS = require('fs');


//SERVER PART
let server = HTTP.createServer(function(req, res) {

    let url = URL.parse(req.url).pathname;

    if (url === "/") {
        res.writeHeader(200, {'Content-Type': 'text/html'});
        let readSream  = FS.createReadStream('index.html','utf8');
        readSream .pipe(res);
    }
    else {

        /* ---- Working urls ----

        /action/{myCityId}/buyMerchant
        /action/{myCityId}/buyTroop
        /action/{myCityId}/merchant/makeTrade/{otherCityId}
        /action/{myCityId}/troop/{troopId}/makeAttackOnCity/{otherCityId}
        /action/{myCityId}/troop/{troopId}/makeAttackOnMerchant/{otherCityId}
        /action/{myCityId}/troop/{troopId}/defend
        /action/{myCityId}/troop/{troopId}/defend
        /startGame
        /getGame

        */

        pathArray = url.split('/');

        if(pathArray[1] === 'action'){

            worked = true;

            let myCityId = pathArray[2];
            let myCity = listCity[myCityId];

            if(pathArray[3] === "buyMerchant"){
                myCity.buyMerchant();
            } else if(pathArray[3] === "buyTroop") {
                myCity.buyTroop();
            } else if(pathArray[3] === "merchant" && pathArray[4] === "makeTrade") {

                let otherCityId = pathArray[5];
                let otherCity = listCity[otherCityId];

                myCity.merchant.makeTrade(otherCity);

            } else if(pathArray[3] === "troop") {

                let troopId = pathArray[4];
                let troop = myCity.listTroop[troopId];

                if(pathArray[5] === "makeAttackOnCity") {

                    let otherCityId = pathArray[6];
                    let otherCity = listCity[otherCityId];

                    troop.makeAttackOnCity(otherCity);

                } else if (pathArray[5] === "makeAttackOnMerchant"){

                    let otherCityId = pathArray[6];
                    let otherCity = listCity[otherCityId];

                    troop.makeAttackOnMerchant(otherCity)

                } else if (pathArray[5] === "defend") {
                    troop.defend()
                } else {
                    worked=false;
                }
            } else {
                worked=false;
            }

            if(worked === true) {
                res.writeHead(200);
                res.end('Ok');
            } else {
                res.writeHead(405);
                res.end('Wrong url :'+url);
            }
        } else if (pathArray[1] === 'startGame'){
            initGame();
            res.writeHead(200);
            res.end('Ok');
        } else if (pathArray[1] === 'getGame'){
            res.writeHead(200);
            res.end(getJsonListCity());
        } else if (pathArray[1] === 'img'){
            let img = FS.readFileSync("./img/"+pathArray[2]);
            res.writeHead(200, {'Content-Type': 'image/gif' });
            res.end(img, 'binary');
        }
    }
});

server.listen(8080);


//GAME PART

let listCity = [];
let gameStarted = false;

function initGame() {
    listCity = [new Divinity('Paris', 500),
        new Divinity('London', 500),
        new Divinity('Rome', 500),
        new Divinity('Berlin', 500)];
    listCity[0].init();
    listCity[1].init();
    listCity[2].init();
    listCity[3].init();

    listCity[0].buyTroop();
    listCity[1].buyMerchant();
    gameStarted = true;
}

function getJsonListCity(){
    jsonCities = '[';
    listCity.forEach(function(city) {
        jsonCities = jsonCities+getJsonCity(city)+',';

    });
    if(jsonCities !== '[')
        jsonCities = jsonCities.substring(0, jsonCities.length - 1);
    jsonCities = jsonCities+']';

    return jsonCities;
}

function getJsonCity(city){

    jsonTroop = '[';
    city.listTroop.forEach(function(troop) {
        jsonTroop = jsonTroop+getJsonTroop(troop)+',';

    });
    if(jsonTroop !== '[')
        jsonTroop = jsonTroop.substring(0, jsonTroop.length - 1);
    jsonTroop = jsonTroop+']';


    return '{' +
        '"name" : "'+city.name+'",' +
        '"gold" : "'+city.gold+'",' +
        '"corn" : "'+city.corn+'",' +
        '"merchant" : '+getJsonMerchant(city.merchant)+',' +
        '"listTroop" : '+jsonTroop+'' +
        '}';
}

function getJsonMerchant(merchant){

    if(merchant === ''){
        return '""';
    } else {
        return '{' +
            '"action" : "' + merchant.action + '",' +
            '"cityToTrade" : "' + merchant.cityToTrade.name + '",' +
            '"progressBar" : "' + merchant.progressBar + '"' +
            '}'
    }

}

function getJsonTroop(troop){

    return '{' +
        '"action" : "'+troop.action+'",' +
        '"cityToAttack" : "'+troop.cityToAttack.name+'",' +
        '"life" : "'+troop.life+'",' +
        '"progressBar" : "'+troop.progressBar+'"' +
        '}';
}

function printCity(city) {
    console.log("--------------------");
    console.log("City : "+city.name);
    console.log("Corn : "+city.corn);
    console.log("Gold : "+city.gold);
    if(city.merchant !== "")
        printMerchant(city.merchant);
    city.listTroop.forEach(function(troop) {
        printTroop(troop);
    });
}

function printMerchant(merchant) {
    console.log("----------");
    console.log("Merchant : "+ merchant.action);
    if(merchant.cityToTrade !== "")
        console.log("City to trade : "+merchant.cityToTrade);
    console.log("ProgressBar : "+merchant.progressBar)
}

function printTroop(troop) {
    console.log("----------");
    console.log("Troop : "+ troop.action);
    if(troop.cityToAttack !== "")
        console.log("City to attack : "+troop.cityToAttack);
    console.log("ProgressBar : "+troop.progressBar);
    console.log("Life : "+troop.life);
}

/*
let interval = setInterval(() => {
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    printCity(city1);
    printCity(city2)
}, 100);
*/





