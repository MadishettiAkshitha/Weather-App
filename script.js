const apiKey = "e3f6fde9a7c2620190b41660767d56e7";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const error = document.getElementById("error");
  const card = document.getElementById("weatherCard");

  if (!city) {
    error.textContent = "Please enter city name";
    return;
  }

  try {
    error.textContent = "";

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    // show card
    card.classList.remove("hidden");

    // restart animation
    card.style.animation = "none";
    void card.offsetWidth;
    card.style.animation = "popUp 0.5s ease";

    // set data
    document.getElementById("city").textContent = data.name;
    document.getElementById("temp").textContent = `🌡️ ${data.main.temp}°C`;
    document.getElementById("desc").textContent = `☁️ ${data.weather[0].main}`;
    document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `💨 Wind: ${data.wind.speed} m/s`;

  } catch (err) {
    card.classList.add("hidden");
    error.textContent = "City not found. Try again!";
  }
}
