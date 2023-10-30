const ACCESS_KEY = 'f7CX147jJKKeDtX7fuIaGQYoAQnkgSfsl_8W9qoJ8Pk';

const FORM_EL = document.querySelector("form");
const INPUT_EL = document.getElementById("search-input");
const SEARCH_RESULTS = document.querySelector('.search-results');
const SHOW_MORE = document.getElementById("show-more-button");

let inputData ="";
let page=1;

async function searchImages(){
    inputData = INPUT_EL.value;
    const URL = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${ACCESS_KEY}`;

    const RESPONSE = await fetch(URL);
    const DATA = await RESPONSE.json();

    const RESULTS = DATA.results;

    if(page === 1)
    {
        SEARCH_RESULTS.innerHTML = "";
    }

    RESULTS.map((result) => {
        const IMAGE_WRAPPER = document.createElement('div');
        IMAGE_WRAPPER.classList.add("search-result");
        const IMAGE = document.createElement('img');
        IMAGE.src = result.urls.small;
        IMAGE.alt = result.alt_description;
        const IMAGE_LINK = document.createElement('a');
        IMAGE_LINK.href = result.links.html;
        IMAGE_LINK.target = "_blank";
        IMAGE_LINK.textContent = result.alt_description;

        IMAGE_WRAPPER.appendChild(IMAGE);
        IMAGE_WRAPPER.appendChild(IMAGE_LINK);
        SEARCH_RESULTS.appendChild(IMAGE_WRAPPER);
    });

    page++;
    if(page>1)
    {
        SHOW_MORE.style.display = "block";
    }
}

FORM_EL.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

SHOW_MORE.addEventListener("click", (event) => {
  searchImages();
});