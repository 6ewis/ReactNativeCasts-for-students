const rootURL = "http://api.openweathermap.org/data/2.5/weather?APPID=c7fc5fa9d92c6748d147a49f0df04db6";
const kelvinToF = (kelvin) => Math.round(kelvin - 273.15) + '˚C';

export default (latitude, longitude) => {
  const url = `${rootURL}&lat=${latitude}&lon=${longitude}`;

  return fetch(url)
    .then(response => response.json())
    .then(jsonData => {
       return {
         city: jsonData.name,
         temperature: kelvinToF(jsonData.main.temp),
         description: jsonData.weather[0].description
       };
   });
}
