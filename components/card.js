class Card extends HTMLElement {
    constructor() {
        super();
        
        // Create a template
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 16px;
                    margin: 16px;
                    max-width: 300px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .card img {
                    width: 100%;
                    height: auto;
                    border-radius: 4px;
                }
                
                .card h2 {
                    margin: 16px 0 8px;
                    color: #333;
                }
                
                .card p {
                    color: #666;
                    line-height: 1.5;
                }
            </style>
            <div class="card">
                <img>
                <h2></h2>
                <p></p>
                <slot></slot>
            </div>
        `;
        
        // Create shadow DOM
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    
    // Lifecycle callback when element is added to DOM
    connectedCallback() {
        this.updateContent();
    }
    
    // Observe attributes for changes
    static get observedAttributes() {
        return ['title', 'image', 'description'];
    }
    
    // Handle attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateContent();
        }
    }
    
    // Update the component's content
    updateContent() {
        const title = this.getAttribute('title');
        const image = this.getAttribute('image');
        const description = this.getAttribute('description');
        
        if (this.shadowRoot) {
            if (title) this.shadowRoot.querySelector('h2').textContent = title;
            if (image) this.shadowRoot.querySelector('img').src = image;
            if (description) this.shadowRoot.querySelector('p').textContent = description;
        }
    }
}

// Define the custom element
customElements.define('my-card', Card);