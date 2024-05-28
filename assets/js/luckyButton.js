$(document).foundation();

// Get the modal element
var modal = document.getElementById('myModal');

// Add an event listener to the modal button
document.querySelector('.button').addEventListener('click', function() {
  // Open the modal
  modal.classList.add('open');
  // Load the webpage at ./displayLucky.html
  window.location.href = './displayLucky.html';
});
