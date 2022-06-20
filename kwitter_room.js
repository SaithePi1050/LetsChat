//ADD YOUR FIREBASE LINKS HERE
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("room_name" + Room_names);
      row = "<div class = 'room_name' id = " + Room_names + " onclick = 'back_to_room_page(this.id)'>#" +  Room_names + "</div><hr>";
      //End code
      document.getElementById("output").innerHTML += row;
      });});}
getData();

function add_room() 
{
      var room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({Purpose : "1", Purpose1 : "2"});
      localStorage.setItem("room_name", room_name);
      window.location = "LetsChat_message_page.html";
}

function back_to_room_page(name) 
{
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "LetsChat_message_page.html";
}

function logout() 
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("roon_name");
      window.location = "index.html";
}