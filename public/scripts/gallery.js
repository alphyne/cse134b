/* Name: loadMemes
 * Description: Loads all the user's memes onto the home page.
 */
function loadMemes() {
  document.getElementById('loader').innerHTML = "Loading...";
  firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
      const uid = getUserId();
      
      const ref = firebase.database().ref(`/users/${uid}/memes`);
      ref.once('value').then(function(snapshot) {
        const memes = snapshot.val();

        // Return if no memes were found
        if (!memes) {
          console.log("User has no memes yet");
          document.getElementById('loader').innerHTML = "You don't have any memes yet!";
          return;
        }

        const indices = Object.keys(memes).sort();
        console.log(indices);
        const length = indices.length;

        // Loop through all memes backwards
        let i;
        for (i = length - 1; i >= 0; i--) {
          const curr_meme = memes[indices[i]];

          const curr_meme_index = i+1;

          if(curr_meme.trash == false){

            // Retrieve image from cloud storage
            const storage = firebase.storage();
            const path_ref = storage.ref(`${curr_meme.meme_path}`);

            // Get img src, set img + title
            path_ref.getDownloadURL().then(function(url) {
              createMemeNode(curr_meme.title, url, curr_meme_index);
            });
          }
        }
        // Hide loader when done
        document.getElementById('loader').style.display = 'none';

      }, function(error) {
        console.log(error.message);
      });

    } else {
     console.log('No user logged in; cannot load memes');
    } 
  });
}

/* Name: createMemeNode
 * Parameters: title - title of the new meme
 *    url - img src for meme
 * Description: Clones the template meme to create a new meme element.
 *    Helper method for loadMemes().
 */
function createMemeNode(title, url, index) {
  // Clone meme template
  const meme_template = document.getElementById('meme_template').content.cloneNode(true);
  // Add unique class
  meme_template.querySelector('.meme_container').classList.add('meme-' + index);
  meme_template.querySelector('.meme_img').src = url;
  // Set title
  meme_template.querySelector('.meme_title').innerText = title;
  // Set onclick delete function
  meme_template.querySelector('.meme_delete_button').addEventListener('click', () => moveToTrash(index));
  // Append new meme
  const meme_gallery = document.getElementById('meme_gallery');
  meme_gallery.appendChild(meme_template);
}

/*
 * Name: moveToTrash
 * Parameters: index - index of meme to be deleted
 */
function moveToTrash(index){
  console.log('moveToTrash connected');
  console.log(index);

  firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
      uid = getUserId();
      
      ref = firebase.database().ref(`/users/${uid}/memes`);
      ref.once('value').then(function(snapshot) {
        memes = snapshot.val();

        // Return if no memes were found
        if (!memes) {
          console.log("User has no memes yet");
          return;
        }

        indices = Object.keys(memes);
        length = indices.length;
        length = length - 1;

        trash_index = index - 1;

        console.log ('trash_index: ' + trash_index)
        console.log('length - 1: ' + length);

        // Loop through all memes backwards
        let i;
        for (i = length; i >= 0; i--) {
          if(i == trash_index){
            var curr_meme_object = memes[indices[i]];

            console.log(curr_meme_object);

            curr_meme_object.trash = true;

            console.log(curr_meme_object);

            //var newPostKey = ref.push().key;
            var newPostKey = firebase.database().ref().child(`/users/${uid}/memes/`).push().key;

            //var newPostKey = curr_meme_object.key;


            console.log("newPostKey: " + newPostKey);

            var updates = {};
            updates[`users/${uid}/memes/` + newPostKey] = curr_meme_object;

            //firebase.database().ref().child(`/users/${uid}/memes` + newPostKey)
            //.update({ trash: false }); 

            return firebase.database().ref().update(updates);
          }
        }

      }, function(error) {
        console.log(error.message);
      });

    } else {
     console.log('No user logged in; cannot load memes');
    } 
  });
}