var states=[
  {
    "state":"Alaska",
    "latitude":61.3850,
    "longitude":-152.2683
  },
  {
    "state":"Alabama",
    "latitude":32.7990,
    "longitude":-86.8073
  },
  {
    "state":"Arkansas",
    "latitude":34.9513,
    "longitude":-92.3809
  },
  {
    "state":"Arizona",
    "latitude":33.7712,
    "longitude":-111.3877
  },
  {
    "state":"California",
    "latitude":36.1700,
    "longitude":-119.7462
  },
  {
    "state":"Colorado",
    "latitude":39.0646,
    "longitude":-105.3272
  },
  {
    "state":"Connecticut",
    "latitude":41.5834,
    "longitude":-72.7622
  },
  {
    "state":"Delaware",
    "latitude":39.3498,
    "longitude":-75.5148
  },
  {
    "state":"Florida",
    "latitude":27.8333,
    "longitude":-81.7170
  },
  {
    "state":"Georgia",
    "latitude":32.9866,
    "longitude":-83.6487
  },
  {
    "state":"Hawaii",
    "latitude":21.1098,
    "longitude":-157.5311
  },
  {
    "state":"Iowa",
    "latitude":42.0046,
    "longitude":-93.2140
  },
  {
    "state":"Idaho",
    "latitude":44.2394,
    "longitude":-114.5103
  },
  {
    "state":"Illinois",
    "latitude":40.3363,
    "longitude":-89.0022
  },
  {
    "state":"Indiana",
    "latitude":39.8647,
    "longitude":-86.2604
  },
  {
    "state":"Kansas",
    "latitude":38.5111,
    "longitude":-96.8005
  },
  {
    "state":"Kentucky",
    "latitude":37.6690,
    "longitude":-84.6514
  },
  {
    "state":"Louisiana",
    "latitude":31.1801,
    "longitude":-91.8749
  },
  {
    "state":"Massachusetts",
    "latitude":42.2373,
    "longitude":-71.5314
  },
  {
    "state":"Maryland",
    "latitude":39.0724,
    "longitude":-76.7902
  },
  {
    "state":"Maine",
    "latitude":44.6074,
    "longitude":-69.3977
  },
  {
    "state":"Michigan",
    "latitude":43.3504,
    "longitude":-84.5603
  },
  {
    "state":"Minnesota",
    "latitude":45.7326,
    "longitude":-93.9196
  },
  {
    "state":"Missouri",
    "latitude":38.4623,
    "longitude":-92.3020
  },
  {
    "state":"Mississippi",
    "latitude":32.7673,
    "longitude":-89.6812
  },
  {
    "state":"Montana",
    "latitude":46.9048,
    "longitude":-110.3261
  },
  {
    "state":"North Carolina",
    "latitude":35.6411,
    "longitude":-79.8431
  },
  {
    "state":"North Dakota",
    "latitude":47.5362,
    "longitude":-99.7930
  },
  {
    "state":"Nebraska",
    "latitude":41.1289,
    "longitude":-98.2883
  },
  {
    "state":"New Hampshire",
    "latitude":43.4108,
    "longitude":-71.5653
  },
  {
    "state":"New Jersey",
    "latitude":40.3140,
    "longitude":-74.5089
  },
  {
    "state":"New Mexico",
    "latitude":34.8375,
    "longitude":-106.2371
  },
  {
    "state":"Nevada",
    "latitude":38.4199,
    "longitude":-117.1219
  },
  {
    "state":"New York",
    "latitude":42.1497,
    "longitude":-74.9384
  },
  {
    "state":"Ohio",
    "latitude":40.3736,
    "longitude":-82.7755
  },
  {
    "state":"Oklahoma",
    "latitude":35.5376,
    "longitude":-96.9247
  },
  {
    "state":"Oregon",
    "latitude":44.5672,
    "longitude":-122.1269
  },
  {
    "state":"Pennsylvania",
    "latitude":40.5773,
    "longitude":-77.2640
  },
  {
    "state":"Rhode Island",
    "latitude":41.6772,
    "longitude":-71.5101
  },
  {
    "state":"South Carolina",
    "latitude":33.8191,
    "longitude":-80.9066
  },
  {
    "state":"South Dakota",
    "latitude":44.2853,
    "longitude":-99.4632
  },
  {
    "state":"Tennessee",
    "latitude":35.7449,
    "longitude":-86.7489
  },
  {
    "state":"Texas",
    "latitude":31.1060,
    "longitude":-97.6475
  },
  {
    "state":"Utah",
    "latitude":40.1135,
    "longitude":-111.8535
  },
  {
    "state":"Virginia",
    "latitude":37.7680,
    "longitude":-78.2057
  },
  {
    "state":"Vermont",
    "latitude":44.0407,
    "longitude":-72.7093
  },
  {
    "state":"Washington",
    "latitude":47.3917,
    "longitude":-121.5708
  },
  {
    "state":"Wisconsin",
    "latitude":44.2563,
    "longitude":-89.6385
  },
  {
    "state":"West Virginia",
    "latitude":38.4680,
    "longitude":-80.9696
  },
  {
    "state":"Wyoming",
    "latitude":42.7475,
    "longitude":-107.2085
  }
];



$( document ).ready(function() {
 $("#resultsDisplay").css("display","none");
  var searchedItems =JSON.parse( localStorage.getItem("storedLocations"));
  if (searchedItems){
    storedLocations=searchedItems;
    renderSidebar();
  }
  
  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;
      var statenames=strs.map(function(item)
      {
        return item["state"];
      })
  
      // an array that will be populated with substring matches
      matches = [];
  
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
  
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(statenames, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });
  
      cb(matches);
    };
  };
  $('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'states',
    source: substringMatcher(states)
  });
});


var searchBoxEl = document.querySelector('#searchBox');

function handleSearchFormSearch(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#searchInput').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var requestUrl = "api.openweathermap.org/data/2.5/forecast?q=" + searchInputVal + "&appid=c87e1cc3e31fb388f96417708873f99c";

fetch(requestUrl)
.then(function(response){
  return response.json();
})

.then(function (data){
  console.log(data);
})

}

searchBoxEl.addEventListener('submit', handleSearchFormSearch);



function search(event){
  long=0;
  lat=0;
  getLongLat();
  if(statesfound!=null)
  {
    addToLocalStorage();
    displayResults();
  }


}
var long=0;
var lat=0;
var statesfound;
var storedLocations=[];

function getLongLat(){

  var statesfoundArr= states.filter((city)=>city.state.toLowerCase()==$("#searchInput").val().toLowerCase());
  if(statesfoundArr.length>=1)
  {
    statesfound=statesfoundArr[0];
    long=statesfound.longitude;
    lat=statesfound.latitude;    
  }
  else
  {
    statesfound=null;
    long=0;
    lat=0;
  }
 console.log(statesfound);
}

function addToLocalStorage(){
  var found=false;
  for(var i=0;i<storedLocations.length;i++)
  {
    if(storedLocations[i].state==statesfound.state)
    {
      found=true;
      break;
    }
  }
  if(!found)
  {
  storedLocations.push(statesfound);
  localStorage.setItem("storedLocations",JSON.stringify(storedLocations));
  renderSidebar();
}

}
function renderSidebar()
{
  var renderedHtml="";
  for(var i=0;i<storedLocations.length;i++)
  {
    renderedHtml+="<button type='button' class='list-group-item list-group-item-action' onclick='displayItemresults("+i+")' value='"+i+"'>"+storedLocations[i].state+"</button>"
    
  }
  $("#savedStates").html(renderedHtml);
 
}

function displayItemresults(index)
{
  statesfound= storedLocations[index];
  displayResults();

}
function displayResults(){
  $("#resultsDisplay").css("display","block");
  var requextUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+statesfound.latitude+"&lon="+statesfound.longitude+"&exclude=hourly,minutely,alerts&appid=c87e1cc3e31fb388f96417708873f99c";
// var requestUrlFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + "New%20York%20City" + "&appid=c87e1cc3e31fb388f96417708873f99c"
// var requestUrlCurrentDay = "api.openweathermap.org/data/2.5/weather?q=" + "New%20York%20City" + "&appid=c87e1cc3e31fb388f96417708873f99c"

fetch(requextUrl)
.then(function(response){
  return response.json();
})

.then(function (data){
  for (var i=0; i<5; i++){
    var date = new Date(data.daily[i].dt*1000);
    $("#date"+i).text(moment(date).format("dddd, MMMM Do"));
    $("#icon"+i).attr("src","http://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon+"@2x.png");
    $("#temp"+i).text(data.daily[i].temp.day);
    $("#humidity"+i).text(data.daily[i].humidity);
  }

    console.log(data);  
    $("#currentCityName").text(statesfound.state);
    var date = new Date(data.current.dt*1000);
    //console.log(date);
    //moment(data.current.dt).format()
    $("#currentDate").text(moment(date).format("dddd, MMMM Do"));
    $("#currentTemp").text(data.current.temp);
    $("#currentHumidity").text(data.current.humidity);
    $("#currentWindSpd").text(data.current.wind_speed);
    $("#currentUvInd").text(data.current.uvi);

    var uvIndexColorCode = data.current.uvi;

    if (uvIndexColorCode < 3){
      $("#currentUvInd").css("background-color", "green");
    }

    else if(uvIndexColorCode < 7){
      $("#currentUvInd").css("background-color", "orange");
    }

    else{
      $("#currentUvInd").css("background-color", "red");

    }

})
  
}



$("#searchBtn") .on("click", search);
