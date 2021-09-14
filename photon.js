const auth = "563492ad6f91700001000001c2d679f3950744a2953613ffe7a0491b";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", e => {
    e.preventDefault();
    searchPhotos(searchValue);
})

function updateInput(e) {
    searchValue = e.target.value;
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: "GET", 
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
            <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original}>Download</a>
            </div>
            <img src=${photo.src.large}></img>`;
        gallery.appendChild(galleryImg); 
    });
}

async function curatedPhotos() {
    const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=15");
    generatePictures(data); 
}

async function searchPhotos(query) {
    clear();
    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}+query&pre_page=15`);
    generatePictures(data);
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

curatedPhotos();