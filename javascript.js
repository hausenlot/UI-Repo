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
  const div = document.createElement('div');
  div.id = `${sectionData.title}-container`;
  div.className = 'content-class';

  div.innerHTML = `<h2 class="text-xl font-bold mb-4">${sectionData.title.toUpperCase()}</h2>`;

  sectionData.content.forEach((item, index) => {
    const itemContainerDiv = document.createElement('div');
    const itemContainerHeader = document.createElement('div');
    itemContainerHeader.className = 'item-container-header'
    itemContainerHeader.innerHTML = `
      <h3 class="text-lg font-semibold text-gray-800">${item.title}</h3>
      <button id="show-syntax-${index}" class="text-blue-600 underline cursor-pointer">Show Syntax</button>
    `;
    itemContainerDiv.appendChild(itemContainerHeader);

    const itemDiv = document.createElement('div');
    itemDiv.className = 'mb-4 p-2 border border-gray-200 rounded-md';
    itemDiv.innerHTML = `
      ${item.code}
      <pre id="code-${index}" class="text-gray-600 bg-gray-100 p-2 rounded mt-2 hidden">${escapeHTML(item.code)}</pre>
    `;

    itemContainerDiv.appendChild(itemDiv);
    div.appendChild(itemContainerDiv);

    const syntaxButton = itemContainerDiv.querySelector(`#show-syntax-${index}`);
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