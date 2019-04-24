var attribution =   'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'+
                    ', contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'+
                    ', Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

var map = L.map('mapid', {
    minZoom: 2,
    maxZoom: 6,
    zoomSnap: 1,
    zoomDelta: 1,
    center: [39,34], //sets initial amp center
    zoom: 2, //sets initial zoom level
    messagebox: true
});

var markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 180,
    spiderfyOnMaxZoom: true
});

var tileUrl     = 'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}{r}?access_token={accessToken}';

var accessToken = 'pk.eyJ1IjoiYW51YmhhdmoxOTk2IiwiYSI6ImNqdW81MWN5ZTFhcWQ0NHB3NmtvNHZqdXcifQ.5-O6nhehA-kvqjdg9NJmHg';

var tileLayer = L.tileLayer(tileUrl, {
    attribution: attribution,
    accessToken: accessToken,
});

map.addLayer(tileLayer);
