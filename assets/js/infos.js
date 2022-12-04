const showID = localStorage.getItem("storedID")

async function fetchTvShow() {
    let response = await fetch("https://api.tvmaze.com/shows/"+showID)
    if (response.ok === true) {
        let showJSON = await response.json() 
        return showJSON
    }
}


function createInfoPage(showJSON) {
    const createInfoImageContainer = document.createElement("div")
    const createInfoImage = document.createElement("img")
    createInfoImageContainer.setAttribute("class", "infos__image")
    createInfoImage.src = showJSON.image.original
    createInfoImage.alt = `Image de la série "${showJSON.name}"`
    createInfoImageContainer.append(createInfoImage)

    const createInfoTextContainer = document.createElement("div")

    const createInfoTitle = document.createElement("h1")
    createInfoTitle.setAttribute("class", "infos__title text-align")
    const infoTitleContent = document.createTextNode(showJSON.name)
    createInfoTitle.append(infoTitleContent)

    const createInfoResume = document.createElement("h2")
    createInfoResume.setAttribute("class", "infos__resume text-align")
    const infoResumeContent = document.createTextNode("Résumé :")
    createInfoResume.append(infoResumeContent)

    const createInfoSummary = document.createElement("p")
    createInfoSummary.setAttribute("class", "infos__summary")
    const infoSummaryContent = document.createTextNode(showJSON.summary)
    createInfoSummary.append(infoSummaryContent)

    createInfoTextContainer.append(createInfoTitle)
    createInfoTextContainer.append(createInfoResume)
    createInfoTextContainer.append(createInfoSummary)

    document.querySelector(".infosContainer").append(createInfoImageContainer)
    document.querySelector(".infosContainer").append(createInfoTextContainer)
}

fetchTvShow().then(showJSON => createInfoPage(showJSON))

