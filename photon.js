const auth = "563492ad6f91700001000001c2d679f3950744a2953613ffe7a0491b";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector("submit-btn");
let searchValue;

async function curatedPhotos() {
    const dataFetch = await fetch(
        "https://api.pexels.com/v1/curated?per_page=15",
        {
            method: "GET", 
            headers: {
                Accept: "application/json",
                Authorization: auth
            }
        }
    );
    const data = await dataFetch.json();
    data.photos.forEach(photo => {
        console.log(photo)
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>`;
        gallery.appendChild(galleryImg); 
    });
}

curatedPhotos();