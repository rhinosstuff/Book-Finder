// Define the base URL for the Google Books API
const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

const main = document.querySelector('main')
const bookInput = document.querySelector('#bookInput')
const bookButton = document.querySelector('#bookButton')

console.log(bookInput.value)

// Function to perform a search using the Google Books API
function searchBooks(query) {
  // Construct the full URL with the search query
  const fullUrl = apiUrl + encodeURIComponent(query);

  // Perform the fetch request
  fetch(fullUrl)
    .then(response => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the JSON response
      return response.json();
    })
    .then(data => {
      // Check if data.items is available
      if (!data.items || data.items.length === 0) {
        return;
      }

      // Display the results
      for (let i = 0; i < data.items.length; i++) {
        let item = data.items[i];
        
        let card = document.createElement('div')
        card.className = "cell medium-4"
        let container = document.createElement('div')
        container.className = "callout"
        container.setAttribute('data-equalizer-watch', '')
        let title = document.createElement('h5')
        title.textContent = item.volumeInfo.title
        let author = document.createElement('p')
        author.textContent = item.volumeInfo.authors

        card.append(container)
        container.append(title)
        container.append(author)

        // Only create an img element if thumbnail is available
        if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
          let thumbnail = document.createElement('img');
          thumbnail.src = item.volumeInfo.imageLinks.thumbnail;
          container.append(thumbnail);
        }
        
        main.append(card)
      }
      // Displays what we are recieving in the console
      console.log('This is the data:', data);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
    });
}

// This is just a test 
bookButton.addEventListener('click', function(event) {
  event.preventDefault();
  event.stopPropagation();

  let searchQuery = ''
  if (bookInput.value === "") {
      // displayAlert('Please enter a valid search.')    
  } else {
      searchQuery = bookInput.value.split(' ').join('+')
      // calling the function
      searchBooks(searchQuery)
  }
})

