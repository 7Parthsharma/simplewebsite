// Functions .

const weatherform = document.querySelector(".weatherform");
const cityinput =  document.querySelector(".cityinput");
const card = document.querySelector(".card")
const apikey = "74a900dd0d23e1def41ed9d326a8d210";

weatherform.addEventListener("submit", async event =>{
    event.preventDefault();
    const city = cityinput.value;

    if(city){
        try{
            const weatherdata = await getweatherdata(city);
            displayweatherinfo(weatherdata);

        }
        catch(error){
            console.error(error);
            displayerror(error);
        }

    }
    else{
        displayerror("Please enter a city.")
    }

});

async function getweatherdata(city){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiurl);
    
    if(!response.ok){
        throw new Error("could not fetch weather data");

    }
    return await response.json();


}
function displayweatherinfo(data){

    const {name : city,
           main: {temp, humidity},
           weather: [{description,id}]} = data;
    card.textContent = " ",
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const hummiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    hummiditydisplay.textContent = `Humidity: ${humidity}%`;
    descdisplay.textContent = description;
    weatheremoji.textContent = getweatheremoji(id)

    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    hummiditydisplay.classList.add("humiditydisplay");
    descdisplay.classList.add("descdisplay");
    weatheremoji.classList.add("weatheremoji");
    

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(hummiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatheremoji)

}
function getweatheremoji(weatherid){

    switch(true){
        case (weatherid >= 200 && weatherid < 300):
            return "⚡";
        case (weatherid >= 300 && weatherid < 400):
             return "🌨⚡";
        case (weatherid >= 500 && weatherid < 600):
             return "🌧";
        case (weatherid >= 600 && weatherid < 700):
             return "❄❄";
        case (weatherid >= 700 && weatherid < 800):
             return "🌫";
        case (weatherid === 800):
             return "🌞";
        case (weatherid >= 801 && weatherid < 810):
             return "☁";
        default:
             return "❓";
    }
   

}

function displayerror(meassage){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = meassage;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}