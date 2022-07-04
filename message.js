var user_name = localStorage.getItem("user_name");
var room_name = localStorage.getItem("room_name");

function send() 
{
    var msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push
    ({
        name: user_name, 
        message: msg,
        like: 0,
    });
    document.getElementById("msg").value = "";
}

function getData() 
{ 
    firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    
    firebase_message_id = childKey;
    messageData = childData;
    console.log(firebase_message_id);
    console.log(messageData);
    names = messageData ['name'];
    likes = messageData ['like'];
    messages = messageData ['message'];
    name_with_tag = "<h4> " + names + " <img class = 'user_tick' src = 'tick.png'></h4>";
    message_with_tag = "<h4 class = 'message_h4'>" + messages + "</h4>";
    like_button = "<button class = 'btn btn-primary' id = " + firebase_message_id + " value = " + likes + " onclick  = ' update(this.id) ' > " ;
    span_with_tag = " <span class = ' glyphicon glyphicon-thumbs-up'> Like: " + likes + " </span></button> ";
    row = name_with_tag + message_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;
} }); }); } getData();

function update(message_id) 
{
    console.log("Clicked on the lijed button - " + message_id);
    button_id = message_id;
    lik = document.getElementById(button_id).value;
    updated = Number(lik) + 1;

    firebase.database().ref(room_name).child(message_id).update({
    like: updated });
}

function logout() 
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("roon_name");
      window.location = "index.html";
}