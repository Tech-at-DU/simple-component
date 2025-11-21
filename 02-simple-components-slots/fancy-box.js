class FancyBox extends HTMLElement {
  constructor() {
    super();

    // Create shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Template-like innerHTML
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          border: 2px solid #444;
          padding: 1rem;
          margin: 1rem 0;
          border-radius: 0.5rem;
          font-family: system-ui, sans-serif;
        }

        header {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        /* Style only inside the component */
        .box {
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 0.25rem;
        }
      </style>

      <header>
        <!-- Named slot -->
        <slot name="title">Default Title</slot>
      </header>

      <div class="box">
        <!-- Unnamed slot -->
        <slot>Default content inside the box.</slot>
      </div>
    `;
  }
}

customElements.define('fancy-box', FancyBox);
