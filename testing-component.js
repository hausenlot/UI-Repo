const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');

dropdownButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('hidden');
});