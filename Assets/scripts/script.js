var weatherDataSection = document.getElementById("#weatherData");
var searchBtn = document.getElementById("#searchBtn");

function getAPI(){
    var requestUrl = "api.openweathermap.org/data/2.5/forecast?q=London&appid=c87e1cc3e31fb388f96417708873f99c";

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = data[i].html_url;
        repoList.appendChild(listItem);
      }
    });
}

fetchButton.addEventListener('click', getApi);
    
}