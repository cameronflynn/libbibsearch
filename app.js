import fs from 'fs'
import ObjectsToCsv from 'objects-to-csv'
import searchBook from './searchBook.js'
import secondsToTimeString from './helpers/secondsToTimeString.js'

const buildcsv = true

async function init() {
    let searches = []

    fs.readFile('books.txt', async function (error, data) {
        if (error) {
            throw error
        }

        const searchTermsArray = data.toString().split('\n')

        for (let i = 0; i < searchTermsArray.length; i++) {
            const line = searchTermsArray[i]
            console.log(i, line)
            let searchResult = await searchBook(line)
            searches.push(searchResult)
        }

        console.log(searches, 'searches array')


        if (buildcsv) {
            const date = new Date().getTime()
            const dateString = secondsToTimeString(date).replace(':', '_')

            const csv = new ObjectsToCsv(searches)
            await csv.toDisk(`./csv/${dateString}.csv`)
        }
    })
}

init()
