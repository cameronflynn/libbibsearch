import { getData } from './services/getData.js'
import buildBerkeleyURLS from './helpers/buildBerkeleyURLS.js'
import buildBerkeleyBookObj from './helpers/buildBerkeleyBookObj.js'
import serializeInputStrings from './helpers/serializeInputStrings.js'

//TODO
//get prettier to work - format all files

//TODO 
//error handling 
//urls for if you want to manually double check quick - build those urls

export default async function searchBook(inputString) {
  const cleanInputString = serializeInputStrings(inputString)

  const [catalogURL, articlesURL, worldCat] = buildBerkeleyURLS(cleanInputString)
  const standfordURL = `https://searchworks.stanford.edu/articles?utf8=%E2%9C%93&search_field=title&q=${cleanInputString}`

  const catalogData = await getData(catalogURL)
  //TODO
  //Loop thru docs object if does not match on first 
  if (catalogData.docs.length > 0) {
    const bookObj = buildBerkeleyBookObj(catalogData.docs[0].pnx.display, 'Berkeley Catalog', inputString)
    if (bookObj) {
      return bookObj
    }
  }

  //TODO
  //standford come back to
  // const standfordData = await getData(standfordURL, {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json'
  // })
  
  // if (standfordData.response.docs[0].id) {
    // const standfordBookUrl = `https://searchworks.stanford.edu/articles/${standfordData.response.docs[0].id}`
   // const standfordBookUrl = `https://searchworks.stanford.edu/browse/nearby?start=7834818&view=gallery`
    
    // const standfordBookUrl = `https://searchworks.stanford.edu/browse/nearby?start=${standfordData.response.docs[0].id}&view=gallery`
  //   console.log(standfordBookUrl)

  //   const standfordBookData = await getData(standfordBookUrl, {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   })

  //   console.log(standfordBookData)
  // }

  const articlesData = await getData(articlesURL)
  if (articlesData.docs.length > 0) {
    const bookObj = buildBerkeleyBookObj(articlesData.docs[0].pnx.display, 'Berkeley Articles', inputString)
    if (bookObj) {
      return bookObj
    }
  }

  const worldCatData = await getData(worldCat)
  if (worldCatData.docs.length > 0) {
    const bookObj = buildBerkeleyBookObj(worldCatData.docs[0].pnx.display, 'Berkeley WorldCat', inputString)
    if (bookObj) {
      return bookObj
    }
  }

  const failedSearch = {
    isBerkeley: 'na',
    isStandford: 'na',
    title: 'na',
    publisher: 'na',
    series: 'na',
    totalSeries: 'na',
    numInSeries: 'na',
    CreationDateNewestInSeries: 'na',
    numNewestInSeries: 'na',
    bookFoundAt: 'failedSearch',
    searchedString: inputString
  }

  return failedSearch
}