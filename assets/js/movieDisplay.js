const movieModalContent = document.getElementById('movieModalContent')
const movieModalTitle = document.getElementById('movieModalTitle')
const movieModalDate = document.getElementById('movieModalDate')
const movieModalPoster = document.getElementById('movieModalPoster')
const nextMovieButton = document.getElementById('nextMovieButton')
const previousMovieButton = document.getElementById('previousMovieButton')
const movieModalOverview = document.getElementById('movieModalOverview')

// TMDB Modal
function movieModal(movieList, movieIndex) {
  let item = movieList[movieIndex]
  
  movieModalTitle.textContent = item.title
  movieModalDate.textContent = 'Release Date: ' + item.release_date

  // Only create an img element if poster_path is available
  if (item.poster_path) {
    movieModalPoster.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`
    movieModalPoster.alt = `Movie Poster of: ${movieModalTitle.textContent}`
    movieModalPoster.style.width = '200px'
    movieModalPoster.style.height = 'auto'
  } else {
    movieModalPoster.src = './assets/images/img-not-found.jpg'
    movieModalPoster.alt = '404 Image'
  }

  if (movieList.length > 1) {
    nextMovieButton.style.visibility = 'visible'
    previousMovieButton.style.visibility = 'visible'
  } else {
    nextMovieButton.style.visibility = 'hidden'
    previousMovieButton.style.visibility = 'hidden'
  }

  movieModalOverview.textContent = item.overview
}

// No movie found
function noMovieModal() {
  
  movieModalTitle.textContent = 'Seems to be no movie!'
  movieModalDate.textContent = 'Release Date: Maybe in the near future'
  movieModalPoster.src = './assets/images/img-not-found.jpg'
  movieModalPoster.alt = '404 Image'
  movieModalPoster.style.width = '200px'
  movieModalPoster.style.height = 'auto'
  movieModalOverview.textContent = 'Please reach out to BlockBuster for further help!'

  nextMovieButton.style.visibility = 'hidden'
  previousMovieButton.style.visibility = 'hidden'
}

// Event listener for dynamically displayed book titles
mainDisplay.addEventListener('click', function(event) {
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