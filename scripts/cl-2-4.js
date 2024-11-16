console.log("Script cl-2-4.js loaded!");

function attachDropdownListener() {
  console.log("Attaching listener");
  const dropdownButton = document.getElementById('dropdownButton');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (dropdownButton && dropdownMenu) {
    dropdownButton.addEventListener('click', () => {
      dropdownMenu.classList.toggle('hidden');
    });
  }
}

attachDropdownListener();