const movieModalContent = document.getElementById('movieModalContent')
const movieModalTitle= document.getElementById('movieModalTitle')
const movieModalDate= document.getElementById('movieModalDate')
const movieModalPoster= document.getElementById('movieModalPoster')
const nextMovieButton= document.getElementById('nextMovieButton')
const previousMovieButton= document.getElementById('previousMovieButton')
const movieModalOverview= document.getElementById('movieModalOverview')

// TMDB Modal
function movieModal(movieList, movieIndex) {
  let item = movieList[movieIndex]
  
  movieModalTitle.textContent = item.title
  movieModalDate.textContent = 'Release Date: ' + item.release_date

  // Only create an img element if poster_path is available
  if (item.poster_path) {
    movieModalPoster.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`
    movieModalPoster.alt = `Movie Poster of: ${movieModalTitle}`
    movieModalPoster.style.width = '200px'
    movieModalPoster.style.height = 'auto'
  }

  movieModalOverview.textContent = item.overview
}

// Event listener for dynamically displayed book titles
bookMain.addEventListener('click', function(event) {
  if (event.target.classList.contains('movie-click')) {
    const title = event.target.textContent.split(' ').join('+')
    searchMovies(title)
    let modal = new Foundation.Reveal($('#movieModal'))
    modal.open()
  }
})

nextMovieButton.addEventListener('click', function() {
  movieIndex++
  if (movieIndex >= movieList.length) {
    movieIndex = 0 // Loop back to the first movie if the end is reached
  }
  movieModal(movieList, movieIndex)
})

previousMovieButton.addEventListener('click', function() {
  if (movieIndex > 0) {
    movieIndex--
  } else {
    movieIndex = movieList.length-1 // Loop back to the first movie if the end is reached
    console.log('Movie Index: ' + movieIndex)
    console.log('MovieList Length: ' + movieList.length)
  }
  movieModal(movieList, movieIndex)
})