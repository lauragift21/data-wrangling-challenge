const axios = require("axios")
const cheerio = require('cheerio');
const ObjectsToCsv = require('objects-to-csv');
const url = "https://www.eia.gov/dnav/ng/hist/rngwhhdD.htm"

axios(url).then(response => {
  const html = response.data
  const $ = cheerio.load(html);
  const tableData = $('table:nth-of-type(3)');
  let data = [];

  tableData.each(function () {
    const date = $(this).find('.B6').text();
    const price = $(this).find('.B3').text();
    data.push({
      date,
      price
    })
  })

  async function printCsv(data) {
    await new ObjectsToCsv(data).toDisk('./data.csv')
  }
  printCsv(data);
}).catch(console.error)

