document.addEventListener("DOMContentLoaded", async () => {
  // Fetch JSON data
  const response = await fetch('data/data.json');
  const data = await response.json();
  
  // Select the template and container
  const template = document.getElementById("item-template");
  const container = document.getElementById("container"); // Ensure you have a container div in HTML

  // Iterate over each object and render it
  data.forEach(item => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".item-image").src = item.image;
    clone.querySelector(".item-title").textContent = item.title;
    clone.querySelector(".item-description").textContent = item.description;
    container.appendChild(clone);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("content-container");

  async function loadData(sectionId) {
    const response = await fetch('data/data.json');
    const data = await response.json();
    const sectionData = data.find(item => item.id === sectionId);

    const content = urlTemplate(sectionData);

    contentContainer.innerHTML = content;
  }

  document.getElementById("load-section-1").addEventListener("click", () => {
    loadData(1);
  });

  document.getElementById("load-section-2").addEventListener("click", () => {
    loadData(2);
  });
});


// urlTemplate function that takes in section data
function urlTemplate(sectionData) {
  // You can generate dynamic content here based on sectionData
  return `
    <h2>${sectionData.title}</h2>
    <p>${sectionData.description}</p>
  `;
}