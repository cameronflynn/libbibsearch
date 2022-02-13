export default function buildBerkeleyBookObj(data, lvlOfSearch, inputString) {
    const { title, publisher, series } = data

    if (inputString.toLocaleLowerCase === title[0].toLocaleLowerCase) {
        const berkeleyBookObj = {
            isBerkeley: true,
            isStandford: 'na',
            title: title?.[0] || 'na',
            publisher: publisher?.[0] || 'na',
            series: series?.[0] || 'na',
            totalSeries: 'na',
            numInSeries: 'na',
            CreationDateNewestInSeries: 'na',
            numNewestInSeries: 'na',
            bookFoundAt: lvlOfSearch,
            searchedString: inputString
        }

        // console.log(berkeleyBookObj, 'berkeleyBookObj')

        return berkeleyBookObj
    } else {
        return false
    }
}