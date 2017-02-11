$(document).ready(function() {
	var longitude;
	var latitude;
	var openWeatherMapAPI;
	var cityAPI;
	var celcius;
	var fahrenheit;
	var kelvin;
	var descriptionId;
	var description;
	var city;
	var country;

	getLocation();

	function getLocation() {
		if (window.chrome) {
			$.getJSON('http://ip-api.com/json', function(json) {
				latitude = json.lat;
				longitude = json.lon;
				// Make API with geolocation
				openWeatherMapAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=d2a60c2e424bea435ac65d3ab3523aea";
				getWeather();
			});
		} else {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(data) {
					latitude = data.coords.latitude;
					longitude = data.coords.longitude;
					// Make API with geolocation
					console.log(data);
					openWeatherMapAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=d2a60c2e424bea435ac65d3ab3523aea";
					getWeather();
				});
			}
		}
	}

	function getWeather() {
		// JSON call for weather API
		$.getJSON(openWeatherMapAPI, function(json) {
			kelvin = json.main.temp;
			description = json.weather[0].description;
			descriptionId = json.weather[0].id;
			city = json.name;
			country = json.sys.country;

			changeBackground();

			//Change background
			function changeBackground() {
				console.log(descriptionId);
				if (descriptionId >= 951 && descriptionId <= 956) {
					$("body").css("background-image", "url(http://laetitiatam.com/fccthings/weatherimgs/clearsky.jpeg)");
				} else if (descriptionId >= 900) {
					$("body").css("background-image", "url(http://laetitiatam.com/fccthings/weatherimgs/storm.jpg)");
				} else if (descriptionId > 800) {
					$("body").css("background-image", "url(http://laetitiatam.com/fccthings/weatherimgs/clouds.jpg)");
				} else if (descriptionId == 800) {
					$("body").css("background-image", "url(http://laetitiatam.com/fccthings/weatherimgs/clearsky.jpeg)");
				} else if (descriptionId > 700) {
					$("body").css("background-image", "url(http://laetitiatam.com/fccthings/weatherimgs/haze.jpg)");
				} else if (descriptionId >= 600) {
					$("body").css("background-image", "url(http://laetitiatam.com/fccthings/weatherimgs/snow.jpg)");
				} else if (descriptionId >= 300) {
					$("body").css("background-image", "url(http://laetitiatam.com/fccthings/weatherimgs/drizzle.jpg)");
				} else {
					$("body").css("background-image", "url(http://laetitiatam.com/fccthings/weatherimgs/thunderstorm.jpg)");
				}
			}

			// Convert temperatures
			celcius = (kelvin - 273.15).toFixed(1);
			fahrenheit = (kelvin * 9 / 5 - 459.67).toFixed(1);

			// Toggle C and F
			$("#c-btn").click(function() {
				$("#temperature").html(celcius);
			});
			$("#f-btn").click(function() {
				$("#temperature").html(fahrenheit);
			});

			// Populate divs
			$("#city").empty().append(city);
			$("#country").html(country);
			$("#weather-description").html(description);
			$("#temperature").html(celcius);
			$("#precipitation").html(precipitation);
			$("#wind-speed").html(windSpeed);

		});

	}

});
