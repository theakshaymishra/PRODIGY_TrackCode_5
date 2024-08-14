const myHeaders = new Headers();
myHeaders.append("apikey", "beh5GNTmVHXtBIyM");
myHeaders.append("x-apihub-key", "");
myHeaders.append("x-apihub-host", "Historical-Weather-API2.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "753a5398-d4fa-4869-a2f3-735b6c7e5e22");

const requestOptions = {
   method: "GET",
   headers: myHeaders,
   redirect: "follow"
};

const searchButton = document.querySelector('button');
const searchInput = document.querySelector('input');
const weatherIcon = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

searchButton.addEventListener('click', () => {
    const city = searchInput.value;
    const latitude = 28.7041;
    const longitude = 77.1025;
    const startDate = "2024-07-09"; 
    const endDate = "2024-07-23"; 
    
    const apiUrl = `https://Historical-Weather-API2.proxy-production.allthingsdev.co/v1/archive?latitude=${latitude}&longitude=${longitude}&elevation=1603&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m&tilt=0&azimuth=0&models=best_match&daily=weather_code&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm&timeformat=iso8601&timezone=auto&cell_selection=land`;

    fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                updateWeather(data);
            } else {
                alert('City not found or data unavailable. Please try again.');
            }
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
});

function updateWeather(data) {
    const { temperature_2m, humidity, wind_speed } = data.hourly || {};

    tempElement.textContent = `${temperature_2m[0]}°C`; 
    humidityElement.textContent = `${humidity[0]}%`;
    windElement.textContent = `${wind_speed[0]} km/h`;

    cityElement.textContent = "Delhi"; 
    weatherIcon.src = "weatherSource/weather.png"; 
}
