
var mymap = L.map('mapid', {
    center: [20.5937, 78.9629],
    zoom: 4
  }
);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}{r}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 10,
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1IjoiYW51YmhhdmoxOTk2IiwiYSI6ImNqdW81MWN5ZTFhcWQ0NHB3NmtvNHZqdXcifQ.5-O6nhehA-kvqjdg9NJmHg'
}).addTo(mymap);

function makeAjaxCall(url, methodType, callback){
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function(){
     if (xhr.readyState === 4){
        if (xhr.status === 200){
           console.log("xhr done successfully");
           var resp = xhr.responseText;
           callback(resp);
        } else {
          console.log("xhr failed");
        }
     } else {
        console.log("xhr processing going on");
     }
  };
  xhr.open(methodType, url, true);
  xhr.send();
  console.log("request sent succesfully");
}

function getUsers() {
  var URL = "https://randomuser.me/api/?results=70&inc=name,location,picture&noinfo";

  makeAjaxCall(URL, "GET", processUsers);
}

function capitalize(word) {
  return word.charAt(0).toUpperCase()+word.slice(1)
}

function getUserName(user) {
  return capitalize(user.name.first)+" "+capitalize(user.name.last)
}

function getLatLong(user) {
  var lat =  parseFloat(user.location.coordinates.latitude)
  var long =  parseFloat(user.location.coordinates.longitude)
  return [lat, long]
}

function getImgUrl(user) {
  return user.picture.thumbnail
}

function createUser(user) {
  return { name: getUserName(user), latlong: getLatLong(user), imageurl: getImgUrl(user) }
}

var UserIcon = L.Icon.extend({
  options: {
    iconSize:     [50, 50],
    iconAnchor:   [0, 0],
    popupAnchor:  [25, 0]
  }
});

function createIcon(user) {
  var userIcon = new UserIcon({iconUrl: user.imageurl})
  L.marker(user.latlong, {icon: userIcon}).addTo(mymap).bindPopup(`Hi, My name is ${user.name}`)
}

function processUsers(rawData){
  var data = JSON.parse(rawData);
  var userData = data.results;
  var user;
  for (i=0;i<userData.length-1;i++){
    user = createUser(userData[i]);
    createIcon(user)
  }
}

getUsers();










