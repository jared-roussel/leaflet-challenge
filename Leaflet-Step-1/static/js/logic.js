//Create URL for query
var geojsonUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Use d3 to make request for features
d3.json(geojsonUrl).then(function (data) {
  //Creat function to style circles
  function markerStyle(features) {
    return {
      radius: size(features.properties.mag),
      fillColor: color(features.properties.mag),
      color: "#000000",
      weight: 1,
      stroke: true,
      opacity: 1,
      fillOpacity: 1
    };
  
    //Creates color based on magnitude in features
    function color(mag) {
      switch(true) {
      case mag > 5: return "#FF5733";
      case mag > 4: return "#FF7733";
      case mag > 3: return "#FFA233";
      case mag > 2: return "#FFC433";
      case mag > 1: return "#FFF633";
      default: return "#98EE00";
    }
  } 
  
  //Creates radius size based on magnitude
    function size(mag) {
      if (mag === 0) {
        return mag;
      }
      return mag * 5;
  }
}
  
      //variable contains geojson features
      var earthquakes = L.geoJSON(data, {
        
        //Adds popup to each point
        onEachFeature: function onEachFeature(features, layer) {
          layer.bindPopup(`<h3>${features.properties.place}</h3><hr><p>Time: ${new Date(features.properties.time)}</p><p>Magnitude: ${features.properties.mag}</p><p>Earthquake Depth: ${features.geometry.coordinates[2]}</p>`);
        },

        //Adds circle marker to each point
        pointToLayer: function pointToLayer (features, latlng) {
          return L.circleMarker(latlng);
            },
        //Parameter pulls in marker style from above 
        style: markerStyle,
      });
      
      createMap(earthquakes);
});

//Calls above to create visual
function createMap(earthquakes) {

    //Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    //Create a baseMaps object
    var baseMaps = {
      "Street Map": street,
    }
  
    //Create an overlay object to hold earthquakes
    var overlayMaps = {
      "Earthquakes": earthquakes

    }
  
    //Create map object
    var myMap = L.map("map", {
        center: [45.52, -122.67],
        zoom: 5,
        layers: [street, earthquakes]
    })


    //Add the layers control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: true
    }).addTo(myMap);
  
  }
  
  