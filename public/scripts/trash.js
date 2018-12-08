const deleteDialog = document.getElementById('deleteDialog');
const titleInput = document.getElementById('titleInput');
const yearInput = document.getElementById('yearInput');
const ratingInput = document.getElementById('ratingInput');
const movieList = document.getElementById('movieList');


export function deleteMovie(i) {
  deleteDialog.showModal();
  deleteDialog.returnValue = i;
}

function confirmDelete() {
  const i = deleteDialog.returnValue;

  // Delete from database
  movieDatabase.splice(i, 1);
  localStorage.setItem('movies', JSON.stringify(movieDatabase));

  // Update listing
  movieList.innerHTML = "";
  loadMovies();
}

function clearForm() {
  titleInput.value = "";
  yearInput.value = "";
  ratingInput.value = "";
  dialog.returnValue = "";
}

dialog.addEventListener('submit', saveMovie);
deleteDialog.addEventListener('submit', confirmDelete);