import puppeteer from 'puppeteer'
// ● the artists playing 
// ● the city 
// ● the name of the venue 
// ● the date 
// ● the price 
// * need to find way to use the refined music only results 
//* Need to find a way to get all the .content singular events from the #Content and loop through extracting each one

const scrapeProduct = async (url) => {
  const browser = await puppeteer.launch({
    dumpio: true
  })
  const page = await browser.newPage()
  await page.goto(url)

  const contentWrapper = await page.$('#Content')
  ///---------------------------------------------------------------------------------------------------------------------------- 


  const arrayOfEvents = await contentWrapper.$$eval('.content', (nodes) => nodes.map(item =>{

    /// For each .content we can go through the elements
    if (item.querySelector('tbody') === null){ //! make sure everything is in here 
      return '🔴'
    } else { 
      const eventTitle =  item.querySelector('h2').innerText
      // console.log('🐝 ~ file: index.js ~ line 21 ~ eventTitle', eventTitle.replace(/['"]+/g, ''))
      // const formattedTitle = eventTitle.
      const tbody = item.querySelector('tbody')
      const allRows = tbody.querySelectorAll('tr')
      // console.log('🟡 ~ file: index.js ~ line 40 ~ allRows', allRows) /// so the nodeobject is array of rows now 
      
      const eventDetails = allRows.forEach(item=>{ //! cant map here....
        console.log('🟢 ~ file: index.js ~ line 89 ~ item.innerText', item.innerText)
        console.log('🟣 ~ file: index.js ~ line 89 ~ item', item)
        return item.innerText
      })
      console.log('🐝 ~ file: index.js ~ line 47 ~ eventDetails', eventDetails)

      const dataObject = {}
      //#region //? this gets the ages only 
      // for (const row of tbody.rows) {
      // console.log('🐝 ~ file: index.js ~ line 31 ~ tbody.rows', tbody.rows)
      // if (!row.querySelector('td')) continue // Skip headers.
      // eslint-disable-next-line no-unused-vars
      // const [keyCell, valueCell] = row.cells
      // console.log('🐝 ~ file: index.js ~ line 37 ~ row.cells', row.cells)

      // dataObject['ages'] = valueCell.innerText
      // }
      // return dataObject
      // return eventDetails.querySelector('td').innerText 
      //#endregion
      /// return a object with dates ages etc 
      return eventTitle
    }
  }))
  console.log('🐝 ~ file: index.js ~ line 35 ~ arrayOfEvents 🔵 ', arrayOfEvents)
 
  //#region  //? using xPath
  const [eventName] = await page.$x('//*[@id="Content"]/div[2]/div[6]/h2/a')
  const eventNameSrc = await eventName.getProperty('innerText')
  const eventNameSrcText = await eventNameSrc.jsonValue()
  // console.log('🐝 ~ file: index.js ~ line 42 ~ srcText 🟢 ', eventNameSrcText)

  const [artistName] = await page.$x('//*[@id="Content"]/div[2]/div[6]/h2/a')
  const artistNameSrc = await artistName.getProperty('innerText')
  const artistNameSrcText = await artistNameSrc.jsonValue()
  // console.log('🐝 ~ file: index.js ~ line 47 ~ artistNameSrcText 🟢 ', artistNameSrcText)

  const [locationName] = await page.$x('//*[@id="Content"]/div[2]/div[6]/div[1]/table/tbody/tr[1]/td[2]')
  const locationNameSrc = await locationName.getProperty('innerText')
  const locationNameSrcText = await locationNameSrc.jsonValue()
  // console.log('🐝 ~ file: index.js ~ line 52 ~ locationNameSrcText 🟢 ', locationNameSrcText)

  const [date] = await page.$x('//*[@id="Content"]/div[2]/div[6]/div[1]/table/tbody/tr[2]/td[2]')
  const dateSrc = await date.getProperty('innerText')
  const dateSrcText = await dateSrc.jsonValue()
  // console.log('🐝 ~ file: index.js ~ line 57 ~ dateNameSrcText 🟢 ', dateSrcText)
  //#endregion

  await browser.close()
}
scrapeProduct('https://www.wegottickets.com/searchresults/adv')



// ------------------------------------------------------------------------------------
// scrapeProduct('https://www.wegottickets.com/event/516497')

// const allResults =  await page.$$eval('div > .content', content => {

//   return content.map(content => content.textContent.replace(/<a [^>]+>[^<]*<\/a>/g, '').trim())
// })
// console.log('🐝 ~ file: index.js ~ line 19 ~ allResults', allResults)

//? h2 is the title of each event. insert inside the map 
//   if (item.querySelector('h2') === null){ 
//     return 'no h2 🔴'
//   } else {
//     return item.querySelector('h2').innerText
//   }
// }))
// const test = await feedHandle.$$eval('.content', (nodes) => nodes.map((n) => n.innerText))