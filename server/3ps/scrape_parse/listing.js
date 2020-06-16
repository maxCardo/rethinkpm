const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')


const mlsSold = async (html) => {
    console.log('mlsSold');
    const data = fs.readFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/mlsSold.txt')
    const $ = cheerio.load(data)
    const test = $("#test").text();
    console.log('testing: ', test);

    //get mls id, find in DB and update as sold
    //ToDo: set cron job to find sold price by county api in the future

}

const  mlsPriceDec = async (html) => {
    console.log('mlsPrice');
    const data = fs.readFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/mlsPriceDec.txt')
    const $ = cheerio.load(data)
    const test = $("#test").text();
    console.log('testing: ', test);
  
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