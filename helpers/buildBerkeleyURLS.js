const ucBerkeleyURLSettings = {
    libraryCatalog: {
        scope: 'MyInstitution',
        tab: 'LibraryCatalog'
    },
    articles: {
        scope: 'DN_and_CI',
        tab: 'Default_UCLibrarySearch'
    },
    worldCat: {
        scope: 'WorldCat',
        tab: 'WorldCat'
    }
}

export default function buildBerkeleyURLS(inputString) {
    const ucBerkeleyAllApiURLS = []

    for (const typeOfSearch in ucBerkeleyURLSettings) {
        const ucBerkeleyBaseURL = `https://search.library.berkeley.edu/primaws/rest/pub/pnxs?blendFacetsSeparately=false&disableCache=false&getMore=0&inst=01UCS_BER&lang=en&limit=10&mode=advanced&newspapersActive=false&newspapersSearch=false&offset=0&pcAvailability=true&q=title,contains,${inputString},AND&qExclude=&qInclude=&rapido=false&refEntryActive=false&rtaLinks=true&scope=${ucBerkeleyURLSettings[typeOfSearch].scope}&skipDelivery=Y&sort=rank&tab=${ucBerkeleyURLSettings[typeOfSearch].tab}&vid=01UCS_BER:UCB`
        ucBerkeleyAllApiURLS.push(ucBerkeleyBaseURL)
    }

    return ucBerkeleyAllApiURLS
}