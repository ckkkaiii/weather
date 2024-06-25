document.addEventListener('DOMContentLoaded', function() {
    // displayHourlyWeather(hourlyWeatherData);
});

const api = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation,weather_code&timezone=Asia%2FTokyo&forecast_days=1"

// const hourlyWeatherData = {
//     "time": ["2024-06-19T00:00", "2024-06-19T01:00"],
//     "temperature_2m": [18.5, 18.2],
//     "precipitation": [0.00, 0.00],
//     "weather_code": [3, 3, 2]
// };

function getData() {
    fetch(api)
      .then(response => response.json())
      .then(data => {
        displayHourlyWeather(data.hourly)
        console.log(data)
      });
  }
  getData();

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedMonth = month;
    const formattedDay = day;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}`;
}

function displayHourlyWeather(data) {
    const tbody = document.querySelector('#hourly-weather tbody');
    tbody.innerHTML = ""
    data.time.forEach((time, index) => {
        const row = tbody.insertRow();
        const timeCell = row.insertCell(0);
        const weatherCell = row.insertCell(1);
        const tempCell = row.insertCell(2);
        const precipCell = row.insertCell(3);

        timeCell.textContent = formatDate(new Date(time));
        // console.log(new Date(time).get)
        weatherCell.textContent = convertWeatherCodeToEmoji(data.weather_code[index]);
        // weatherCell.style.fontFamily = 'fawesome';
        tempCell.textContent = `${data.temperature_2m[index]} °C`;
        precipCell.textContent = `${data.precipitation[index]} mm`;

        // console.log(row)
        weatherCell.setAttribute("class", data.precipitation[index] > 0 ? "rainy" : "sunny")
    });
}

function convertWeatherCodeToEmoji(code) {
    const weatherEmojiMap = {
        0: '☀️', // 晴れ
        1: '🌤', // 一部曇り
        2: '⛅️', // 曇り
        3: '☁️', // 非常に曇り
        61: '🌧', // 小雨
        80: '🌧', // 中雨
        55: '🌫', // 霧
        95: '⛈️',
        96: '⛈️',
        99: '⛈️'
    };
    return weatherEmojiMap[code] || '❓'; // 該当する絵文字がない場合は疑問符を返す
}
