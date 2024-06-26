// Define the base Uri for the TMDB Movie APIUri
const moviesApiUri = 'https://api.themoviedb.org/3/search/movie'
// TMDB API key
const apiKey = '8f28bcba394943dd4a6e637ef1ad8c83'

// These keep track of the movies if more than 1 in the que
let movieList = []
let movieIndex = 0

// Function to perform a search using the TMDB Movie API
function searchMovies(query) {
  // Construct the full Uri with the search query and API key
  const fullUri = `${moviesApiUri}?api_key=${apiKey}&query=${query}`
  console.log(fullUri)

  // Perform the fetch request
  fetch(fullUri)
    .then(response => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      // Parse the JSON response
      return response.json()
    })
    .then(data => {
      // Check if data is available
      if (!data.results || data.results.length === 0) {
        // Populates a generic no movie found modal
        noMovieModal()
        return
      }
      
      movieList = data.results
      movieIndex = 0
      movieModal(movieList, movieIndex)

      // Displays what we are recieving in the console
      console.log('This is the MOVIE data:', data.results)
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error)
    })
}