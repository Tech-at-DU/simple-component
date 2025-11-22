
// Create a template
const template = document.createElement('template');
template.innerHTML = `
  <style>
    div {
      border: 1px solid;
      padding: 1rem;
      margin: 1rem;
      font-family: Helvetica;
    }

    /* the styles above don't apply to slots! */
    h1 {
      margin: 0;
    }

    /* But, you can use the ::slotted() pseudo class */
    ::slotted(*) {
      color: red;
      margin: 0;
    }
  </style>
  <div>
    <slot name="card-title">Default text</slot>
    <slot name="card-body">Default text</slot>
  </div>
`;

class HelloCard extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Clone the template and append it to the shadow root
    const templateContent = template.content.cloneNode(true);
    shadowRoot.appendChild(templateContent);
  }
}

// Define the custom element
customElements.define('hello-card', HelloCard);
