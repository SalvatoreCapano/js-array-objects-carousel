// DATI:
const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morales',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

const root = document.querySelector(":root");
root.style.setProperty("--thumbnailsNumber", `${images.length}`);

let currentIndex = 0;
let allSlides = [];

const thumbnailsContainer = document.querySelector(".thumbnailsContainer");
let allThumbnails = [];

// Lista delle slide
const slides = document.querySelector(".slides");

// Generazione slide per ogni elemento dell'array "images"
for (let i = 0; i < images.length; i++) {
        
        // Crea nuova slide
        const newSlide = document.createElement("li");
        newSlide.classList.add ("slide");
        newSlide.classList.add ("hidden");
        newSlide.innerHTML = 
        `
        <img src="../${images[i].image}">
        <div class="gameInfo">
            <h3 class="title">${images[i].title}</h3>
            <p class="description">${images[i].text}</p>
        </div>
        `;

        slides.append (newSlide);
        allSlides.push(newSlide);

        // Crea nuova thumbnail
        const newThumbnail = document.createElement("div");
        newThumbnail.classList.add ("thumbnail");
        newThumbnail.style.setProperty("background-image", `url("../../${images[i].image}")`)

        thumbnailsContainer.append (newThumbnail);
        allThumbnails.push(newThumbnail);
}

// Mostra la prima slide e la prima thumbnail
allSlides[currentIndex].classList.remove("hidden");
allThumbnails[currentIndex].classList.add("selected");

//Event Listener Btn Frecce
const leftBtn = document.querySelector("#arrowLeft");
const rightBtn = document.querySelector("#arrowRight");

// Cambia la slide ogni 3 secondi
const autoplay = setInterval(changeSlideAutoplay, 3000);

// Click Freccia SX
leftBtn.addEventListener("click", function(){

    // Cambia slide
    hideCurrentSlide (currentIndex);

    currentIndex = checkPrevIndex (currentIndex);
    
    showNextSlide (currentIndex);

    // Resetta il timer dell'autoplay
    clearInterval(autoplay)
    setTimeout (resetAutoplay, 4000);
});

// Click Freccia DX
rightBtn.addEventListener("click", function(){

    // Cambia slide
    hideCurrentSlide (currentIndex);

    currentIndex = checkNextIndex (currentIndex);

    showNextSlide (currentIndex);

    // Resetta il timer dell'autoplay
    clearInterval(autoplay)
    setTimeout (resetAutoplay, 4000);
});

// Cambia slide al click su una thumbnail
allThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", function() {

        currentIndex = changeSlide (currentIndex, index);

    });
});


// FUNZIONI

// Stabilisce il valore di index
function checkNextIndex (index) {
    // Controllo indice (per ciclo infinito)
    if (index < images.length - 1) {
        index++;
    }
    else if (index == images.length - 1) {
        index = 0;
    }
    return index;
}

// Stabilisce il valore di index
function checkPrevIndex (index) {
    // Controllo indice (per ciclo infinito)
    if (index > 0) {
        index--;
    }
    else if (index == 0) {
        index = images.length - 1;
    }
    return index;
}

// Nasconde la slide corrente
function hideCurrentSlide (i) {
    allSlides[i].classList.add("hidden");
    allThumbnails[i].classList.remove("selected");
}

// Mostra la prossima slide
function showNextSlide (i) {
    allSlides[i].classList.remove("hidden");
    allThumbnails[i].classList.add("selected");
}

// Cambia slide
function changeSlide (i, nextIndex) {

    hideCurrentSlide (i);

    i = nextIndex;

    showNextSlide (i);

    return i;
}

// Cambia la slide automaticamente
function changeSlideAutoplay () {

    let nextIndex = checkNextIndex (currentIndex);
    currentIndex = changeSlide (currentIndex, nextIndex);

    console.log ("Esecuzione autoplay");
}

// Resetta l'autoplay
function resetAutoplay () {
    const autoplay = setInterval(changeSlideAutoplay, 1000);
}