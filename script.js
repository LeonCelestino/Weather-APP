// API LINK : 
// `https://api.open-meteo.com/v1/forecast?latitude=-25.60&longitude=-49.34&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_180m&daily=weathercode,sunrise,sunset&timezone=America%2FSao_Paulo`
const city = document.querySelectorAll('.city');
const day = document.querySelectorAll('.day');
const temp = document.querySelectorAll('.temp');
const humidity = document.querySelectorAll('.humidity');
const windSpeed = document.querySelectorAll('.wind-speed');
const sunrise = document.querySelectorAll('.sunrise');
const sunset = document.querySelectorAll('.sunset');

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const date = new Date();
const dayArr = [date.getDay(), date.getDay() + 1, date.getDay() + 2, date.getDay() + 3]

/* This function return array chunks. Need three arguments: the array, the index and innerIndex which
   loop through the chunks */



const chunk = (array, index, innerIndex) => {
    const chunkSize = 24;
    let arrayWithChunks = [];


    for (let i = 0; i < array.length; i += chunkSize) {
        arrayWithChunks.push(array.slice(i, i + chunkSize))


    }

    return arrayWithChunks[index][innerIndex]
}

city.forEach((el, index) => {
    fetchedData('', temp[index], index, 'hourly', 'temperature_2m', '°C');
    fetchedData('', humidity[index], index, 'hourly', 'relativehumidity_2m', '%')
    fetchedData('', windSpeed[index], index, 'hourly', 'windspeed_180m', 'km/h');
    fetchedData('sunrise', sunrise[index], index);
    fetchedData('sunset', sunset[index], index);
    day[index].innerHTML = weekDays[dayArr[index] % 7]

});

async function fetchedData(sun, el, index, arr, innerArr, unit, longitude, latitude) {
    const fetching = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-25.43&longitude=-49.27&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_180m&daily=weathercode,sunrise,sunset&timezone=America%2FSao_Paulo');
    const response = await fetching.json();
    const time = new Date(response.daily[sun] ? response.daily[sun][index] : null);

    el.innerHTML = sun == 'sunrise' || sun == 'sunset' ?
        time.getHours() + ':' + time.getMinutes() + 'h' :
        chunk(response[arr][innerArr], index, date.getHours() - 1) + `${unit}`

}
