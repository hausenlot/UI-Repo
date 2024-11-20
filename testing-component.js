
const dropdownButton = document.getElementById('dropdownButton-cl-2-4');
const dropdownMenu = document.getElementById('dropdownMenu-cl-2-4');

dropdownButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('hidden');
});
