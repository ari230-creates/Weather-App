// Object to hold our weather functions
let weather = {
    apiKey: "479b93b90b7eadbae312ea5b8051e240",
    // Function to fetch weather data from the API
    fetchWeather : function (city) {
        // Show the loading message, hide the weather display
        document.querySelector(".weather-loading").style.display = "block";
        document.querySelector(".weather-display").style.display = "none";

        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data))
        .catch((error) => {
            console.error("Error fetching weather:", error);
            // Hide loading on error
            document.querySelector(".weather-loading").style.display = "none";
        });
    },

    // Function to display the fetched data on the page
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        // Update the HTML elements with the new data
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";

        // Hide the loading message and show the weather data
        document.querySelector(".weather-loading").style.display = "none";
        document.querySelector(".weather-display").style.display = "block";
    },

    // Function to get the value from the search bar
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

// Add event listener for the search button
document.querySelector(".search-button").addEventListener("click", function () {
    weather.search();
});

// Add event listener for the "Enter" key in the search bar
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// Load a default city's weather on page load
weather.fetchWeather("Delhi");