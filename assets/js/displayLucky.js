fetch('https://www.googleapis.com/books/v1/volumes?q=intitle:"Harry+Potter"&key=AIzaSyBWECKKuqlwFWHb3zl3JC7lEyPPBCSkZAQ')
    .then(response => response.json())
    .then(data => {
        const book = data.items[0];
        const bookCover = document.createElement('img');
        bookCover.src = book.volumeInfo.imageLinks.thumbnail;
        bookCover.alt = book.volumeInfo.title;
        bookCover.className = 'book-cover';

        const bookTitle = document.createElement('h2');
        bookTitle.textContent = book.volumeInfo.title;
        bookTitle.className = 'book-title';

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = book.volumeInfo.authors[0];
        bookAuthor.className = 'book-author';

        const bookSummary = document.createElement('p');
        bookSummary.textContent = book.volumeInfo.description;
        bookSummary.className = 'book-summary';

        const bookContainer = document.getElementById('book-container');
        bookContainer.innerHTML = '';
        bookContainer.appendChild(bookCover);
        bookContainer.appendChild(bookTitle);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookSummary);
    })
    .catch(error => console.error(error));