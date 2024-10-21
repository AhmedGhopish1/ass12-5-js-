"use strict"

let dayName=document.querySelector("#day-name");
let dayDate=document.querySelector("#day-date");
let city=document.querySelector("#city");
let temp=document.querySelector("#temp");
let state=document.querySelector("#state");
let statImage=document.querySelector("#data-image")
let ump=document.querySelector("#icon-umberella");
let wind=document.querySelector("#wind");
let compass=document.querySelector("#compass");


let nextDay=document.getElementsByClassName("next-day");
let nextTemp=document.getElementsByClassName("next-day-temp");
let nextMinTemp=document.getElementsByClassName("next-min-temp");
let nextDayState=document.getElementsByClassName("next-state");
//console.log(nextDayState)
let nextIMage=document.getElementsByClassName("img-next")


// let tomDay=document.querySelector(".tomorow-day");
// let tomTemp=document.querySelector(".tomorow-day-temp");
// let tomMinTemp=document.querySelector(".tom-min-temp");
// let tomState=document.querySelector(".tomorow-state");
//let imgNext1=document.querySelector(".img-next")
// let imgNext2=document.querySelector(".img-next2")


// let afterTomDay=document.querySelector(".after-tom-name");
// let afterTomTemp=document.querySelector(".after-tom-temp");
// let afterTomMinTemp=document.querySelector(".after-tom-min-temp");
// let afterTomState=document.querySelector(".after-tom-state");


var searchInput=document.querySelector(".search-btn");



async function getData(city)
{
   let request= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ed901efbdd42451fa79225810241210&q=${city}&days=3`);
   let response = await request.json();
   return response;
}




function dislayToDay(data)
{
   let date = new Date();
   dayName.textContent=`${date.toLocaleDateString("en-us",{weekday:"long"})}`
   dayDate.textContent=`${date.getDate() + date.toLocaleDateString("en-us",{month:"long"})}`
   city.textContent=`${data.location.name}`;
   temp.textContent=`${data.current.temp_c+"oC"}`;
   statImage.setAttribute("src",`https:`+data.current.condition.icon)
   state.textContent=`${data.current.condition.text}`
   ump.lastElementChild.textContent=`${data.current.humidity+"%"}`;
   wind.lastElementChild.textContent=`${data.current.wind_kph+"km/h"}`;
   compass.lastElementChild.textContent=`${data.current.wind_dir}`;

   
}



function displayNextData(data)
{
   

   let nextDaysData=data.forecast.forecastday;
   for(let i=0;i<2;i++)
   {
      let nextDate = new Date(nextDaysData[i+1].date);

      nextDay[i].textContent=`${nextDate.toLocaleDateString("en-us",{weekday:"long"})}`
      nextTemp[i].textContent=`${nextDaysData[i+1].day.maxtemp_c}`;
      nextMinTemp[i].textContent=`${nextDaysData[i+1].day.mintemp_c}`;
      nextDayState[i].textContent=`${nextDaysData[i+1].day.condition.text}`;
      nextIMage[i].setAttribute("src",`https:`+nextDaysData[i+1].day.condition.icon);


   }

   // tomTemp.textContent = `${data.forecast.forecastday[1].day.maxtemp_c + " oC"}`;
   // tomMinTemp.textContent = `${data.forecast.forecastday[1].day.mintemp_c + " oC"}`;
   // tomState.textContent = `${data.forecast.forecastday[1].day.condition.text}`;
   // imgNext1.setAttribute("src", data.forecast.forecastday[1].day.condition.icon)

   // afterTomTemp.textContent = `${data.forecast.forecastday[2].day.maxtemp_c + " oC"}`;
   // afterTomMinTemp.textContent = `${data.forecast.forecastday[2].day.mintemp_c + " oC"}`;
   // afterTomState.textContent = `${data.forecast.forecastday[2].day.condition.text}`;
   // imgNext2.setAttribute("src", data.forecast.forecastday[2].day.condition.icon)

}




 async function displayProject(cityName="cairo")
 {
   let responseData=await getData(cityName);
   dislayToDay(responseData);
   displayNextData(responseData);
   
 }
 displayProject()


 searchInput.addEventListener("input",function(){
   displayProject(searchInput.value);
 })

 