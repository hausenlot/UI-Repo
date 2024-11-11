document.addEventListener("DOMContentLoaded", async () => {
  const contentContainer = document.getElementById("content-container");
  try {
    const response = await fetch('data/data.json');
    const data = await response.json();
    const container = document.getElementById("container");

    data.forEach(item => {
      const content = createTemplate(item);
      console.log(content.id);
      
      container.appendChild(content);

      document.getElementById(content.id).addEventListener("click", () => {
        loadData(item.id);
      });
    });
  } catch (error) {
    console.error('Error loading or processing data:', error);
  }

  async function loadData(sectionId) {
    const response = await fetch('data/content.json');
    const data = await response.json();
    const sectionData = data.find(item => item.id === sectionId);

    const content = urlTemplate(sectionData);

    contentContainer.innerHTML = content;
  }
});

function createTemplate(sectionData) {
  const div = document.createElement('div');
  div.id = `div-section-${sectionData.id}`;
  div.className = 'border border-gray-300 rounded-lg p-4 m-4 max-w-sm shadow-sm';

  div.innerHTML = `
    <img src="${sectionData.image || 'placeholder.jpg'}" class="w-full h-auto rounded-md" alt="${sectionData.title}"/>
    <h2 class="mt-4 mb-2 text-gray-800">${sectionData.id}</h2>
    <p class="text-gray-600">${sectionData.title}</p>
  `;
  
  return div;
}

function urlTemplate(sectionData) {
  return `
    <h2>${sectionData.title}</h2>
    <p>${sectionData.content}</p>
  `;
}

