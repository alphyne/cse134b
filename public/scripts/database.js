
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
  const file_input = document.getElementById('file_input');
  const file = file_input.files[0];
  const file_name = file_input.value.split(/(\\|\/)/g).pop();
  const title = document.getElementById('title_input').value;
  const keywords = document.getElementById('keywords_input').value;
  const keywords_array = keywords.split(',');

  // Create references
  const storage_ref = firebase.storage().ref();
  const newFileRef = storage_ref.child(`memes/${file_name}`);

  // Concatenate version # if file already exists
  if (ifFileExists(file_name)) {
    // TODO
  }

  newFileRef.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
    alert("Your meme has been added!");
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
function saveMeme() {
  // Get a reference to the database service
  let database = firebase.database();

}

function importMeme() {
  uploadFile();
  saveMeme();
}

function saveMeme() {

}




