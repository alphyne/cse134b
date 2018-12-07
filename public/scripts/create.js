var config = {
    apiKey: "AIzaSyB5c9mjm-mf1eViUdp-jc-PFcr8bTFgLTg",
    authDomain: "mememaster-ej.firebaseapp.com",
    databaseURL: "https://mememaster-ej.firebaseio.com",
    projectId: "mememaster-ej",
    storageBucket: "mememaster-ej.appspot.com",
    messagingSenderId: "815545865797"
  };
  firebase.initializeApp(config);
//Initizae the firebase app

var email="test@test.com"
var password="testtest123"
firebase.auth().signInWithEmailAndPassword(email,password)
.then(
  function(success){
    console.log("login!");
  },function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  }
);

input=document.getElementById("upload");
input.addEventListener('change',function(){
  const file=document.querySelector("#upload").files[0];
//Get the upload file
  
 const imageStorage=firebase.storage().ref();
 if(file){
   
   				 const name = (new Date()) + '-' + file.name;
				    const metadata = {
					 contentType: file.type
				     };
				     const task = imageStorage.child("img/test.png").put(file,metadata);
   task.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
     console.log(downloadURL);
    let a = document.createElement('a');
    let p = document.createElement('p');
    let img = document.createElement("img");
    img.src=downloadURL;
    img.alt="Uploaded";  p.appendChild(document.createTextNode("Upload Success!"));
    a.href=downloadURL;
    a.appendChild(document.createTextNode("This is the link to image"));
    document.body.appendChild(p);
     document.body.appendChild(a);
    document.body.appendChild(img);
  document.querySelectorAll("#uploaded").src=downloadURL;
  });
});
 }
              //Prepare the task for upload
 });