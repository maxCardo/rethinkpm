const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')


const mlsSold = async (html) => {
    console.log('mlsSold');
    const data = fs.readFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/mlsSold.txt')
    const $ = cheerio.load(data)

    const test = $("#test").text();
    console.log('testing: ', test);


    //get mls id, 
    //find in DB and update as sold
    //ToDo: set cron job to find sold price by county api in the future

}

const  mlsPriceDec = async (html) => {
    console.log('mlsPrice');
    const data = fs.readFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/mlsPriceDec.txt')
    const $ = cheerio.load(data)
    const setLength = $("#x_x_wrapperTable").length;



    /*IDS*/
    const mlsIds = $("#x_x_wrapperTable table table tbody > tr:nth-child(3) a").text();
    let idArr = mlsIds.match(/.{1,7}/g);

    /*PRICES*/
    let mlsPrices = $("#x_x_wrapperTable table table tbody > tr:nth-child(3) > td:last-child span").text().split("$");
        mlsPrices.shift();

    /*LOCATION DATA*/
    let mlsLoc =   $('#x_x_wrapperTable table tbody > tr:nth-child(2) > td:nth-child(2) tbody > tr:nth-child(2) span').map(function(){

        return $(this).text().replace(/ +(?= )/g,'');
    }).get();  //$("#x_x_wrapperTable table tbody > tr:nth-child(2) > td:nth-child(2) tbody > tr:nth-child(2) span").text();

    /*PROPERTY TYPE*/
    let mlsTypes = $("#x_x_wrapperTable table table tbody > tr:nth-child(4) > td:last-child span").map(function(){
        return $(this).text();
    }).get();

    /*PROPERTY # of BEDROOMS*/
    let mlsBedrooms = $("#x_x_wrapperTable table table tbody > tr:nth-child(5) > td:nth-child(2) span").map(function(){
        return $(this).text();
    }).get();

    /*LISTING STYLE*/
    let mlsStyle = $("#x_x_wrapperTable table table tbody > tr:nth-child(6) > td:nth-child(2) span").map(function(){
        return $(this).text();
    }).get();

    /*PARKING SPACE*/
    let mlsParking = $("#x_x_wrapperTable table table tbody > tr:nth-child(7) > td:nth-child(2)").map(function(){
        let number = $(this).find('span:first-child').text();
        let type = $(this).find('span:last-child').text();

        return number + " / " + type;
    }).get();


    /*Build entry array*/
    let entries = [];
    for (i=0;i<setLength;i++) {
        let entry = {};

        entry.id = idArr[i];

        entry.prce = mlsPrices[i];

        let locationArray = mlsLoc[i].split(",");
        entry.address = locationArray[0];
        let entryZip = '';
        if (locationArray.length > 1 && locationArray[1]) {
            entryZip = locationArray[1].substr(locationArray[1].length - 5);
        }
        entry.zip = entryZip;

        entry.type = mlsTypes[i];

        entry.bedrooms = mlsBedrooms[i];

        entry.style = mlsStyle[i];

        entry.parking = mlsParking[i];

        entries.push(entry);
    }

    console.log('testing: ', entries);

    // let item = {};
    //
    // test.each((value, index) => {
    //     item.address =
    // })
    //get mls id, new price, 
    // find record in db update price
  
}

const mlsNew = async (html) => {
    console.log('mlsNew');
    const data = fs.readFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/mlsNew.txt')
    const $ = cheerio.load(data)
    const test = $("#test").text();
    console.log('testing: ', test);

}

const priceInc = async (html) => {
    console.log('priceInc');
    // const data = fs.readFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/priceInc.txt')
    // const $ = cheerio.load(data)
    // const test = $("#test").text();
    // console.log('testing: ', test);


    //createTextFile
    fs.writeFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/priceInc.txt', html)
    console.log('done!');

}

const contingent = async (html) => {
    console.log('contingant');
    // const data = fs.readFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/contingent.txt')
    // const $ = cheerio.load(data)
    // const test = $("#test").text();
    // console.log('testing: ', test);


    //createTextFile
    fs.writeFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/contingent.txt', html)
    console.log('done!');

}

const backOnMarket = async (html) => {
    console.log('backOnMarket');
    // const data = fs.readFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/backOnMarket.txt')
    // const $ = cheerio.load(data)
    // const test = $("#test").text();
    // console.log('testing: ', test);


    //createTextFile
    fs.writeFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/backOnMarket.txt', html)
    console.log('done!');

}


const expired = async (html) => {
    console.log('expired');
    // const data = fs.readFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/expired.txt')
    // const $ = cheerio.load(data)
    // const test = $("#test").text();
    // console.log('testing: ', test);


    //createTextFile
    fs.writeFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/expired.txt', html)
    console.log('done!');

}

module.exports = {mlsSold, mlsNew, mlsPriceDec,priceInc, contingent, backOnMarket, expired}

// //createTextFile
// fs.writeFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/<nameOfFile>.txt', html)
// console.log('done!');

// //for testing scape from test sight. in prod the html will be diliverd by email
// const res = await axios.get('http://maxcardo.github.io/scrape_sandbox/new')