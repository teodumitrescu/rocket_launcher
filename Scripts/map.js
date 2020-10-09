var idClicked; 

var baseMapLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var map = new ol.Map({
    target: 'map',
    layers: [baseMapLayer],
    view: new ol.View({
        center: ol.proj.fromLonLat([0,0]),
        zoom: 4, //Initial Zoom Level
        minZoom: 2,
        maxZoom: 10
    })
});

var vectorSource = new ol.source.Vector();

var markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
});

map.addLayer(markerVectorLayer);

map.on('click', function (e) {
    var markerFeature = map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        clickedOn(feature);
    });
});

// Init ^

function createNewMarker(Lon, Lat, sorce, id) {
    var marker = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([Lon, Lat])
        ),
    });

    marker.setId(id);

    marker.setStyle(new ol.style.Style({
        image: new ol.style.Icon(({
            src: sorce
        }))
    }));

    vectorSource.addFeature(marker);
}

function clickedOn(feature) {

    var id = feature.getId();
    document.location.href = "/Home/getRocketID?id=" + id;

}


// Functions ^