// Define the base Uri for the Google Books API
const booksApiUri = 'https://www.googleapis.com/books/v1/volumes?q='

// startIndex & maxResults need to impliment
// https://www.googleapis.com/books/v1/volumes?q=filter=ebooks&maxResults=40&startIndex=0&orderBy=relevance&projection=lite&&key=AIzaSyBWECKKuqlwFWHb3zl3JC7lEyPPBCSkZAQ&subject=

// Function to perform a search using the Google Books API
function searchBooks(query, displayFunction) {
  // Construct the full Uri with the search query
  const fullUri = booksApiUri + encodeURIComponent(query)

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
        bookDisplay(data.items)
      } else if (displayFunction === 'bookModal') {
        bookModal(data.items)
      }

      // Displays what we are recieving in the console
      console.log('This is the data:', data.items)
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error)
    })
}