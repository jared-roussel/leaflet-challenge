//Create URL for query.
var geojsonUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Use d3 to make request
d3.json(geojsonUrl).then(function (data) {
    createFeatures(data.features);
  });
  