const bookMain = document.getElementById('bookMain')
const bookInput = document.getElementById('bookInput')
const bookButton = document.getElementById('bookButton')
const bookModal = document.getElementById('bookModal')
const bookModalContent = document.getElementById('bookModalContent')
const bookDropdown = document.getElementById('genreDropdown')

// Google Books HTML
function bookDisplay(queriedBooks) {
  // Clear existing content in bookMain
  bookMain.innerHTML = ""

  // Display the results
  for (let i = 0; i < queriedBooks.length; i++) {
    let item = queriedBooks[i]
    
    let card = document.createElement('div')
    card.className = 'cell medium-4'
    
    let container = document.createElement('div')
    container.className = 'callout'
    container.setAttribute('data-equalizer-watch', '')
    
    let title = document.createElement('h5')
    title.textContent = item.volumeInfo.title
    title.classList = 'movie-click'
    
    let author = document.createElement('p')
    author.textContent = item.volumeInfo.authors

    card.append(container)
    container.append(title)
    container.append(author)

    // Only create an img element if thumbnail is available
    if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
      let thumbnail = document.createElement('img')
      thumbnail.src = item.volumeInfo.imageLinks.thumbnail
      container.append(thumbnail)
    }

    let buyBookContainer = document.createElement('h4')
    
    let buyBookLink = document.createElement('a')
    buyBookLink.textContent = 'Buy Now'
    buyBookLink.href = item.saleInfo.buyLink
    
    let description = document.createElement('textarea')
    description.textContent = item.volumeInfo.description
    
    container.append(buyBookContainer)
    buyBookContainer.append(buyBookLink)
    container.append(description)
    bookMain.append(card)

    // Showing that Book Display was called
    console.log('Book Display Function Called')
  }
}

// Book Modal
function bookModalDisplay(queriedBooks) {
  // Clear exsisting content in bookModal
  bookModalContent.innerHTML = ""
  
  // Display the results
  let random = Math.floor(Math.random() * queriedBooks.length)
  let item = queriedBooks[random]
  
  let title = document.createElement('h5')
  title.textContent = item.volumeInfo.title
  
  let author = document.createElement('p')
  author.textContent = item.volumeInfo.authors

  bookModalContent.append(title)
  bookModalContent.append(author)

  // Only create an img element if thumbnail is available
  if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
    let thumbnail = document.createElement('img')
    thumbnail.src = item.volumeInfo.imageLinks.thumbnail
    bookModalContent.append(thumbnail)
  }

  let buyBookContainer = document.createElement('h4')
  let buyBookLink = document.createElement('a')
  buyBookLink.textContent = 'Buy Now'
  buyBookLink.href = item.saleInfo.buyLink
  
  let description = document.createElement('textarea')
  description.textContent = item.volumeInfo.description

  bookModalContent.append(buyBookContainer)
  buyBookContainer.append(buyBookLink)
  bookModalContent.append(description)
  
  // Showing that the Modal Display was called
  console.log('Book Modal Display Function Called')
}
  
// Event listener for the bookButton click
bookButton.addEventListener('click', function(event) {
  event.preventDefault()
  event.stopPropagation()

  let searchQuery = ''
  if (bookInput.value === '') {
    // displayAlert('Please enter a valid search.')    
  } else {
    searchQuery = bookInput.value.split(' ').join('+')
    searchBooks(searchQuery, 'bookDisplay')
  }
  bookInput.value = ''
})

// Event listener for the genreDropdown click
bookDropdown.addEventListener('click', function(event) {
  event.preventDefault()
  event.stopPropagation()

  let selectedValue = event.target.getAttribute('data-value')
  if (selectedValue) {
    // Close the dropdown
    bookDropdown.classList.remove('is-open')
    
    // Open the modal
    searchBooks('subject:' + selectedValue, 'bookModalDisplay')
    
    let modal = new Foundation.Reveal($('#bookModal'))
    modal.open()
  }
})

// Event listner to close genreDropdown when clicked off
document.addEventListener('click', function(event) {
  
  // Check if the click is outside the dropdown
  if (!bookDropdown.contains(event.target)) {
    bookDropdown.classList.remove('is-open')
  }
})

// Clear modal content when closed
$('#bookModal').on('closed.zf.reveal', function() {
  bookModalContent.innerHTML = ""
})