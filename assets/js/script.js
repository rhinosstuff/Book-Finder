const bookMain = document.querySelector('main')
const bookInput = document.querySelector('#bookInput')
const bookButton = document.querySelector('#bookButton')
const modalContent = document.querySelector('#modalContent')
const feelingLuckyButton = document.querySelector('#genreDropdown')

function landingPage(queriedBooks) {
  // Clear existing content in bookMain
  bookMain.innerHTML = ""

  // Display the results
  for (let i = 0; i < queriedBooks.length; i++) {
    let item = queriedBooks[i]
    
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
      let thumbnail = document.createElement('img')
      thumbnail.src = item.volumeInfo.imageLinks.thumbnail
      container.append(thumbnail)
    }
    
    bookMain.append(card)

    // Showing that the displayed the landing page
    console.log('Landing Page Function Called');
  }
}

function modalDisplay(queriedBooks) {
  modalContent.innerHTML = ""
  
  // Display the results
  let random = Math.floor(Math.random() * queriedBooks.length)
  let item = queriedBooks[random]
  
  let title = document.createElement('h5')
  title.textContent = item.volumeInfo.title
  let author = document.createElement('p')
  author.textContent = item.volumeInfo.authors
  let description = document.createElement('p')
  description.textContent = item.volumeInfo.description

  modalContent.append(title)
  modalContent.append(author)

  // Only create an img element if thumbnail is available
  if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
    let thumbnail = document.createElement('img')
    thumbnail.src = item.volumeInfo.imageLinks.thumbnail
    modalContent.append(thumbnail)
  }

  modalContent.append(description)
  // Showing that the Modal Display was called
  console.log('Modal Display Function Called');
}
  
// Event listener for the bookButton click
bookButton.addEventListener('click', function(event) {
  event.preventDefault()
  event.stopPropagation()

  let searchQuery = ''
  if (bookInput.value === "") {
      // displayAlert('Please enter a valid search.')    
  } else {
      searchQuery = bookInput.value.split(' ').join('+')
      // calling the function
      searchBooks(searchQuery, 'landingPage')
  }
})

// Event listener for the genreDropdown click
feelingLuckyButton.addEventListener('click', function(event) {
  event.preventDefault();
  event.stopPropagation();

  let selectedValue = event.target.getAttribute('data-value');
  if (selectedValue) {
    // Close the dropdown
    document.getElementById('genreDropdown').classList.remove('is-open');
    // Open the modal
    searchBooks('subject:' + selectedValue, 'modalDisplay');
    let modal = new Foundation.Reveal($('#feeling_lucky'));
    modal.open();
  }
});