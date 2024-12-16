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
  const allowedParams = componentData.allowedParams
  const baseComponent = componentData.code

  // This is the already appended hence existing container in the document. 
  const componentContainer = document.getElementById(`${componentData.title}-container`);

  // Console Container to hold the Params and Code Containers.
  const consoleContainer = document.createElement('div');
  consoleContainer.className = 'console-container'

  // Params content going to a function to handle the rendering/creation of the Params Container.
  const paramsContent = paramsContainer(baseComponent, allowedParams); // I'll pass the allowed parameters here from the json file once I finalized everything.

  // Code Content. Instead of using the code in json file and edit it we will use the existing one in the DOM. This will have a lot of issue for sure need to optimize this.
  const codeContent = codeContainer();

  consoleContainer.appendChild(paramsContent);
  consoleContainer.appendChild(codeContent);
  componentContainer.appendChild(consoleContainer);
}

function paramsContainer(baseComponent, allowedParams) {
  // Params Container
  const paramsContainer = document.createElement('div');
  paramsContainer.className = 'params-container'
  
  const resetButton = resetParams(baseComponent);
  const functionMap = {
    1: addRoundedParams,
    2: addBgParams
  }

  allowedParams.forEach(param => {
    if (functionMap[param]) {
        const response = functionMap[param]();
        paramsContainer.appendChild(response);
    }
  });

  paramsContainer.appendChild(resetButton) // Default Params
  
  return paramsContainer;
}

function codeContainer() {
  // Code Container
  const codeContainer = document.createElement('div');
  codeContainer.className = 'code-container'

  // We will reuse the componentPreviewContainerQuery because why not
  const { componentElement } = componentPreviewContainerQuery();
  const syntaxElement = document.createElement('pre');
  syntaxElement.classList.add('language-html');
  const codeElement = document.createElement('code');

  const formattedCode = componentElement.outerHTML
      .replace(/></g, '>\n<')
      .split('\n')
      .map(line => line.trim())
      .join('\n');
  const highlightedCode = Prism.highlight(formattedCode, Prism.languages.html, 'html');
  codeElement.innerHTML = highlightedCode
  syntaxElement.appendChild(codeElement);
  codeContainer.appendChild(syntaxElement)

  return codeContainer
}

// Params Functions Starts here
function addRoundedParams() {
  const roundButton = document.createElement("button");

  roundButton.setAttribute('id', 'add-rounded');
  roundButton.textContent = 'Add Rounded';
  roundButton.className = 'params-button';

  roundButton.addEventListener("click", () => {
    const { componentElement } = componentPreviewContainerQuery();
    componentElement.classList.add("rounded-lg");
    updateCodeContainer();
  });

  return roundButton
}

function addBgParams() {
  const bgButton = document.createElement("button");

  bgButton.setAttribute('id', 'add-bg');
  bgButton.textContent = 'Add Background';
  bgButton.className = 'params-button';

  bgButton.addEventListener("click", () => {
    const { componentElement } = componentPreviewContainerQuery();
    componentElement.classList.add("bg-blue-500", "text-slate-900");
    updateCodeContainer();
  });

  return bgButton
}

function resetParams(baseComponent) {
  const resetButton = document.createElement("button");

  resetButton.setAttribute('id', 'reset-styles');
  resetButton.textContent = 'Reset Styles';
  resetButton.className = 'params-button'

  resetButton.addEventListener("click", () => {
    const {componentPreviewContainer, componentElement} = componentPreviewContainerQuery();
    componentPreviewContainer.removeChild(componentElement)
    componentPreviewContainer.innerHTML = baseComponent
    updateCodeContainer();
  });

  return resetButton
}
// Params Functions Ends here

// Helpers functions Starts Here
function componentPreviewContainerQuery() {
  const componentPreviewContainer = document.querySelector('.component-preview-container');
  const componentElement = componentPreviewContainer.firstElementChild;

  return {
    componentPreviewContainer: componentPreviewContainer,
    componentElement: componentElement
  }
}

function codeContainerQuery() {
  const codeContainer = document.querySelector('.code-container');
  
  return codeContainer
}

// There might be an optimized/beautiful way to do it but this is much easier.
function updateCodeContainer() {
  const codeContainerContent = codeContainerQuery();
  codeContainerContent.remove()

  const consoleContainer = document.querySelector('.console-container');

  const newCodeContainer = codeContainer();
  consoleContainer.appendChild(newCodeContainer);
}

// Helpers functions Ends Here