import puppeteer from 'puppeteer'
// ● the artists playing 
// ● the city 
// ● the name of the venue 
// ● the date 
// ● the price 
// * need to find way to use the refined music only results 
//* Need to find a way to get all the .content singular events from the #Content and loop through extracting each one
//* get elements id from url then can use that as param for requests like DB



const scrapeForEventsArray = async (url) => {
  try {
    const browser = await puppeteer.launch({    dumpio: true   })
    const page = await browser.newPage()
    await page.goto(url)
    const contentWrapper = await page.$('#Content')
    //__________________________________________________________________________________________________________________
    //#region //? Alternate page.evaluate instead..
    // return page.evaluate(() => {
    // // get all td elements
    //   const tdList = [...document.querySelectorAll('.content')] 
    //   return tdList.map(item =>{
    //     const tbody = item.querySelector('tbody')
    //     console.log('🐝 ~ file: index.js ~ line 28 ~ tbody', tbody)
    //     if (tbody === null){ 
    //       return '🔴 No table body data' //! change to null? //? make this throw an error on the front
    //     } else { 
       
    //       //________________________________________________________________________________________________________________________________
    //       const eventTitle =  item.querySelector('h2').innerText
    //       console.log('🐝 ~ file: index.js ~ line 35 ~ eventTitle', eventTitle)
    //       const eventPageLink = item.querySelector('a').href
    //       /// For each .content we can go through the elements
  
    //       const allRows = tbody.querySelectorAll('tr')
    //       const eventDetails = []
      
    //       allRows.forEach(item=>{
    //         const eventDetail = item.innerText.replace(/\t/g, '')
    //         eventDetails.push(eventDetail)
    //       })
  
    //       const dataObject = {
    //         title: eventTitle,
    //         location: eventDetails[0],
    //         date: eventDetails[1],
    //         time: eventDetails[2],
    //         ageRestriction: eventDetails[3],
    //         eventPageURL: eventPageLink
    //       }
    //       // return JSON.stringify(dataObject) //* FOR JSON 
    //       events.push(dataObject)
    //       return dataObject
    //     }
    //   })
    // })
    //#endregion
    
    //__________________________________________________________________________________________________________________
    const arrayOfEvents = await contentWrapper.$$eval('.content', (nodes) => nodes.map(item =>{
      const tbody = item.querySelector('tbody')
      if (tbody === null){ 
        return '🔴 No table body data' //! change to null? //? make this throw an error on the front
      } else { 
        const eventTitle =  item.querySelector('h2').innerText
        const eventPageLink = item.querySelector('a').href
        /// For each .content we can go through the elements
          
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
    arrayOfEvents.shift()
    // return arrayOfEvents[12]
    return arrayOfEvents //!FOR FULL ARRAY
  } catch (error) {
    console.log('🟥',error)
  }
}
// scrapeProduct('https://www.wegottickets.com/searchresults/adv')
            
const getArray = async () => {
  const response = await scrapeForEventsArray('https://www.wegottickets.com/searchresults/adv')
  console.log('🟩',response)
  return response
}
getArray()

//todo map through each item and run the function to get ticket pricing from page url


const getTicketInfo = async (url = 'https://www.wegottickets.com/event/515342') => {
  try {
    const browser = await puppeteer.launch({    dumpio: true   })
    const page = await browser.newPage()
    await page.goto(url)




  } catch (error) {
    console.log('🟥🟥', error)
  
  }



}
getTicketInfo()