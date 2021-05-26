import puppeteer from 'puppeteer'
// ● the artists playing 
// ● the city 
// ● the name of the venue 
// ● the date 
// ● the price 
// * need to find way to use the refined music only results 
//* Need to find a way to get all the .content singular events from the #Content and loop through extracting each one
//* get elements id from url then can use that as param for requests like DB


const scrapeProduct = async (url) => {
  const browser = await puppeteer.launch({    dumpio: true   })
  const page = await browser.newPage()
  await page.goto(url)
  const contentWrapper = await page.$('#Content')
  //__________________________________________________________________________________________________________
  const arrayOfEvents = await contentWrapper.$$eval('.content', (nodes) => nodes.map(item =>{
    const tbody = item.querySelector('tbody')
    if (tbody === null){ 
      return '🔴 No table body data' //! change to null? //? make this throw an error on the front
    } else { 
      // const newBrowser =  puppeteer.launch({    dumpio: true   })
      // console.log('🐝 ~ file: index.js ~ line 24 ~ newBrowser', newBrowser)
      

      // const testFn = async (params) => {
      //   console.log(params, '🟣' )
      //   const browser = await puppeteer.launch({    dumpio: true   })
      //   const page = await browser.newPage()
      //   await page.goto(url)
      //   const ticketsWrapper = await page.$('form.full-width')
      //   console.log('🐝 ~ file: index.js ~ line 28 ~ ticketsWrapper', ticketsWrapper)
        
      //   const arrayOfTickets = await ticketsWrapper.$$eval('.BuyBox', (nodes) => nodes.forEach(item =>{
      //     console.log('🐝 ~ file: index.js ~ line 30 ~ ticket', item)
            
      //   }))
      //   console.log('🐝 ~ file: index.js ~ line 46 ~ arrayOfTickets', arrayOfTickets)
      //   await browser.close()
      // }
      //________________________________________________________________________________________________________________________________
      const eventTitle =  item.querySelector('h2').innerText
      const eventPageLink = item.querySelector('a').href
      console.log('🐝 ~ file: index.js ~ line 26 ~ eventPageLink',typeof eventPageLink)
      /// For each .content we can go through the elements
      // const eventID = eventPageLink(eventPageLink.length - 6)
      // console.log('🐝 ~ file: index.js ~ line 42 ~ eventID', eventID)
      // getTicketInfo()
      // try {
      //   testFn('hi')
        
      // } catch (error) {
      //   console.log('🐝 ~ file: index.js ~ line 34 ~ error', error)
        
      // }
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
  // console.log('🐝 ~ file: index.js ~ line 35 ~ arrayOfEvents 🔵 ', arrayOfEvents)
  console.log('🐝 ~ file: index.js ~ line 35 ~ arrayOfEvents 🔵 ', arrayOfEvents[12])

  await browser.close()
}
scrapeProduct('https://www.wegottickets.com/searchresults/adv')



// const getTicketInfo = async(url) =>{
//   console.log('🟩')
//   console.log('🐝 ~ file: index.js ~ line 28 ~ eventPageLink', url)
//   const browser = await puppeteer.launch({    dumpio: true   })
//   const page = await browser.newPage()
//   await page.goto(url)
//   const ticketsWrapper = await page.$('form.full-width')
//   console.log('🐝 ~ file: index.js ~ line 28 ~ ticketsWrapper', ticketsWrapper)

//   const arrayOfTickets = await ticketsWrapper.$$eval('.BuyBox', (nodes) => nodes.forEach(item =>{
//     console.log('🐝 ~ file: index.js ~ line 30 ~ ticket', item)
    
//   }))
//   console.log('🐝 ~ file: index.js ~ line 46 ~ arrayOfTickets', arrayOfTickets)
//   await browser.close()

// }