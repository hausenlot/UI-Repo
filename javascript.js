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

// This is going to be a Whole HTML and inside of it we will load the component-list.json contents sectionData.id then iterate sectionData.content
function componentContainer(sectionData) {
  const div = document.createElement('div'); // Main div
  div.id = `${sectionData.title}-container`;
  div.className = 'content-class';

  div.innerHTML = `<h2 class="text-xl font-bold mb-4 text-dark-highlight">${sectionData.title.toUpperCase()}</h2>`;

  // Loop for the content part of the component-list
  sectionData.content.forEach((item, index) => {
    const itemContainerDiv = document.createElement('div'); // Component Div
    const itemContainerHeader = document.createElement('div'); // Component Header Div
    itemContainerHeader.className = 'item-container-header mb-4';
    itemContainerHeader.innerHTML = `
      <h3 class="text-lg font-semibold text-dark-primary">${item.title}</h3>
      <button id="toggle-${index}" class="text-blue-600 hover:text-blue-700 underline cursor-pointer transition-colors">Show Syntax</button>
    `;
    itemContainerDiv.appendChild(itemContainerHeader); // Put it inside the Component Div

    const itemOuterDiv = document.createElement('div'); // Outer div for Component Content
    itemOuterDiv.className = 'outer-container';
    itemContainerDiv.appendChild(itemOuterDiv); // Added Outer Component content div inside the component div

    const itemDiv = document.createElement('div'); // Inner div for outer div
    itemDiv.className = 'item-component-container';

    const componentElement = document.createElement('div'); // Component Element for inner div
    componentElement.innerHTML = item.code;
    componentElement.classList.add('component-view', 'p-4');

    const codeContainer = document.createElement('div'); // Syntax Element for inner div
    codeContainer.className = 'code-container hidden rounded-lg overflow-hidden border border-gray-700';
    
    const codeHeader = document.createElement('div'); // Header for Syntax Element for div
    codeHeader.className = 'bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-700';
    codeHeader.innerHTML = `
      <span class="text-gray-300 text-sm font-mono">HTML</span>
    `;

    const syntaxElement = document.createElement('pre'); // Code element for syntax Element
    syntaxElement.id = `code-${index}`;
    syntaxElement.className = 'syntax-content bg-gray-900 p-4 overflow-x-auto overflow-y-auto font-mono text-sm leading-6 text-gray-300';
    
    // Format the code with proper indentation
    const formattedCode = item.code
      .replace(/></g, '>\n<')
      .split('\n')
      .map(line => line.trim())
      .join('\n');
    
    // Apply syntax highlighting
    const highlightedCode = Prism.highlight(formattedCode, Prism.languages.html, 'html');

    syntaxElement.innerHTML = highlightedCode;

    codeContainer.appendChild(codeHeader); // Building the Syntax Element
    codeContainer.appendChild(syntaxElement); // Building the Syntax Element

    itemDiv.appendChild(componentElement); // Building the Component Element
    itemDiv.appendChild(codeContainer); // Finalizing the Inner div
    itemOuterDiv.appendChild(itemDiv); // Adding innder div to outer dic
    div.appendChild(itemContainerDiv); // Adding to main div

    const toggleButton = itemContainerDiv.querySelector(`#toggle-${index}`);
    toggleButton.addEventListener('click', () => {
      const isComponentVisible = !componentElement.classList.contains('hidden');

      componentElement.classList.toggle('hidden', isComponentVisible);
      codeContainer.classList.toggle('hidden', !isComponentVisible);

      toggleButton.textContent = isComponentVisible ? 'Show Component' : 'Show Syntax';
    });
  });

  return div; // Final div
}

// function escapeHTML(html) {
//   console.log("Reformating JSON Code");
//   return html
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;");
// }