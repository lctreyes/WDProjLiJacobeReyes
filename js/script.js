/*------------------MOVIES NAV FIX (ignore if not needed)---------------------*/
let moviesNav = document.querySelector("nav");
let movieBtn = document.querySelector(".movie-btn");
let closeBTN = document.querySelector(".close-btn");

if (movieBtn) {
    movieBtn.addEventListener("click", function () {
        moviesNav.classList.add("active");
    });
}

if (closeBTN) {
    closeBTN.addEventListener("click", function () {
        moviesNav.classList.remove("active");
    });
}

/*------------------MOVIE FILTER SYSTEM---------------------*/

// Movie data
const movie = [
    {
        id: 1,
        title: "Barbie: Star Light Adventure (2016)",
        Category: "Adventure",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 2,
        title: "Barbie: Spy Squad (2016)",
        Category: "Adventure",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 3,
        title: "Barbie: Epic Road Trip (2022)",
        Category: "Adventure",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 4,
        title: "Barbie: Fairytopia (2005)",
        Category: "Fantasy",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 5,
        title: "Barbie Mariposa (2008)",
        Category: "Fantasy",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 6,
        title: "Barbie: The Pearl Princess (2014)",
        Category: "Fantasy",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 7,
        title: "Barbie as The Princess and the Pauper (2004)",
        Category: "Romance",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 8,
        title: "Barbie in the 12 Dancing Princesses (2006)",
        Category: "Romance",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 9,
        title: "Barbie and the Diamond Castle (2008)",
        Category: "Romance",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 10,
        title: "Barbie Diaries (2006)",
        Category: "Comedy",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 11,
        title: "Barbie: A Fashion Fairytale (2010)",
        Category: "Comedy",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 12,
        title: "Barbie: Princess Charm School (2011)",
        Category: "Comedy",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 13,
        title: "Barbie (2023)",
        Category: "Live",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 14,
        title: "Barbie & Teresa: Recipe for Friendship (2025)",
        Category: "Live",
        img: "/public/asset/raquelle.jpg"
    },
    {
        id: 15,
        title: "Barbie Princess Adventures (2020)",
        Category: "Live",
        img: "/public/asset/raquelle.jpg"
    }
];

const SectionCenter = document.querySelector(".movie_item_container");
const filterBtns = document.querySelectorAll(".btn-cat");

// Load all movies on page load
window.addEventListener("DOMContentLoaded", function () {
    displayMovieItem(movie);
});

// Button filter logic
filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {

        // Remove previous active button
        filterBtns.forEach(b => b.classList.remove("active_btn"));
        e.currentTarget.classList.add("active_btn");

        const Category = e.currentTarget.dataset.id;

        if (Category === "All") {
            displayMovieItem(movie);
            return;
        }

        const movieCategory = movie.filter(function (item) {
            return item.Category === Category;
        });

        displayMovieItem(movieCategory);
    });
});

// Display movies on screen
function displayMovieItem(movieItem) {
    let displayMovie = movieItem.map(function (item) {
        return `
        <div class="asset_cards">
            <img src="${item.img}" alt="">
            <p>${item.title}</p>
        </div>`;
    });

    SectionCenter.innerHTML = displayMovie.join("");
}

