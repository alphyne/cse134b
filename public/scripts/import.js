
function preview() {
  const input = this;

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      document.getElementById('file_preview').src = e.target.result;
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function resetPreview() {
  document.getElementById('file_preview').src = "";
}

function resetMemeForm() {
  document.getElementById('new_meme_form').reset();
  resetPreview();
}

/*
 * Upload image to cloud storage
 */
function uploadFile() {
  const uid = getUserId();
  if (!uid) {
    console.log('No user is logged in; cannot upload file');
    return;
  }

  const file_input = document.getElementById('file_input');
  const file = file_input.files[0];
  let file_name = file_input.value.split(/(\\|\/)/g).pop();
  const title = document.getElementById('title_input').value;
  const keywords = document.getElementById('keywords_input').value;
  const keywords_array = keywords.split(",").map(item => item.trim());

  // Concatenate time onto file name to avoid overwriting
  file_name = file_name.replace(/(\.[\w\d_-]+)$/i, `_${+ new Date()}$1`);

  // Create references
  const storage_ref = firebase.storage().ref();
  const new_file_ref = storage_ref.child(`users/${uid}/${file_name}`);

  new_file_ref.put(file).then(function(snapshot) {
    console.log('Uploaded image');
    saveMemeToDb(title, new_file_ref.fullPath, + new Date(), keywords_array);

    // Reset form and preview
    resetMemeForm();
  }); 
}

function ifFileExists(file_name) {
  console.log(`Checking if ${file_name} exists...`);

  // Create references
  const storage_ref = firebase.storage().ref();
  const file_ref = storage_ref.child(`memes/${file_name}`);

  // Get metadata properties
  file_ref.getMetadata().then(function(metadata) {
    console.log(`${file_name} exists`);
    return true;
  }).catch(function(error) {
    console.log(error.message);
    return false;
  });
}

/*
 * Saves meme to database
 */
function saveMemeToDb(title, meme_path, time, keywords) {
  // Get a reference to the database service
  let database = firebase.database();

  

  const uid = getUserId();
  if (!uid) {
    console.log('UID not found; Cannot save to db');
    return;
  } 

  // Get a key for a new meme
  const memes_key = firebase.database().ref().child(`users/${uid}/memes`);
  const new_meme_key = memes_key.push();

  const new_meme = {
    title: title,
    meme_path: meme_path,
    time: time,
    keywords: keywords,
    trash: false,
    //meme_key: new_meme_key
  };

  new_meme_key.set(new_meme, function(error) {
    if (error) {
      console.log(error.message);
    } else {
      console.log('Meme saved to database');
      alert("Your meme has been added!");
    }
  });
}

function writeUserData(userId, name, email, imageUrl) {
  const uid = getUserId();
  if (!uid) {
    console.log('Error: no user logged in');
    return;
  }

  /*
  firebase.database().ref(`users/${uid}/memes/`).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  }); */
}



function importMeme() {
  uploadFile();
 // saveMeme();
}





