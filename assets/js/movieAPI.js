// please for the love of god work

// Define the base Uri for the TMDB Movie APIUri
const moviesApiUri = 'https://api.themoviedb.org/3/search/movie'

const movieMain = document.querySelector('main')
const movieInput = document.querySelector('#movieInput')
const movieButton = document.querySelector('#movieButton')
// TMDB API key
const apiKey = '8f28bcba394943dd4a6e637ef1ad8c83'

console.log(movieInput.value)

// Function to perform a search using the TMDB Movie API
function searchMovies(query) {
  // Construct the full Uri with the search query and API key
  const fullUri = `${moviesApiUri}?api_key=${apiKey}&query=${encodeURIComponent(query)}`

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
        return
      }

      // Display the results
      for (let i = 0; i < data.results.length; i++) {
        let result = data.results[i]
        
        let card = document.createElement('div')
        card.className = "cell medium-4"
        let container = document.createElement('div')
        container.className = "callout"
        container.setAttribute('data-equalizer-watch', '')
        let title = document.createElement('h5')
        title.textContent = result.title
        let author = document.createElement('p')
        author.textContent = result.id

        card.append(container)
        container.append(title)
        container.append(author)

        // Only create an img element if poster_path is available
        if (result.poster_path) {
          let poster = document.createElement('img');
          poster.src = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
          container.append(poster);
        }
        
        movieMain.append(card)
      }
      // Displays what we are recieving in the console
      console.log('This is the data:', data.results)
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error)
    })
}

// This is just a test 
movieButton.addEventListener('click', function(event) {
  event.preventDefault()
  event.stopPropagation()

  let searchQuery = ''
  if (movieInput.value === "") {
      // displayAlert('Please enter a valid search.')    
  } else {
      searchQuery = movieInput.value.split(' ').join('+')
      // calling the function
      searchMovies(searchQuery)
  }
})