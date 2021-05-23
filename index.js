import puppeteer from 'puppeteer'
// ● the artists playing 
// ● the city 
// ● the name of the venue 
// ● the date 
// ● the price 
// * need to find way to use the refined results 
//* Need to find a way to get all the .content singular events from the #Content and loop through extracting each one

const scrapeProduct = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const feedHandle = await page.$('#Content')
  const arrayOfEvents = await feedHandle.$$eval('.content', (nodes) => nodes.map(item =>{
    if (item.querySelector('tbody') === null){ 
      return ' 🔴 '
    } else {
      const eventDetails = item.querySelector('tbody')
      const tbody = item.querySelector('tbody')
      console.log('🐝 ~ file: index.js ~ line 22 ~ eventDetails', eventDetails) //! ?? why isn't this printing anything?
            
      const dataObject = {}
      for (const row of tbody.rows) {
        if (!row.querySelector('td')) continue // Skip headers.
        const [keyCell, valueCell] = row.cells
        dataObject[keyCell.innerText] = valueCell.innerText
      }
      return dataObject
      // return eventDetails.querySelector('td').innerText 
    }
  }))
  //? h2 is the title of each event.  
  //   if (item.querySelector('h2') === null){ 
  //     return 'no h2 🔴'
  //   } else {
  //     return item.querySelector('h2').innerText
  //   }
  // }))
  // const test = await feedHandle.$$eval('.content', (nodes) => nodes.map((n) => n.innerText))
  
  console.log('🐝 ~ file: index.js ~ line 24 ~ arrayOfEvents 🔵 ', arrayOfEvents)


  const [eventName] = await page.$x('//*[@id="Content"]/div[2]/div[6]/h2/a')
  const eventNameSrc = await eventName.getProperty('innerText')
  const eventNameSrcText = await eventNameSrc.jsonValue()
  console.log('🐝 ~ file: index.js ~ line 18 ~ srcText 🟢 ', eventNameSrcText)

  const [artistName] = await page.$x('//*[@id="Content"]/div[2]/div[6]/h2/a')
  const artistNameSrc = await artistName.getProperty('innerText')
  const artistNameSrcText = await artistNameSrc.jsonValue()
  console.log('🐝 ~ file: index.js ~ line 24 ~ artistNameSrcText 🟢 ', artistNameSrcText)

  const [locationName] = await page.$x('//*[@id="Content"]/div[2]/div[6]/div[1]/table/tbody/tr[1]/td[2]')
  const locationNameSrc = await locationName.getProperty('innerText')
  const locationNameSrcText = await locationNameSrc.jsonValue()
  console.log('🐝 ~ file: index.js ~ line 32 ~ locationNameSrcText 🟢 ', locationNameSrcText)

  const [date] = await page.$x('//*[@id="Content"]/div[2]/div[6]/div[1]/table/tbody/tr[2]/td[2]')
  const dateSrc = await date.getProperty('innerText')
  const dateSrcText = await dateSrc.jsonValue()
  console.log('🐝 ~ file: index.js ~ line 32 ~ dateNameSrcText 🟢 ', dateSrcText)

  await browser.close()
}
scrapeProduct('https://www.wegottickets.com/searchresults/adv')

// scrapeProduct('https://www.wegottickets.com/event/516497')

// const allResults =  await page.$$eval('div > .content', content => {
//   return content.map(content => content.textContent.replace(/<a [^>]+>[^<]*<\/a>/g, '').trim())
// })
// console.log('🐝 ~ file: index.js ~ line 19 ~ allResults', allResults)