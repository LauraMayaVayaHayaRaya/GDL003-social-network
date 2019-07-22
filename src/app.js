
var app = document.getElementById('root')

var dbRef = firebase.database()

var messageRef = dbRef.ref('message')

messageRef.once('value').then(function(snap){

  app.innerText = snap.val()

});
