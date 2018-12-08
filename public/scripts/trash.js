/* Name: loadMemes
 * Description: Loads all the user's memes onto the home page.
 */
function loadMemes() {
  firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
      const uid = getUserId();
      
      const ref = firebase.database().ref(`/users/${uid}/memes`);
      ref.once('value').then(function(snapshot) {
        const memes = snapshot.val();

        // Return if no memes were found
        if (!memes) {
          console.log("User has no memes yet");
          return;
        }

        const indices = Object.keys(memes);
        const length = indices.length;

        // Loop through all memes backwards
        let i;
        for (i = length - 1; i >= 0; i--) {
          const curr_meme = memes[indices[i]];

          if(curr_meme.trash){
            // Retrieve image from cloud storage
            const storage = firebase.storage();
            const path_ref = storage.ref(`${curr_meme.meme_path}`);

            // Get img src, set img + title
            path_ref.getDownloadURL().then(function(url) {
              createMemeNode(curr_meme.title, url);
            });
          }
        }

      }, function(error) {
        console.log(error.message);
      });

      // Hide loader when done
      document.getElementById('loader').style.display = 'none';

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
function createMemeNode(title, url) {
  // Clone meme template
  const meme_template = document.getElementById('meme_template').content.cloneNode(true);
  meme_template.querySelector('.meme_img').src = url;
  // Set title
  meme_template.querySelector('.meme_title').innerText = title;
  // Append new meme
  const meme_gallery = document.getElementById('meme_gallery');
  meme_gallery.appendChild(meme_template);
}

