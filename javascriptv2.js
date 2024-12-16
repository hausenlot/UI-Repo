document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("container");
  try {
    const responseComponent = await fetch('data/components.json');
    const componentData = await responseComponent.json();

    const componentContainer = document.querySelector(".component-list-container");

    // Looping the available component with cards and event listeners.
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
    const componentListData = data.find(component => component.id === componentList);
    const content = renderComponentContainer(componentListData);
    container.appendChild(content);
    renderConsoleContainer(componentListData);
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

function renderComponentContainer(componentData) {
  // Component Container
  const componentContainer = document.createElement('div');
  componentContainer.id = `${componentData.title}-container`;
  componentContainer.className = 'component-container';
  componentContainer.innerHTML = `
    <div class="w-3/4 self-start mx-auto">
      <h2 class="text-xl font-bold text-dark-highlight">${componentData.title.toUpperCase()}</h2>
    </div>
  `;

  // Component Preview Container
  const componentPreview = document.createElement('div');
  componentPreview.className = 'component-preview-container'
  componentPreview.innerHTML = componentData.code;

  // Added to Component Container
  componentContainer.appendChild(componentPreview);

  // Done
  return componentContainer;
}

function renderConsoleContainer(componentData) {
  // The things I will pass eventually
  const allowedParams = 'Placeholder'
  const baseComponent = componentData.code

  // This is the already appended hence existing container in the document. 
  const componentContainer = document.getElementById(`${componentData.title}-container`);

  // Console Container to hold the Params and Code Containers.
  const consoleContainer = document.createElement('div');
  consoleContainer.className = 'console-container'

  // Params content going to a function to handle the rendering/creation of the Params Container.
  const paramsContent = paramsContainer(baseComponent, allowedParams); // I'll pass the allowed parameters here from the json file once I finalized everything.

  // Code Container ** Just a Placeholder so my brain dont collapse ** 
  const codeContainer = document.createElement('div');
  codeContainer.className = 'params-container'

  consoleContainer.appendChild(paramsContent);
  consoleContainer.appendChild(codeContainer);
  componentContainer.appendChild(consoleContainer);
}

// I might seperate the Parametes in other functions to call using the allowedParams in json file so I can just make a loop what I need here.
function paramsContainer(baseComponent, allowedParams){
  // Params Container
  const paramsContainer = document.createElement('div');
  paramsContainer.className = 'params-container'

  // Buttons ** Will improve this with sliders/color pickers for custom values
  const roundButton = document.createElement("button");
  const bgButton = document.createElement("button");
  const resetButton = document.createElement("button");

  roundButton.setAttribute('id', 'add-rounded');
  roundButton.textContent = 'Add Rounded';
  roundButton.className = 'params-button'

  bgButton.setAttribute('id', 'add-bg');
  bgButton.textContent = 'Add Background';
  bgButton.className = 'params-button'

  resetButton.setAttribute('id', 'reset-styles');
  resetButton.textContent = 'Reset Styles';
  resetButton.className = 'params-button'

  roundButton.addEventListener("click", () => {
    const { componentElement } = paramsQueryContainer(); // Learned Something once again
    console.log(componentElement)
    componentElement.classList.add("rounded-lg");
  });

  bgButton.addEventListener("click", () => {
    const { componentElement } = paramsQueryContainer(); // Learned Something once again
    console.log(componentElement)
    componentElement.classList.add("bg-blue-500", "text-slate-900");
  });

  resetButton.addEventListener("click", () => {
    const {componentPreviewContainer, componentElement} = paramsQueryContainer(); // Learned Something once again
    console.log(componentPreviewContainer, componentElement)
    componentPreviewContainer.removeChild(componentElement)
    componentPreviewContainer.innerHTML = baseComponent
  });

  paramsContainer.appendChild(roundButton);
  paramsContainer.appendChild(bgButton);
  paramsContainer.appendChild(resetButton);

  return paramsContainer;
}

// This is for the listeners. So it can update everytime they click instead of declaring it once.
function paramsQueryContainer() {
  // Query the element that we will customize
  const componentPreviewContainer = document.querySelector('.component-preview-container');
  const componentElement = componentPreviewContainer.firstElementChild;

  // Learned Something once again
  return {
    componentPreviewContainer: componentPreviewContainer,
    componentElement: componentElement
  }
}