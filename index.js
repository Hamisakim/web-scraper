import puppeteer from 'puppeteer'



const scrapeProduct = async (url) => {

  const browser = await puppeteer.launch({    dumpio: true   })
  const page = await browser.newPage()
  await page.goto(url)

  const contentWrapper = await page.$('#Content')

  const arrayOfEvents = await contentWrapper.$$eval('.content', (nodes) => nodes.map(item =>{
    const tbody = item.querySelector('tbody')
    if (tbody === null){ 
      return '🔴 No table body data' 
    } else { 
      const eventTitle =  item.querySelector('h2').innerText
      const eventPageLink = item.querySelector('a').href
      const allRows = tbody.querySelectorAll('tr')
      
      const eventDetails = []
      allRows.forEach(item=>{
        const eventDetail = item.innerText.replace(/\t/g, '')
        eventDetails.push(eventDetail)
      })

      const dataObject = {
        title: eventTitle,
        location: eventDetails[0],
        date: eventDetails[1],
        time: eventDetails[2],
        ageRestriction: eventDetails[3],
        eventPageURL: eventPageLink
      }
      // return JSON.stringify(dataObject) //* FOR JSON 
      return dataObject
    }

  }))

  await browser.close()

  console.log('🐝 ~ arrayOfEvents 🔵 ', arrayOfEvents)
  return arrayOfEvents
}
scrapeProduct('https://www.wegottickets.com/searchresults/adv')
