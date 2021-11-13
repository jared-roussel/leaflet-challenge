//Create URL for query
var geojsonUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


//Use d3 to make request for features
d3.json(geojsonUrl).then(function (data) {
  

  function circleStyle(features) {
    return {
      radius: radSize(features.properties.mag),
      fillColor: fillColor(features.properties.mag),
      color: "#000000",
      weight: 1,
      stroke: true
      opacity: 1,
      fillOpacity: 1
    };
  
  
    function fillColor(mag) {
      switch(true) {
      case mag > 5: return "#ea2c2c";
      case mag > 4: return "#ea822c";
      case mag > 3: return "#ee9c00";
      case mag > 2: return "#eecc00";
      case mag > 1: return "#d4ee00";
      default: return "#98ee00";
    }
  }
    function radSize(mag) {
      if (mag === 0) {
        return 1;
      }
      return mag * 4;
  }
}
  
      //Contains geojson features
      var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: function onEachFeature(features, layer) {
          layer.bindPopup(`<h3>${features.properties.place}</h3><hr><p>Time: ${new Date(features.properties.time)}</p><p>Magnitude: ${features.properties.mag}</p><p>Earthquake Depth: ${features.geometry.coordinates[2]}</p>`);
        },
        pointToLayer: function pointToLayer (features, latlng) {
          return L.circleMarker(latlng);
            },
        style: circleStyle,
      });
      
      createMap(earthquakes);
};


function createMap(earthquakes) {

    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    // Create a baseMaps object
    var baseMaps = {
      "Street Map": street,
    }
  
    // Create an overlay object to hold earthquakes
    var overlayMaps = {
      "Earthquakes": earthquakes

    }
  
    //Create map object
    var myMap = L.map("map", {
        center: [45.52, -122.67],
        zoom: 5,
        layers: [street, earthquakes]
    })


    // Add the layers control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: true
    }).addTo(myMap);
  
  }
  
  