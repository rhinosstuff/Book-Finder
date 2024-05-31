const movieModalContent = document.querySelector('#movieModalContent')

// TMDB Modal
function movieModal(queriedMovie) {
  movieModalContent.innerHTML = ""
  console.log(queriedMovie)
  
  // Display the results
  let result = queriedMovie[0]
  
  let title = document.createElement('h5')
  title.textContent = result.title
  let date = document.createElement('p')
  date.textContent = 'Release Date: ' + result.release_date

  movieModalContent.append(title)
  movieModalContent.append(date)

  // Only create an img element if poster_path is available
  if (result.poster_path) {
    let poster = document.createElement('img');
    poster.src = `https://image.tmdb.org/t/p/w500${result.poster_path}`
    movieModalContent.append(poster)
  }

  console.log('Movie Modal Display Function Called')
}

// Event listener for dynamically displayed book titles
bookMain.addEventListener('click', function(event) {
  if (event.target.classList.contains('movie-click')) {
    const title = event.target.textContent
    searchMovies(title)
    let modal = new Foundation.Reveal($('#movieModal'))
    modal.open()
  }
})

// Clear modal content when closed
$('#movieModal').on('closed.zf.reveal', function() {
  movieModalContent.innerHTML = ""
})