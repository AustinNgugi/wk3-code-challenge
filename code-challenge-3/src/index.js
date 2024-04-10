// Your code here
document.addEventListener("DOMContentLoaded", function() {    const ul = document.getElementById("films");

    // Function to fetch movie data and list the movies
    function movieLists() {
        fetch("https://json-server-ru4s.onrender.com")
        .then(response => response.json())
        .then(data => {
            data.forEach(movie => {
                const li = document.createElement("li");
                li.textContent = movie.title;
                li.classList.add("film", "item");
                if (movie.tickets_sold === movie.capacity) {
                    li.classList.add("sold-out");
                    li.textContent = " (Sold Out)";
                }
                li.addEventListener("click", function() {
                    const image = document.getElementById("poster");
                    const description = document.getElementById("film-info");
                    const movieTitle = document.getElementById("title");
                    const runTime = document.getElementById("runtime");
                    const showTime = document.getElementById("showtime");
                    
                    image.src = movie.poster;
                    description.textContent = movie.description;
                    movieTitle.textContent = movie.title;
                    runTime.textContent = movie.runtime + " minutes";
                    showTime.textContent = movie.showtime;
                });
                ul.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching movie data:", error));
    }

    
    

    // Event listener whose main function is to handle buying of tickets
    ul.addEventListener("click", function(event) {
        if (event.target && event.target.matches("li.film.item")) {
            const movieId = event.target.dataset.id;
            buyTicket(movieId);
        }
    });

    // Remove the placeholder li element
    const placeholderLi = document.getElementById("placeholder");
    if (placeholderLi) {
        placeholderLi.remove();
    }

    // Populate the film list on page load
    movieLists();
});
