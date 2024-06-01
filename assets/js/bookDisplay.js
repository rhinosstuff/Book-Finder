const mainDisplay = document.getElementById('mainDisplay')
const userInput = document.getElementById('userInput')
const userSubmit = document.getElementById('userSubmit')
const moreButton = document.createElement('a')

const bookModal = document.getElementById('bookModal')
const bookModalContent = document.getElementById('bookModalContent')
const feelingLucky = document.getElementById('feelingLucky')
const feelingLuckyAgain = document.createElement('a')


// Dynamically displays google-books-API search query
function bookDisplay(queriedBooks) {
  // Displays the queried books
  for (let i = 0; i < queriedBooks.items.length; i++) {
    let item = queriedBooks.items[i]
    
    // Creates a card to display each item in query
    const card = document.createElement('div')
    card.className = 'cell medium-4'
    
    const container = document.createElement('div')
    container.className = 'callout'
    container.setAttribute('data-equalizer-watch', '')
    
      // Displays book title creates clickable 'movie-click' to display movie
    const title = document.createElement('h5')
    title.textContent = item.volumeInfo.title
    // title.style.cursor = 'pointer'
    title.style.cssText = 'cursor: pointer; text-align: center; border-bottom: 2px solid #dbad42; border-radius: 5px; padding: 5px;'
    title.classList = 'movie-click'
    
      // Displays book author
    const author = document.createElement('p')
    author.textContent = item.volumeInfo.authors

      // Displays book cover & Checks if thumbnail img exsits if not add generic img
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

      // Displays the link to buy the book
    const buyBookContainer = document.createElement('h4')
    const buyBookLink = document.createElement('a')
    buyBookLink.textContent = 'Buy Now'
    buyBookLink.href = item.saleInfo.buyLink
    
      // Displays book description
    const description = document.createElement('textarea')
    description.textContent = item.volumeInfo.description
    
    card.append(container)
    container.append(title)
    container.append(author)
    container.append(thumbnail)
    container.append(buyBookContainer)
    buyBookContainer.append(buyBookLink)
    container.append(description)
    mainDisplay.append(card)

    // Creates a button to show more titles if queried titles is greater than 40
    if (queriedBooks.items.length >= 40 && i === queriedBooks.items.length-1) {
      const moreContainer = document.createElement('div')
      moreContainer.id = 'more-container'
      moreContainer.classList = 'grid-x grid-margin-x'
      moreContainer.style.cssText = 'margin: auto;'
      moreButton.id = 'more-books'
      moreButton.classList = 'button align-self-bottom'
      moreButton.style.cssText = 'margin: 1rem; border-radius: 10px;'
      moreButton.textContent = 'See More Books'
      moreContainer.append(moreButton)
      mainDisplay.append(moreContainer)
    }

    // Showing that Book Display was called
    console.log('Book Display Function Called')
  }
}

// Book Modal
function bookModalDisplay(queriedBooks) {
  // Clear exsisting content in bookModal
  bookModalContent.innerHTML = ""
  
  // Display the results
  let random = Math.floor(Math.random() * (queriedBooks.items.length-1))
  let item = queriedBooks.items[random]

  console.log('index ' + random)
  console.log('Categories ' + item.volumeInfo.categories)
  
  const title = document.createElement('h5')
  title.textContent = item.volumeInfo.title
  title.style.cssText = 'text-align: center; border-bottom: 2px solid #dbad42; border-radius: 5px; padding: 5px;'
  
  const author = document.createElement('p')
  author.textContent = item.volumeInfo.authors

  const thumbnail = document.createElement('img')
  // Only create an img element if thumbnail is available
  if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
    thumbnail.src = item.volumeInfo.imageLinks.thumbnail
    thumbnail.alt = `Book cover of: ${title.textContent}`
  } else {
    thumbnail.src = './assets/images/img-not-found.jpg'
    thumbnail.alt = '404 Image'
    thumbnail.style.width = '125px'
    thumbnail.style.height = 'auto'
  }

  feelingLuckyAgain.id = 'feelingLuckyAgain'
  feelingLuckyAgain.classList = 'button'
  feelingLuckyAgain.style.cssText = 'margin: 1rem; border-radius: 10px;'
  feelingLuckyAgain.textContent = 'Still Feeling Lucky'

  const buyBookContainer = document.createElement('h4')
  const buyBookLink = document.createElement('a')
  buyBookLink.textContent = 'Buy Now'
  buyBookLink.href = item.saleInfo.buyLink
  
  const description = document.createElement('textarea')
  description.textContent = item.volumeInfo.description

  bookModalContent.append(title)
  bookModalContent.append(author)
  bookModalContent.append(thumbnail)
  bookModalContent.append(feelingLuckyAgain)
  bookModalContent.append(buyBookContainer)
  buyBookContainer.append(buyBookLink)
  bookModalContent.append(description)
  
  // Showing that the Modal Display was called
  console.log('Book Modal Display Function Called')
}
  
// Event listener for the userSubmit click
userSubmit.addEventListener('click', function(event) {
  event.preventDefault()
  event.stopPropagation()
  
  // Clears exsisting content in mainDisplay
  mainDisplay.innerHTML = ''

  let searchQuery = ''
    
  searchQuery = userInput.value.split(' ').join('+')
  startIndex = 0
  localStorage.setItem('mainQueryLS', searchQuery)
  localStorage.setItem('mainIndexLS', startIndex)
  searchBooks(searchQuery, 'bookDisplay')
  
  userInput.value = ''
})

// Event listener for the moreButton click
moreButton.addEventListener('click', function(event) {
  event.preventDefault()
  event.stopPropagation()

  let searchQuery = localStorage.getItem('mainQueryLS')

  console.log('more button: ' + searchQuery)
  console.log('more button: ' + startIndex)
  searchBooks(searchQuery, 'bookDisplay')
})

// Event listener to open feelingLucky
feelingLucky.addEventListener('click', function(event) {
  event.preventDefault()
  event.stopPropagation()

  let selectedGenre = event.target.getAttribute('data-value')
  // Close the dropdown
  feelingLucky.classList.remove('is-open')
  
  startIndex = 0
  localStorage.setItem('modalQueryLS', selectedGenre)
  localStorage.setItem('modalIndexLS', startIndex)
  
  // Open the modal
  searchBooks(`subject:${selectedGenre}`, 'bookModalDisplay')
  let modal = new Foundation.Reveal($('#bookModal'))
  modal.open()
})

// Event listner to close feelingLucky genre list when clicked off
document.addEventListener('click', function(event) { 
  // Check if the click is outside the dropdown
  if (!feelingLucky.contains(event.target)) {
    feelingLucky.classList.remove('is-open')
  }
})

// Event listener for feelingLuckyAgain click
feelingLuckyAgain.addEventListener('click', function(event) {
  event.preventDefault()
  event.stopPropagation()

  let searchQuery = localStorage.getItem('modalQueryLS')
  startIndex = localStorage.getItem('modalIndexLS')

  console.log('lucky button: ' + searchQuery)
  console.log('lucky button: ' + startIndex)
  searchBooks(searchQuery, 'bookModalDisplay')
})