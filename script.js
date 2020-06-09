// Write your JavaScript code here!

function init() {
   let form = document.querySelector('form');
   fetch("https://handlers.education.launchcode.org/static/planets.json")
            .then(function(response){
               response.json().then(function(json){
                  console.log(json);
                  let idx = Math.floor(Math.random() * (json.length));
                  console.log(idx);
                  let missionTarget = document.getElementById('missionTarget');
                  missionTarget.innerHTML = 
                  `<h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${json[idx].name}</li>
                     <li>Diameter: ${json[idx].diameter}</li>
                     <li>Star: ${json[idx].star}</li>
                     <li>Distance from Earth: ${json[idx].distance}</li>
                     <li>Number of Moons: ${json[idx].moons}</li>
                  </ol>
                  <img src="${json[idx].image}">
                  `
               });
            });
   form.addEventListener('submit', function(event){
      event.preventDefault();

      let pilotNameInput = document.querySelector('input[name=pilotName]');
      let copilotNameInput = document.querySelector('input[name=copilotName]');
      let fuelLevelInput = document.querySelector('input[name=fuelLevel]');
      let cargoMassInput = document.querySelector('input[name=cargoMass]');

      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required");
         event.preventDefault();
      }
      else if (!/^[a-zA-Z]+$/.test(pilotNameInput.value) || !/^[a-zA-Z]+$/.test(copilotNameInput.value) || isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)) {
         alert("Make sure to enter valid information for each field!");
         // event.preventDefault();
      }
      else {
         document.getElementById('faultyItems').style.visibility = "visible";
         document.getElementById('pilotStatus').innerHTML = `${pilotNameInput.value} is ready for launch`;
         document.getElementById('copilotStatus').innerHTML = `${copilotNameInput.value} is ready for launch`;
         let launchStatus = document.getElementById('launchStatus');
         let fuelStatus = document.getElementById('fuelStatus');
         let cargoStatus = document.getElementById('cargoStatus');
         if (fuelLevelInput.value < 10000 || cargoMassInput.value > 10000) {
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = 'red';
            if (fuelLevelInput.value < 10000) {
               fuelStatus.innerHTML = "Fuel level too low for launch."
            }
            if (cargoMassInput.value > 10000) {
               cargoStatus.innerHTML = "Cargo mass too high for launch."
            }  
         }
         else {
            launchStatus.innerHTML = "Shuttle is ready for launch";
            launchStatus.style.color = 'green';
         }
         // event.preventDefault();
      }
      
      
   })
}
window.onload = init;
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
