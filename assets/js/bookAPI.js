// List of uri filters
const filter = 'ebooks'
let maxResults = 40
let startIndex = 0
const orderBy = 'relevance'
const projection = 'full'
const key = 'AIzaSyBWECKKuqlwFWHb3zl3JC7lEyPPBCSkZAQ'

// Function to perform a search using the Google Books API
function searchBooks(query, displayFunction) {
  // Define the base Uri for the Google Books API
  const booksApiUri = 'https://www.googleapis.com/books/v1/volumes?q='
  // Applying filters to uri
  const uriFilters = `&filter=${filter}&maxResults=${maxResults}&startIndex=${startIndex}&orderBy=${orderBy}&projection=${projection}&key=${key}`
  // Constructing the full Uri with the search query
  const fullUri = booksApiUri + query + uriFilters

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
      // Check if data.items is available
      if (!data.items || data.items.length === 0) {
        return
      }

      // Call the appropriate display function based on the context
      if (displayFunction === 'bookDisplay') {
        startIndex = data.items.length + Number(localStorage.getItem('mainIndexLS'))
        localStorage.setItem('mainIndexLS', startIndex)
        // Displays the data we are recieving in the console
        console.log('This is the BOOK data:', data)
        bookDisplay(data)
      } else if (displayFunction === 'bookModalDisplay') {
        startIndex = data.items.length + Number(localStorage.getItem('modalIndexLS'))
        localStorage.setItem('modalIndexLS', startIndex)
        // Displays the data we are recieving in the console
        console.log('This is the BOOK-MODAL data:', data)
        bookModalDisplay(data)
      }
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error)
    })
}


// intitle: Returns results where the text following this keyword is found in the title.
// inauthor: Returns results where the text following this keyword is found in the author.
// inpublisher: Returns results where the text following this keyword is found in the publisher.
// subject: Returns results where the text following this keyword is listed in the category list of the volume.