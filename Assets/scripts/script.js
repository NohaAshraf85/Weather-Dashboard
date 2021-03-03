var states=[
  {
    "state":"Alaska"
   
  },
  {
    "state":"Alabama"
    
  },
  {
    "state":"Arkansas"
   
  },
  {
    "state":"Arizona"
    
  },
  {
    "state":"California"
  },
  {
    "state":"Colorado"
  },
  {
    "state":"Connecticut"
  },
  {
    "state":"Delaware"
  },
  {
    "state":"Florida"
  },
  {
    "state":"Georgia"
  },
  {
    "state":"Hawaii"
  },
  {
    "state":"Iowa"
  },
  {
    "state":"Idaho"
  },
  {
    "state":"Illinois"
  },
  {
    "state":"Indiana"
  },
  {
    "state":"Kansas"
  },
  {
    "state":"Kentucky"
  },
  {
    "state":"Louisiana"
  },
  {
    "state":"Massachusetts"
  },
  {
    "state":"Maryland"
  },
  {
    "state":"Maine"
  },
  {
    "state":"Michigan"
  },
  {
    "state":"Minnesota"
  },
  {
    "state":"Missouri"
  },
  {
    "state":"Mississippi"
  },
  {
    "state":"Montana"
  },
  {
    "state":"North Carolina"
  },
  {
    "state":"North Dakota"
  },
  {
    "state":"Nebraska"
  },
  {
    "state":"New Hampshire"
  },
  {
    "state":"New Jersey"
  },
  {
    "state":"New Mexico"
  },
  {
    "state":"Nevada"
  },
  {
    "state":"New York"
  },
  {
    "state":"Ohio"
  },
  {
    "state":"Oklahoma"
  },
  {
    "state":"Oregon"
  },
  {
    "state":"Pennsylvania"
  },
  {
    "state":"Rhode Island"
  },
  {
    "state":"South Carolina"
  },
  {
    "state":"South Dakota"
  },
  {
    "state":"Tennessee"
  },
  {
    "state":"Texas"
  },
  {
    "state":"Utah"
  },
  {
    "state":"Virginia"
  },
  {
    "state":"Vermont"
  },
  {
    "state":"Washington"
  },
  {
    "state":"Wisconsin"
  },
  {
    "state":"West Virginia"
  },
  {
    "state":"Wyoming"
  }
];


var statesfound;
var storedLocations=[];

$( document ).ready(function() {
 $("#resultsDisplay").css("display","none");
 $("#warning").css("display", "none");
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

async function search(event){

  await getLongLat();
  if(statesfound!=null)
  {
    $("#warning").css("display","none");
    addToLocalStorage();
    displayResults();

  }
  else{
    $("#warning").css("display","block");

  }


}

async function getLongLat(){

  var longLatUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+$("#searchInput").val()+"&appid=c87e1cc3e31fb388f96417708873f99c"

  await fetch(longLatUrl)
  .then(function(response){
    return response.json();
  })

  .then(function (data)
  {
    if(data.cod==404)
    {
      statesfound=null;
      long=0;
      lat=0;
      return;
    }

    var statesfoundArr= states.filter((city)=>city.state.toLowerCase()==$("#searchInput").val().toLowerCase());
if(statesfoundArr!=null&&statesfoundArr.length>=1 && data.city.coord.lat && data.city.coord.lon)
  {
    statesfound=
    {
      
      "state":statesfoundArr[0].state,
      "latitude":data.city.coord.lat,
    "longitude":data.city.coord.lon

    }
    
    long=data.city.coord.lon;
    lat=data.city.coord.lat;    
  }
  else
  {
    statesfound=null;
    long=0;
    lat=0;
  }
  });


  
}

function addToLocalStorage(){
  var found=false;
  for(var i=0;i<storedLocations.length;i++)
  {
    if(storedLocations[i].state==statesfound.state)
    {
      found=true;
      $("#btnLoction"+i).addClass("active");
      break;
    }
  }
  if(!found)
  {
  storedLocations.push(statesfound);
  localStorage.setItem("storedLocations",JSON.stringify(storedLocations));
  renderSidebar();
  $("#btnLoction"+(storedLocations.length-1)).addClass("active");
}

}

function renderSidebar()
{
  var renderedHtml="";
  for(var i=0;i<storedLocations.length;i++)
  {
    renderedHtml+="<button type='button' id='btnLoction"+i+"' class='list-group-item list-group-item-action' onclick='displayItemresults("+i+")' value='"+i+"'>"+storedLocations[i].state+"</button>"
    
    
  }
  $("#savedStates").html(renderedHtml);
 
}

function displayItemresults(index)
{
  for(var i=0;i<storedLocations.length;i++)
  {
    $("#btnLoction"+i).removeClass("active");
  }
  $("#warning").css("display", "none");

  $("#btnLoction"+index).addClass("active");
  statesfound= storedLocations[index];
  displayResults();

}

function displayResults(){
  $("#resultsDisplay").css("display","block");
  var requextUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+statesfound.latitude+"&lon="+statesfound.longitude+"&units=imperial&exclude=hourly,minutely,alerts&appid=c87e1cc3e31fb388f96417708873f99c";


fetch(requextUrl)
.then(function(response){
  return response.json();
})

.then(function (data){
  for (var i=0; i<5; i++){
    var date = new Date(data.daily[i+1].dt*1000);
    $("#date"+i).text(moment(date).format("M/D/YYYY"));
    $("#icon"+i).attr("src","https://openweathermap.org/img/wn/"+data.daily[i+1].weather[0].icon+"@2x.png");
    $("#temp"+i).text(data.daily[i+1].temp.day);
    $("#humidity"+i).text(data.daily[i+1].humidity);
  }

    $("#currentCityName").text(statesfound.state);
    var date = new Date(data.current.dt*1000);
    $("#iconCurrent").attr("src","https://openweathermap.org/img/wn/"+data.current.weather[0].icon+"@2x.png");
    console.log(data.current);
    $("#currentDate").text(moment(date).format("M/D/YYYY"));
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

var clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", clearSearch);

function clearSearch (){
  storedLocations=[];
  localStorage.setItem("storedLocations",JSON.stringify(storedLocations));
  renderSidebar();
}








