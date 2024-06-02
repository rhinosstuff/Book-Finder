const mainDisplay = document.getElementById('mainDisplay')
const userInput = document.getElementById('userInput')
const userSubmit = document.getElementById('userSubmit')
const moreButton = document.createElement('a')

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
    title.style.cssText = 'cursor: pointer; text-align: center; border-bottom: 2px solid #dbad42; border-radius: 5px; padding: 5px;'
    title.classList = 'movie-click'
    
    // Displays book author
    const author = document.createElement('p')
    author.textContent = item.volumeInfo.authors

    // Displays book cover & Checks if thumbnail img exsits if not adds generic img
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

    // Displays the link to buy the book if available
    const buyBookContainer = document.createElement('h4')
    const buyBookLink = document.createElement('a')
    if (item.saleInfo.buyLink) {
      buyBookLink.textContent = 'Buy Now'
      buyBookLink.href = item.saleInfo.buyLink
      buyBookLink.target = '_blank'
    } else {
      buyBookLink.textContent = 'Not Available'
    }

    // Displays book description
    const description = document.createElement('textarea')
    description.textContent = item.volumeInfo.description
    
    // Apending to mainDisplay
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
  }
}
  
// Ques books display when userSubmit is clicked
userSubmit.addEventListener('click', function(event) {
  event.preventDefault()
  event.stopPropagation()
  
  // Clears exsisting content in mainDisplay
  mainDisplay.innerHTML = ''

  // Sets local storage to track index and search query
  let searchQuery = ''
  searchQuery = userInput.value.split(' ').join('+')
  startIndex = 0
  localStorage.setItem('mainQueryLS', searchQuery)
  localStorage.setItem('mainIndexLS', startIndex)
  
  searchBooks(searchQuery, 'bookDisplay')
  
  // Sets input value back to blank
  userInput.value = ''
})

// Ques more books when moreButton clicked
moreButton.addEventListener('click', function(event) {
  event.preventDefault()
  event.stopPropagation()

  let searchQuery = localStorage.getItem('mainQueryLS')

  searchBooks(searchQuery, 'bookDisplay')
})