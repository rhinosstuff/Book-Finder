const bookModal = document.getElementById('bookModal')
const bookModalContent = document.getElementById('bookModalContent')
const feelingLucky = document.getElementById('feelingLucky')
const feelingLuckyAgain = document.createElement('a')

// Dynamically displays google-books-API genre query
function bookModalDisplay(queriedBooks) {
  // Clear exsisting content in bookModal
  bookModalContent.innerHTML = ""
  
  // chooses a random index out of the 40 queried books
  let random = Math.floor(Math.random() * (queriedBooks.items.length-1))
  let item = queriedBooks.items[random]
  
  // Displays the random book title
  const title = document.createElement('h5')
  title.textContent = item.volumeInfo.title
  title.style.cssText = 'cursor: pointer; text-align: center; border-bottom: 2px solid #dbad42; border-radius: 5px; padding: 5px;'
  title.classList = 'movie-click'
  
  // Displays the random book author
  const author = document.createElement('p')
  author.textContent = item.volumeInfo.authors

  // Displays random book cover & Checks if thumbnail exsits if not adds generic img
  const thumbnail = document.createElement('img')
  if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
    thumbnail.src = item.volumeInfo.imageLinks.thumbnail
    thumbnail.alt = `Book cover of: ${title.textContent}`
  } else {
    thumbnail.src = './assets/images/img-not-found.jpg'
    thumbnail.alt = '404 Image'
    thumbnail.style.width = '125px'
    thumbnail.style.height = 'auto'
  }

  // Creates a feelingLuckyAgain button to try your luck again
  feelingLuckyAgain.id = 'feelingLuckyAgain'
  feelingLuckyAgain.classList = 'button'
  feelingLuckyAgain.style.cssText = 'margin: 1rem; border-radius: 10px;'
  feelingLuckyAgain.textContent = 'Still Feeling Lucky'

  // Displays the link to buy the random book if available
  const buyBookContainer = document.createElement('h4')
  const buyBookLink = document.createElement('a')
  if (item.saleInfo.buyLink) {
    buyBookLink.textContent = 'Buy Now'
    buyBookLink.href = item.saleInfo.buyLink
    buyBookLink.target = '_blank'
  } else {
    buyBookLink.textContent = 'Not Available'
  }
  
  // Displays random book description
  const description = document.createElement('textarea')
  description.textContent = item.volumeInfo.description

  // Appending to modal
  bookModalContent.append(title)
  bookModalContent.append(author)
  bookModalContent.append(thumbnail)
  bookModalContent.append(feelingLuckyAgain)
  bookModalContent.append(buyBookContainer)
  buyBookContainer.append(buyBookLink)
  bookModalContent.append(description)
}

// Opens feelingLucky Modal
feelingLucky.addEventListener('click', function(event) {
  event.preventDefault()
  event.stopPropagation()

  // Close the dropdown when genre is selected
  feelingLucky.classList.remove('is-open')

  // Sets local storage to track index and genre query
  let selectedGenre = event.target.getAttribute('data-value')
  startIndex = 0
  localStorage.setItem('modalQueryLS', selectedGenre)
  localStorage.setItem('modalIndexLS', startIndex)
  
  searchBooks(`subject:${selectedGenre}`, 'bookModalDisplay')

  // Open the modal
  let modal = new Foundation.Reveal($('#bookModal'))
  modal.open()
})

// Closes feelingLucky genre list when clicked off drop list
document.addEventListener('click', function(event) { 
  // Check if the click is outside the dropdown
  if (!feelingLucky.contains(event.target)) {
    feelingLucky.classList.remove('is-open')
  }
})

// Ques another random book when feelingLuckyAgain is clicked
feelingLuckyAgain.addEventListener('click', function(event) {
  event.preventDefault()
  event.stopPropagation()

  let searchQuery = localStorage.getItem('modalQueryLS')
  startIndex = localStorage.getItem('modalIndexLS')

  searchBooks(searchQuery, 'bookModalDisplay')
})