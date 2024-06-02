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
  
  // Displays movie title
  movieModalTitle.textContent = item.title
  // Displays movie release date
  movieModalDate.textContent = 'Release Date: ' + item.release_date

  // Displays movie poster & checks if poster_path exsits if not adds generic img
  if (item.poster_path) {
    movieModalPoster.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`
    movieModalPoster.alt = `Movie Poster of: ${movieModalTitle.textContent}`
    movieModalPoster.style.width = '200px'
    movieModalPoster.style.height = 'auto'
  } else {
    movieModalPoster.src = './assets/images/img-not-found.jpg'
    movieModalPoster.alt = '404 Image'
  }

  // Creates buttons if more than 1 movie in movieList hides them if only 1
  if (movieList.length > 1) {
    nextMovieButton.style.visibility = 'visible'
    previousMovieButton.style.visibility = 'visible'
  } else {
    nextMovieButton.style.visibility = 'hidden'
    previousMovieButton.style.visibility = 'hidden'
  }

  // Displays movie overview
  movieModalOverview.textContent = item.overview
}

// No movie found displays generic content
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

// Event listener for dynamically displayed book-titles being clicked
mainDisplay.addEventListener('click', function(event) {
  if (event.target.classList.contains('movie-click')) {
    const title = event.target.textContent.split(' ').join('+')
    searchMovies(title)
    let modal = new Foundation.Reveal($('#movieModal'))
    modal.open()
  }
})

// Lets the user cycle through the movies if more than 1 in movieList
nextMovieButton.addEventListener('click', function() {
  // Increase index by 1
  movieIndex++
  
  // Loop back to the first movie if the end is reached
  if (movieIndex >= movieList.length) {
    movieIndex = 0 
  }
  movieModal(movieList, movieIndex)
})

// Lets the user cycle through the movies if more than 1 in movieList
previousMovieButton.addEventListener('click', function() {
  if (movieIndex > 0) {
    // Decreases index by 1
    movieIndex--
  } else {
    // Loop back to the last movie if the beginning is reached
    movieIndex = movieList.length-1 
    console.log('Movie Index: ' + movieIndex)
    console.log('MovieList Length: ' + movieList.length)
  }
  movieModal(movieList, movieIndex)
})