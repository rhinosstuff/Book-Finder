import 'foundation-sites/dist/css/foundation.min.css';
import 'foundation-sites/dist/js/foundation.min.js';
import $ from 'jquery';

// Initialize Foundation
$(document).foundation();

// Create a function to fetch the categories from Google Books API
async function fetchCategories() {
    try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=javascript');
        const data = await response.json();
        const categories = data.items.map(item => item.volumeInfo.categories).filter(category => category);
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Create a function to populate the pulldown menu with categories
async function populateCategories() {
    const categories = await fetchCategories();
    const selectElement = document.getElementById('genre-select');

    categories.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.value = category;
        optionElement.textContent = category;
        selectElement.appendChild(optionElement);
    });
}

// Call the populateCategories function to populate the pulldown menu
populateCategories();

// Create a function to handle the button click event
function handleButtonClick() {
    const selectedCategory = document.getElementById('genre-select').value;
    console.log('Selected category:', selectedCategory);
    // Fetch books based on the selected category
    async function fetchBooksByCategory(category) {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=javascript+subject:${category}`);
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    }

    // Create a function to display a random book from the selected category
    function displayRandomBook(books) {
        if (books.length > 0) {
            const randomIndex = Math.floor(Math.random() * books.length);
            const book = books[randomIndex];
            const coverArt = book.volumeInfo.imageLinks?.thumbnail;
            const title = book.volumeInfo.title;
            const author = book.volumeInfo.authors?.[0];

            console.log('Random Book:', {
                coverArt,
                title,
                author
            });
        } else {
            console.log('No books found for the selected category.');
        }
    }

    // Modify the handleButtonClick function to fetch books and display a random book
    async function handleButtonClick() {
        const selectedCategory = document.getElementById('genre-select').value;
        console.log('Selected category:', selectedCategory);

        const books = await fetchBooksByCategory(selectedCategory);
        displayRandomBook(books);
    }

    // Replace the existing handleButtonClick event listener with the modified one
    buttonElement.addEventListener('click', handleButtonClick);
}

// Add a click event listener to the button
const buttonElement = document.getElementById('lucky-button');
buttonElement.addEventListener('click', handleButtonClick);
// Create a function to open the modal
function openModal() {
    const modalElement = document.getElementById('modal');
    modalElement.classList.add('is-open');
}

// Create a function to close the modal
function closeModal() {
    const modalElement = document.getElementById('modal');
    modalElement.classList.remove('is-open');
}

// Add a click event listener to the button to open the modal
buttonElement.addEventListener('click', openModal);

// Add a click event listener to the close button in the modal to close it
const closeButtonElement = document.getElementById('close-button');
closeButtonElement.addEventListener('click', closeModal);

const apikey = 'AIzaSyBWECKKuqlwFWHb3zl3JC7lEyPPBCSkZAQ'