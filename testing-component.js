
const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');

if (dropdownButton && dropdownMenu) {
  dropdownButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
  });
}
