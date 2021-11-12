//Create URL for query.
var geojsonUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Use d3 to make request
d3.json(geojsonUrl).then(function (data) {
    createFeatures(data.features);
  });
  

  function createFeatures(earthquakeData) {
  //Define function to run for every feature
  //Create popups
    function onEachFeature(features, layer) {
        layer.bindPopup(`<h3>${features.properties.place}</h3><hr><p>Time: ${new Date(features.properties.time)}</p><p>Magnitude: ${features.properties.mag}</p><p>Depth: ${features.geometry.coordinates[2]}</p>`);
    }
  
    var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
    });

  createMap(earthquakes);
}

function createMap(earthquakes) {

    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    // Create a baseMaps object
    var baseMaps = {
      "Street Map": street,
    };
  
    // Create an overlay object to hold earthquakes
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [45.52, -122.67],
      zoom: 5,
      layers: [street, earthquakes]
    });
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
  }
  