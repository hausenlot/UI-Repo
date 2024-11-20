console.log("Script cl-2-4.js loaded!");

function attachDropdownListeners() {
  console.log("Attaching listener");
  const dropdownButtons = document.querySelectorAll('#dropdownButton-cl-2-4');
  const dropdownMenus = document.querySelectorAll('#dropdownMenu-cl-2-4');
  console.log(dropdownButtons, dropdownMenus);
  dropdownButtons.forEach((button, index) => {
    const menu = dropdownMenus[index];

    if (menu) {
      button.addEventListener('click', () => {
        menu.classList.toggle('hidden');
      });
    }
  });
}

attachDropdownListeners();