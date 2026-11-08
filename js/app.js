
const baseUrl = "https://api.giphy.com/v1/gifs";

// = page elements
const grid = document.getElementById("gifGrid");
const statusText = document.getElementById("status");
const modal = document.getElementById("modal");
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

let allGifs = [];
let selectedGif = null;

// = mobile
if (burger) {
    burger.addEventListener("click", function () {
        menu.classList.toggle("open");
    });
}

// = message
function showMessage(text, isError) {
    statusText.textContent = text;
    if (isError) {
        statusText.classList.add("error");
    } else {
        statusText.classList.remove('error');
    }
}

async function getGifs(url) {
    showMessage("Loading GIFs..", false);
    grid.innerHTML = "";
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            showMessage("GIPHY error " + response.status + ". Check your API key.", true);
            return;
        }
    

     const result = await response.json();

     allGifs = result.data.filter(function (gif) {
        return gif.images && gif.images.original;
     });

     if (allGifs.length === 0) {
        showMessage("No Gifs found. Try again", false);
        return;
     }

     showMessage("", false);
     showGifs();
    } catch (error) {
        showMessage("Something went Batty! Check your Api key or internet.", true);
    }
} 

function getTrending() {
    const url = baseUrl + "/trending?api_key=" + apiKey + "&limit=24&rating=g";
    getGifs(url);
}

function searchGifs(keyword) {
    const url = baseUrl + "/search?api_key=" + apiKey + "&q=" + encodeURIComponent(keyword) + "&limit=24&rating=g";
    getGifs(url);
}

// show gif
function showGifs() {
    grid.innerHTML = "";

    allGifs.forEach(function (gif) {
        grid.innerHTML += `
         <div class="card">
          <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
          <h3>${gif.title}</h3>
          <button>Detail</button>
         </div>
        `;
    });

    // click to every card
    const cards = document.querySelectorAll(".card");
    cards.forEach(function (card, index) {
        card.addEventListener("click", function () {
            openModal(allGifs[index]);
        });
    });
}

// Modal
function openModal(gif) {
    selectedGif = gif;
    document.getElementById("modalImg").src = gif.images.original.url;
    document.getElementById("modalTitle").textContent = gif.title;
    document.getElementById("giphyLink").href = gif.url;
    document.getElementById("copyMsg").textContent = "";
    modal.hidden = false;
}

function closeModal() {
    modal.hidden = true;
}

async function copyUrl() {
    try {
    await navigator.clipboard.writeText(selectedGif.images.original.url);
    document.getElementById("copyMsg").textContent = "GIF URL copied";
     } catch (error) {
    document.getElementById("copyMsg").textContent = "Could not copy the URL.";
     }
}

if (modal) {
   document.getElementById("closeModal").addEventListener("click", closeModal);
    document.getElementById("copyBtn").addEventListener("click", copyUrl);
}

// home page search
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")

function doSearch() {
    const keyword = searchInput.value.trim();

    if (keyword === "") {
        showMessage("Please type something to satisfy your wonder.", true);
        return;
    }

    document.getElementById("sectionTitle").textContent = "Results for " + keyword;
    searchGifs(keyword);
}

if (searchInput) {
    searchBtn.addEventListener("click", doSearch);

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            doSearch();
        }
    });

    getTrending();
}
