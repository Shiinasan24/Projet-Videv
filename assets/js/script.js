
const burger = document.querySelector(".burger");
const wrapperMovie = document.querySelector("#js-wrapperMovie")
const wrapperShow = document.querySelector("#js-wrapperShow")
const showsJson = []
const genreDrama = document.querySelector("#js-genreDrama")

burger.addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("hidden");
    document.querySelector(".menu").classList.toggle("menuOutIn");
    createTest()
})

async function fetchTvShows() {
    let response = await fetch("https://api.tvmaze.com/shows")
    if (response.ok === true) {
        let showsJson = await response.json() 
        return showsJson
    }
}

function shows(showsJson) {
    showsJson.forEach((show) => {
        const showsName = show.name
        const showsGenres = show.genres
        const showsFirstGenre = show.genres[0]
        const showsImageMedium = show.image.medium
        const showsImageOriginal = show.image.original
        const showsDescr = show.summary
        const showsID = show.id
        
        createArticles(showsName, showsImageOriginal, showsFirstGenre, showsDescr)
        createArticlesModal(showsName, showsDescr, showsID)
    })
    // <------------------------- essayer de mettre l'eventlistener closemodal ici
}


function createArticles(showsName, showsImageOriginal, showsFirstGenre, showsDescr) {
    // article
    const createArticle = document.createElement("article")

    // ... div article__content
    const createArticleContainer = document.createElement("div")
    createArticleContainer.setAttribute("class", "article__content js-onClick")

    // ... div filter
    // const createFilter = document.createElement("div")
    // createFilter.setAttribute("class", "filter")

    // ... / ... div article__content__img
    const createImg = document.createElement("div")
    createImg.setAttribute("class", "article__content__img")
    // ... / ... / ... <img>
    const imgContent = document.createElement("img")
    imgContent.src = showsImageOriginal
    imgContent.alt = `Image de la série ${showsName}`
    createImg.append(imgContent)

    // ... / ... h4 article__content__title
    const createTitle = document.createElement("h4")
    createTitle.setAttribute("class", "article__content__title")
    const titleContent = document.createTextNode(`${showsName}, ${showsFirstGenre}`)
    createTitle.append(titleContent)

    createArticle.append(createArticleContainer)
    // createArticleContainer.append(createFilter)
    createArticleContainer.append(createImg)
    createArticleContainer.append(createTitle)
    wrapperShow.append(createArticle)
}

function createArticlesModal(showsName, showsDescr, showsID) {
    const onClick = document.querySelectorAll(".js-onClick")
    
    onClick.forEach((element) => {
        element.addEventListener("click", () => {
            if(!element.classList.contains("isOpen")) {
                const createModal = document.createElement("div")
                createModal.setAttribute("class", "modalDescr")
                createModal.classList.add("animOpen")

                const closeModal = document.createElement("div")
                const closeModalContent = document.createTextNode("X")
                closeModal.setAttribute("class", "closeModal")
                closeModal.append(closeModalContent)
                
                const createModalTitle = document.createElement("h4")
                createModalTitle.setAttribute("class", "modalDescr__title")
                const modalTitleContent = document.createTextNode(showsName)
                createModalTitle.append(modalTitleContent)
                createModal.append(createModalTitle)

                const createModalShowSummary = document.createElement("div")
                createModalShowSummary.setAttribute("class", "modalDescr__summary cutoff-text")
                const modalShowSummaryContent = document.createTextNode(showsDescr)
                createModalShowSummary.append(modalShowSummaryContent)
                const createSummaryButton = document.createElement("button")
                createSummaryButton.innerHTML = "Voir plus"
                createSummaryButton.setAttribute("class", "btn-expand")
                createSummaryButton.dataset.showid = showsID
                createModal.append(createModalShowSummary)
                setTimeout(() => {
                    createModal.append(createSummaryButton)
                    createModal.append(closeModal)
                }, 1000);
                
                element.append(createModal)
                element.classList.add("isOpen")

                
            }
        })
    })
}

function toto() {
    const test = document.querySelectorAll(".closeModal").forEach((modal) => {
        modal.addEventListener("click", () => {
            this.document.querySelector(".modalDescr").classList.add("hidden")
        })
    })
}

// carousel 


          

fetchTvShows().then(showsJson => shows(showsJson))