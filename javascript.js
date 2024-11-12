document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("container");
  try {
    const response = await fetch('data/components.json');
    const data = await response.json();
    const componentContainer = document.getElementById("component-container");

    // iterate the components I have as cards and event listener
    data.forEach(component => {
      const content = createTemplate(component);
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

function createTemplate(component) {
  const div = document.createElement('div');
  div.id = `div-section-${component.id}`;
  div.className = 'border border-gray-300 rounded-lg p-4 m-4 max-w-sm shadow-sm';

  div.innerHTML = `
    <img src="${component.image || 'placeholder.jpg'}" class="w-full h-auto rounded-md" alt="${component.title}"/>
    <h2 class="mt-4 mb-2 text-gray-800">${component.id}</h2>
    <p class="text-gray-600">${component.title}</p>
  `;
  
  return div;
}

// This is going to be a Whole HTML and inside of it we will load the component-list.json sectionData.id then iterate sectionData.content
function componentContainer(sectionData) {
  const div = document.createElement('div');
  div.id = `${sectionData.title}-container`;
  div.className = 'border border-gray-300 rounded-lg p-4 m-4 max-w-sm shadow-sm';

  div.innerHTML = `<h2 class="text-xl font-bold mb-4">${sectionData.title.toUpperCase()}</h2>`;

  sectionData.content.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'mb-4 p-2 border border-gray-200 rounded-md';

    itemDiv.innerHTML = `
      <h3 class="text-lg font-semibold text-gray-800">${item.title}</h3>
      ${item.code} <!-- Render the button HTML from JSON -->
      <button id="show-syntax-${index}" class="text-blue-600 underline mt-2 ml-4 cursor-pointer">Show Syntax</button>
      <pre id="code-${index}" class="text-gray-600 bg-gray-100 p-2 rounded mt-2 hidden">${escapeHTML(item.code)}</pre>
    `;

    div.appendChild(itemDiv);

    const syntaxButton = itemDiv.querySelector(`#show-syntax-${index}`);
    const codeElement = itemDiv.querySelector(`#code-${index}`);

    if (syntaxButton && codeElement) {
      syntaxButton.addEventListener('click', () => {
        codeElement.classList.toggle('hidden');
      });
    }
  });

  return div;
}

function escapeHTML(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}