function makeAjaxCall(url, methodType, callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE){
            if (xhr.status === 200){
                map.messagebox.show('Map loaded successfully');
                console.log("xhr done successfully");
                var resp = xhr.responseText;
                callback(resp);
            } else {
                map.messagebox.show('Some error occured !!');
                console.log("xhr failed");
            }
        } else {
            map.messagebox.show('Map is bieng loaded ...');
            console.log("xhr processing going on");
        }
    };
    xhr.open(methodType, url, true);
    xhr.send();
    map.messagebox.show('Request sent to server successfully');
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
  L.marker(user.latlong, {icon: userIcon}).addTo(map).bindPopup(`Hi, My name is ${user.name}`)
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
