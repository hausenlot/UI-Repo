document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("container");
  try {
    const responseComponent = await fetch('data/components.json');
    const componentData = await responseComponent.json();

    const responseComponentList = await fetch('data/component-list.json');
    const componentListData = await responseComponentList.json();

    const componentContainer = document.querySelector(".component-container");

    // iterate the components I have as cards and event listener
    componentData.forEach(component => {
      const availableComponent = componentListData.find(componentList=> componentList.id === component.id).content.length;
      const content = createTemplate(component, availableComponent);
      componentContainer.appendChild(content);
      document.getElementById(content.id).addEventListener("click", () => {
        loadComponent(component.id);
      });
    });
  } catch (error) {
    console.error('Error loading or processing data:', error);
  }

  // Async function to load a whole html with the data equals to id of button and id from content.json
  async function loadComponent(componentList) {
    container.innerHTML = ""
    const response = await fetch('data/component-list.json');
    const data = await response.json();
    const sectionData = data.find(component => component.id === componentList);
    const content = componentContainer(sectionData);
    container.appendChild(content);
  }
});

function createTemplate(component, availableComponent) {
  const div = document.createElement('div');
  div.id = `div-section-${component.id}`;
  div.className = 'cards';

  div.innerHTML = `
    <h2 class="text-xl font-bold text-dark-highlight">${component.title}</h2>
    <p>Available Components: ${availableComponent}</p>
  `;
  
  return div;
}

// This is going to be a Whole HTML and inside of it we will load the component-list.json sectionData.id then iterate sectionData.content
function componentContainer(sectionData) {
  const div = document.createElement('div'); // Main Div
  div.id = `${sectionData.title}-container`;
  div.className = 'content-class';

  div.innerHTML = `<h2 class="text-xl font-bold mb-4 text-dark-highlight">${sectionData.title.toUpperCase()}</h2>`;

  // Building the Content Div
  sectionData.content.forEach((item, index) => {
    const itemContainerDiv = document.createElement('div'); // Container for item div
    const itemContainerHeader = document.createElement('div'); // Header for toggle button
    itemContainerHeader.className = 'item-container-header';
    itemContainerHeader.innerHTML = ` 
      <h3 class="text-lg font-semibold text-dark-primary">${item.title}</h3>
      <button id="toggle-${index}" class="text-blue-600 underline cursor-pointer">Show Syntax</button>
    `;
    itemContainerDiv.appendChild(itemContainerHeader); // Add to item div

    const itemOuterDiv = document.createElement('div'); // Outer div for component
    itemOuterDiv.className = 'outer-container';
    itemContainerDiv.appendChild(itemOuterDiv); // Add to item div

    const itemDiv = document.createElement('div'); // Inner div for outer div
    itemDiv.className = 'item-component-container';

    const componentElement = document.createElement('div'); // The actual component
    componentElement.innerHTML = item.code;
    componentElement.classList.add('component-view'); // Add a class to identify it

    const syntaxElement = document.createElement('pre'); // Syntax element
    syntaxElement.id = `code-${index}`;
    syntaxElement.className = 'text-gray-600 bg-gray-100 p-2 rounded hidden';
    const formattedCode = item.code.replace(/>\s*</g, '>\n<'); // Breakline for the long ass code
    syntaxElement.innerText = formattedCode;

    itemDiv.appendChild(componentElement); // Build the inner div
    itemDiv.appendChild(syntaxElement); // Build the inner div
    itemOuterDiv.appendChild(itemDiv); // Insert the inner div to outer div
    div.appendChild(itemContainerDiv); // Added to main div oncee all is div is good to go.

    const toggleButton = itemContainerDiv.querySelector(`#toggle-${index}`);
    toggleButton.addEventListener('click', () => {
      const isComponentVisible = !componentElement.classList.contains('hidden');

      componentElement.classList.toggle('hidden', isComponentVisible);
      syntaxElement.classList.toggle('hidden', !isComponentVisible);

      toggleButton.textContent = isComponentVisible ? 'Show Component' : 'Show Syntax';
    });
  });

  return div;
}

// function escapeHTML(html) {
//   console.log("Reformating JSON Code");
//   return html
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;");
// }