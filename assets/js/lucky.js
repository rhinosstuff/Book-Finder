function getBookInfo() {
    fetch('https://www.googleapis.com/books/v1/volumes?q=fantasy+novel&maxResults=1&startIndex=0')
        .then(response => response.json())
        .then(data => {
            const randomBook = data.items[0];
            const author = randomBook.volumeInfo.authors[0];
            const title = randomBook.volumeInfo.title;
            const coverArt = randomBook.volumeInfo.imageLinks.thumbnail;

            console.log('Author:', author);
            console.log('Title:', title);
            console.log('Cover Art:', coverArt);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

getBookInfo();