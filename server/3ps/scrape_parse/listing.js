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


module.exports = {mlsSold, mlsNew, mlsPriceDec}

// //createTextFile
// fs.writeFileSync('./server/3ps/scrape_parse/sampleScrapeFiles/<nameOfFile>.txt', html)
// console.log('done!');

// //for testing scape from test sight. in prod the html will be diliverd by email
// const res = await axios.get('http://maxcardo.github.io/scrape_sandbox/new')