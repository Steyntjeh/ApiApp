    const topAppBarElement = document.querySelector('.mdc-top-app-bar');
    const topAppBar = new MDCTopAppBar(topAppBarElement);
    
    const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
    
    const listEl = document.querySelector('.mdc-top-app-bar__navigation-icon');
    const buttonDrawer = document.querySelectorAll('.mdc-list-item');
    
    listEl.addEventListener('click', () => {
      openDrawer();
    });
    
    buttonDrawer.forEach((button) => {
        button.addEventListener('click', () => {
            closeDrawer(); 
        });
    });
    
    function openDrawer () 
    {
        drawer.open = true;
    }
    
    function closeDrawer() 
    {
        drawer.open = false;
    }

    const loadCountryAPI = () => {
        // url fetchen
        fetch('../api/api.json')
        .then(res => res.json())
        .then(data => displayCountries(data))
    }

    // alle landen ophalen
    const displayCountries = countries =>{
        //console.log(countries)
        const countriesHTML = countries.map(country => getCountry(country))

        //div laten zien in html
        const container = document.getElementById('countries')
        container.innerHTML = countriesHTML.join(' ');
    }

    // get landen en in html zetten
    const getCountry = (country) => {
        //console.log(country)

        return `
        <li class="mdc-image-list__item ${country.continents}" onclick="showDetails()">
            <h2 id="${country.name.common}">${country.name.common}</h2>
            <img src="${country.flags.png}" title="${country.name.common}">
        </li>
        `
    }

    loadCountryAPI()

const item = document.querySelectorAll(".mdc-tab")
const itemIndicator = document.querySelectorAll(".mdc-tab-indicator")
const buttonTab = document.querySelectorAll(".mdc-tab")

// foreach om op continent te filteren

item.forEach(function(button){
    button.addEventListener('click', () => {
        const placeholder = document.querySelectorAll(".mdc-image-list__item")

        // console.log(placeholder)

        const text = button.querySelector('.continent').textContent
        console.log(text)

        placeholder.forEach(function(element){
            element.classList.add('hidden')
            // console.log("Test")
 
            if (element.classList.contains(text)) {
                    element.classList.remove("hidden")
                }
        })
    })
})

// filter eraf halen

topAppBarElement.addEventListener("click", () => {
    
    const placeholder = document.querySelectorAll(".mdc-image-list__item")


    item.forEach(function(element){ 
        if (element.classList.contains("mdc-tab--active")) {
            element.classList.remove('mdc-tab--active')
        }
    })

    itemIndicator.forEach(function(element){ 
        if (element.classList.contains("mdc-tab-indicator--active")) {
            element.classList.remove('mdc-tab-indicator--active')
        }
    })

    placeholder.forEach(function(element){
        element.classList.remove("hidden")
    })

});


const zoek = document.querySelector(".zoek")
let countriesData = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('../api/api.json')
        .then(response => response.json())
        .then(data => {
            countriesData = data;
        })
        .catch(error => console.error('Error loading JSON:', error));
});


// het zoeken van de landen 
function searchCountry() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');

    if (!searchInput) {
        resultsDiv.innerHTML = '<p>Voer een landnaam in.</p>';
        return;
    }

    const filteredCountries = countriesData.filter(country => 
        country.name.common.toLowerCase().includes(searchInput)
    );

    displayResults(filteredCountries);
}

function displayResults(countries) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // als land niet bestaat aangeven dat het land niet gevonden kon worden

    if (countries.length === 0) {
        resultsDiv.innerHTML = '<p>Geen landen gevonden.</p>';
        return;
    }

    // als gevonden is land met details ophalen
    countries.forEach(country => {
        const countryDiv = document.createElement('div');

        // niet bij elk land de talen en currency's ivm aanpassen van de json file (Meer dan de helft doet het wel)
        countryDiv.innerHTML = `
            <div class="results">
                <img src="${country.flags.png}">
                <br>
                <h2>${country.name.common} (${country.fifa})</h2>
                <br>
                <p>Official name: ${country.name.official}</p>
                <p>Capital: ${country.capital}</p>
                <p>Continent: ${country.continents}</p>
                <p>Languages: ${country.languages}</p>
                <p class="timezone">Timezones: ${country.timezones}</p>
                <p>Currency: ${country.currencies.name}</p>
            </div>
        `;
        resultsDiv.appendChild(countryDiv);
    });
}

// sheet aanroepen
const sheet = document.querySelector(".sheet")
const sheetTitle = document.querySelector(".sheet-title")
const fotoSheet = document.querySelector(".image-sheet")
const body = document.querySelector("body")
const details = document.querySelector("details")
const countryName = document.querySelector(".countryName")

    function showDetails(){ 

        const placeholder = document.querySelectorAll(".mdc-image-list__item")

        placeholder.forEach(function(element){
            
            // een of andere manier laat ie altijd bij de eerste het standaard zien. 
            // heel lang naar gezocht hoe aan te passen niet kunnen vinden 

            element.addEventListener("click", function(){

                const title = element.getElementsByTagName('img')[0].title
                sheetTitle.textContent = title

                fotoSheet.src = element.querySelector("img").src

                countryName.textContent = title

            })
        })
        
        body.classList.add("sheetOpen")

        sheet.classList.remove("sheet-out-of-view")

        const state = { page_id: 1, user_id: 5 };
        let url = location.pathname + "?";
        
        history.pushState(state, "", url);
    
        window.scrollTo({
            top: 0
        })

    }

const close = document.querySelector(".close")

function back() {
    const state = { page_id: 1, user_id: 5 };
    url = location.pathname;
    
    history.pushState(state, "", url);    

    sheet.classList.add("sheet-out-of-view")
    body.classList.remove("sheetOpen")
}

close.addEventListener('click', () => {

    back()

})

addEventListener("popstate", (event) => {

    back()

});