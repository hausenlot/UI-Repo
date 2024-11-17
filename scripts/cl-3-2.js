console.log("Script cl-3-2.js loaded!");

function attachDropdownListener() {
  console.log("Attaching listener");
  const dropdownButton = document.getElementById('dropdownButton-cl-3-2');
  const dropdownMenu = document.getElementById('dropdownMenu-cl-3-2');
  const searchInput = document.getElementById('searchInput-cl-3-2');
  const dropdownOptions = document.getElementById('dropdownOptions-cl-3-2');

  dropdownButton.addEventListener('click', () => {
      dropdownMenu.classList.toggle('hidden');
  });

  searchInput.addEventListener('input', () => {
      const searchValue = searchInput.value.toLowerCase();
      const options = dropdownOptions.querySelectorAll('a');

      options.forEach(option => {
          if (option.textContent.toLowerCase().includes(searchValue)) {
              option.style.display = 'block';
          } else {
              option.style.display = 'none';
          }
      });
  });
}

attachDropdownListener();