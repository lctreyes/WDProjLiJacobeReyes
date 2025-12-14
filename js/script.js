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
    // ADVENTURE
    {
        id: 1,
        title: "Barbie: Star Light Adventure (2016)",
        Category: "Adventure",
        img: "./public/asset/movie.jpg"
    },
    {
        id: 2,
        title: "Barbie: Spy Squad (2016)",
        Category: "Adventure",
        img: "./public/asset/movie2.png"
    },
    {
        id: 3,
        title: "Barbie: Epic Road Trip (2022)",
        Category: "Adventure",
        img: "./public/asset/movie3.jpg" 
    },

    // FANTASY
    {
        id: 4,
        title: "Barbie: Fairytopia (2005)",
        Category: "Fantasy",
        img: "./public/asset/movie4.jpg"
    },
    {
        id: 5,
        title: "Barbie Mariposa and Her Butterfly Fairy Friends (2008)",
        Category: "Fantasy",
        img: "./public/asset/movie5.jpg"
    },
    {
        id: 6,
        title: "Barbie: The Pearl Princess (2014)",
        Category: "Fantasy",
        img: "./public/asset/movie6.png"
    },

    // ROMANCE
    {
        id: 7,
        title: "Barbie as The Princess and the Pauper (2004)",
        Category: "Romance",
        img: "./public/asset/movie7.png"
    },
    {
        id: 8,
        title: "Barbie in the 12 Dancing Princesses (2006)",
        Category: "Romance",
        img: "./public/asset/movie8.png"
    },
    {
        id: 9,
        title: "Barbie and the Diamond Castle (2008)",
        Category: "Romance",
        img: "./public/asset/movie9.png"
    },

    // COMEDY
    {
        id: 10,
        title: "Barbie Diaries (2006)",
        Category: "Comedy",
        img:"./public/asset/movie10.png" 
    },
    {
        id: 11,
        title: "Barbie: A Fashion Fairytale (2010)",
        Category: "Comedy",
        img: "./public/asset/movie11.jpg"
    },
    {
        id: 12,
        title: "Barbie: Princess Charm School (2011)",
        Category: "Comedy",
        img: "./public/asset/movie12.png"
    },

    // LIVE ACTION
    {
        id: 13,
        title: "Barbie (2023)",
        Category: "Live",
        img: "./public/asset/movie13.jpg"
    },
    {
        id: 14,
        title: "Barbie & Teresa: Recipe for Friendship (2025)",
        Category: "Live",
        img: "./public/asset/movie14.jpg"
    },
    {
        id: 15,
        title: "Barbie Princess Adventures (2020)",
        Category: "Live",
        img: "./public/asset/movie15.png"
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
