document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("container");
  try {
    const responseComponent = await fetch('data/components.json');
    const componentData = await responseComponent.json();

    const componentContainer = document.querySelector(".component-container");

    // iterate the components I have as cards and event listener
    componentData.forEach(component => {
      const content = createCards(component);
      componentContainer.appendChild(content);
      document.getElementById(content.id).addEventListener("click", () => {
        loadComponent(component.id);
      });
    });
  } catch (error) {
    console.error('Error loading or processing data:', error);
  }

  async function loadComponent(componentList) {
    container.innerHTML = ""
    const response = await fetch('data/component-listv2.json');
    const data = await response.json();
    const sectionData = data.find(component => component.id === componentList);
    const content = componentContainer(sectionData);
    container.appendChild(content);
    componentParams(sectionData);
    console.log("should have appended");
  }

});

function createCards(component) {
  const div = document.createElement('div');
  div.id = `div-section-${component.id}`;
  div.className = 'cards';

  div.innerHTML = `
    <h2 class="text-xl font-bold text-dark-highlight">${component.title}</h2>
  `;
  
  return div;
}

function componentContainer(sectionData) {
  const div = document.createElement('div'); // Main div
  div.id = `${sectionData.title}-container`;
  div.className = 'content-class';
  div.innerHTML = `<h2 class="text-xl font-bold mb-4 text-dark-highlight">${sectionData.title.toUpperCase()}</h2>`;

  const itemContainerDiv = document.createElement('div');

  const itemOuterDiv = document.createElement('div'); // Outer div for Component Content
  itemOuterDiv.className = 'outer-container';
  itemContainerDiv.appendChild(itemOuterDiv); // Added Outer Component content div inside the component div

  const itemDiv = document.createElement('div'); // Inner div for outer div
  itemDiv.className = 'item-component-container';

  const componentElement = document.createElement('div'); // Component Element for inner div
  componentElement.innerHTML = sectionData.code;
  componentElement.classList.add('p-4');
  componentElement.setAttribute('id','dynamic-component');

  itemDiv.appendChild(componentElement); // Building the Component Element
  itemOuterDiv.appendChild(itemDiv); // Adding innder div to outer dic
  div.appendChild(itemContainerDiv); // Adding to main div

  return div;
}

function componentParams(sectionData){
  const dynamicComponent = document.getElementById("dynamic-component");
  const mainDiv = document.getElementById(`${sectionData.title}-container`);

  const itemContainerDiv1 = document.createElement('div');
  const itemOuterDiv1 = document.createElement('div'); // Outer div for Component Content
  itemOuterDiv1.className = 'outer-container';
  itemContainerDiv1.appendChild(itemOuterDiv1); // Added Outer Component content div inside the component div
  const itemDiv1 = document.createElement('div'); // Inner div for outer div
  itemDiv1.className = 'item-component-container';
  const componentElement1 = document.createElement('div');
  componentElement1.classList.add('p-4');

  const roundButton = document.createElement("button");
  const bgButton = document.createElement("button");
  const resetButton = document.createElement("button");
  
  roundButton.setAttribute('id', 'add-rounded');
  roundButton.textContent = 'Add Rounded';

  bgButton.setAttribute('id', 'add-bg');
  bgButton.textContent = 'Add Background';

  resetButton.setAttribute('id', 'reset-styles');
  resetButton.textContent = 'Reset Styles';


  roundButton.addEventListener("click", () => {
    dynamicComponent.classList.add("rounded-lg");
  });
  
  // Add "bg-blue-500" and "text-white" classes
  bgButton.addEventListener("click", () => {
    dynamicComponent.classList.add("bg-blue-500", "text-white");
  });
  
  // Reset all classes
  resetButton.addEventListener("click", () => {
    dynamicComponent.className = ""; // Clears all classes
  });

  componentElement1.appendChild(roundButton);
  componentElement1.appendChild(bgButton);
  componentElement1.appendChild(resetButton);

  componentElement1.classList.add('p-4');

  itemDiv1.appendChild(componentElement1); // Building the Component Element
  itemOuterDiv1.appendChild(itemDiv1); // Adding innder div to outer dic
  mainDiv.appendChild(itemContainerDiv1); // Adding to main div
  
}