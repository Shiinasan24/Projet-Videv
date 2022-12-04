// ======================================================================
// =============================  VARIABLES  ============================
// ======================================================================

// Of index.html
const burger = document.querySelector(".burger");
const wrapperMovie = document.querySelector("#js-wrapperMovie")
const wrapperShow = document.querySelector("#js-wrapperShow")
const genreDrama = document.querySelector("#js-genreDrama")

// Of infos.html
const infoWrapper = document.querySelector(".infosContainer")
const infoImage = document.querySelector("#js-contentImage")
const infoTitle = document.querySelector("#js-contentTitle")
const infoSummary = document.querySelector("#js-contentSummary")

// ======================================================================
// =============================  FUNCTIONS  ============================
// ======================================================================

// ----------------------------------------------------------------------
// Fetch TV SHOWS
async function fetchTvShows() {
    let response = await fetch("https://api.tvmaze.com/shows")
    if (response.ok === true) {
        let showsJson = await response.json() 
        return showsJson
    }
}

burger.addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("hidden");
    document.querySelector(".menu").classList.toggle("menuOutIn");
    createTest()
})


// ----------------------------------------------------------------------
// Main function
function shows(showsJson) {
    showsJson.forEach((show) => {
        const showsName = show.name
        const showsGenres = show.genres
        const showsFirstGenre = show.genres[0]
        const showsImageMedium = show.image.medium
        const showsImageOriginal = show.image.original
        const showsDescr = show.summary
        const showsID = show.id
        
        createArticles(showsName, showsImageOriginal)
        createArticlesModal(showsName, showsGenres, showsDescr, showsID)
    })
}

// ------------------------------------------
// Creates card based on fetchTvShows content
// ------------------------------------------

function createArticles(showsName, showsImageOriginal) {
    // Creates an article
    const createArticle = document.createElement("article")
    
    // ... with a div container
    const createArticleContainer = document.createElement("div")
    createArticleContainer.setAttribute("class", "article__content js-onClick")

    // .../... wich contains an <img> within a div
    const createImg = document.createElement("div")
    createImg.setAttribute("class", "article__content__img")
    const imgContent = document.createElement("img")
    imgContent.src = showsImageOriginal
    imgContent.alt = `Image de la série ${showsName}`
    createImg.append(imgContent)
    
    // ... / ... and a h4
    const createTitle = document.createElement("h4")
    createTitle.setAttribute("class", "article__content__title")
    const titleContent = document.createTextNode(`${showsName}`)
    createTitle.append(titleContent)
    
    createArticle.append(createArticleContainer)
    createArticleContainer.append(createImg)
    createArticleContainer.append(createTitle)
    wrapperShow.append(createArticle)
}

// -------------------------------
// Creates a modal on a card click
// -------------------------------

function createArticlesModal(showsName, showsGenres, showsDescr, showsID, showsImageOriginal) {
    // Selects cards
    const onClick = document.querySelectorAll(".js-onClick")
    
    // For each card
    onClick.forEach((element) => {

        // ...On card click
        element.addEventListener("click", () => {

            // ...Creates a modal with:
            if(!element.classList.contains("isOpen")) {

                // - Container
                const createModal = document.createElement("div")
                createModal.setAttribute("class", "modalDescr")
                createModal.classList.add("animOpen")

                // - Close Button
                const closeModal = document.createElement("div")
                const closeModalContent = document.createTextNode("X")
                closeModal.setAttribute("class", "closeModal")
                closeModal.append(closeModalContent)
                
                // - Title
                const createModalTitle = document.createElement("h4")
                createModalTitle.setAttribute("class", "modalDescr__title")
                const modalTitleContent = document.createTextNode(showsName)
                createModalTitle.append(modalTitleContent)
                createModal.append(createModalTitle)

                // - Genres
                const createModalGenreTitle = document.createElement("p")
                createModalGenreTitle.innerText = "Genre"
                createModal.append(createModalGenreTitle)
                const createModalGenres = document.createElement("div")
                createModalGenres.setAttribute("class", "modalDescr__genres")
                showsGenres.forEach(genre => {
                    const genresContainer = document.createElement("span")
                    genresContainer.setAttribute("class", "modalDescr__genres__genre")
                    const modalGenresContent = document.createTextNode(genre)
                    genresContainer.append(modalGenresContent)
                    createModalGenres.append(genresContainer)
                })
                createModal.append(createModalGenres)

                // - Summary
                const createModalShowSummary = document.createElement("div")
                const createSummary = document.createElement("p")
                createSummary.style.marginBottom = "10px"
                const summaryContent = document.createTextNode("Résumé :")
                createSummary.append(summaryContent)
                createModalShowSummary.append(createSummary)
                createModalShowSummary.setAttribute("class", "modalDescr__summary cutoff-text")
                const modalShowSummaryContent = document.createTextNode(showsDescr)
                createModalShowSummary.append(modalShowSummaryContent)

                // - showMore Button
                const createSummaryButton = document.createElement("a")
                createSummaryButton.href = "/infos.html"
                createSummaryButton.innerHTML = "Voir plus"
                createSummaryButton.setAttribute("class", "btn-expand")
                createSummaryButton.dataset.showid = showsID
                createModal.append(createModalShowSummary)

                element.classList.add("isOpen")

                // Set timeout on modal's buttons of 1s (opening time of the modal)
                setTimeout(() => {
                    createModal.append(createSummaryButton)
                    createModal.append(closeModal)

                    // Listener on modal's showMore button 
                    createSummaryButton.addEventListener("mouseover", () => {
                        const storedID = showsID
                        localStorage.setItem("storedID", storedID)
                    })
                    
                    // Listener on modal's close button click
                    closeModal.addEventListener("click", () => {
                        element.querySelector(".btn-expand").remove()
                        closeModal.parentElement.classList.remove("animOpen")
                        closeModal.parentElement.classList.add("animClose")
                        setTimeout(() => {
                            closeModal.parentElement.classList.remove("animClose")
                            element.classList.remove("isOpen")
                            closeModal.parentElement.remove(".modalDescr")
                        }, 850);
                    })
                }, 1000);
                
                element.append(createModal)
            }
        })
    })
}

// ======================================================================

// Carousel 


fetchTvShows().then(showsJson => shows(showsJson))