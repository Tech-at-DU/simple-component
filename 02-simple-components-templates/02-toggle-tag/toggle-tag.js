// ====================================================================
// TOGGLE-TAG COMPONENT
// Introduces:
//   - <template>
//   - shadow DOM
//   - slots
//   - a simple interactive state (open/closed)
//   - minimal attribute handling
//
// Challenges included at bottom.
// ====================================================================


// -------------------------------------------------------
// Define template
// -------------------------------------------------------
const toggleTemplate = document.createElement('template');

toggleTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      margin: 0.5rem 0;
    }

    .toggle {
      border: 1px solid #ccc;
      border-radius: 6px;
      overflow: hidden;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      background: #f3f3f3;
      user-select: none;
    }

    .arrow {
      transition: 200ms;
      font-size: 0.75rem;
    }

    /* Rotate arrow when open */
    :host([open]) .arrow {
      transform: rotate(90deg);
    }

    .content {
      padding: 0.5rem 0.75rem;
      display: none;
    }

    /* Reveal when open */
    :host([open]) .content {
      display: block;
    }
  </style>

  <div class="toggle">
    <div class="header">
      <span class="label"></span>
      <span class="arrow">▶</span>
    </div>

    <div class="content">
      <slot></slot>
    </div>
  </div>
`;


// -------------------------------------------------------
// Component Class
// -------------------------------------------------------
class ToggleTag extends HTMLElement {
  constructor() {
    super();

    // Attach shadow DOM
    this.attachShadow({ mode: 'open' });

    // Clone and insert template
    this.shadowRoot.appendChild(toggleTemplate.content.cloneNode(true));

    // Cache DOM
    this._header = this.shadowRoot.querySelector('.header');
    this._label = this.shadowRoot.querySelector('.label');

    // Internal state
    this._open = false;

    // Bind listener
    this._onClick = this._onClick.bind(this);
  }

  // -----------------------------------------------------
  // Observe attribute "label" and "open"
  // -----------------------------------------------------
  static get observedAttributes() {
    return ['label', 'open'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'label') {
      this._label.textContent = newValue ?? '';
    }

    if (name === 'open') {
      this._open = newValue !== null;
    }
  }

  connectedCallback() {
    // Set initial label if not present
    if (!this.hasAttribute('label')) {
      this._label.textContent = 'Details';
    }

    // Toggle on click
    this._header.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this._header.removeEventListener('click', this._onClick);
  }

  // -----------------------------------------------------
  // Toggle logic
  // -----------------------------------------------------
  _onClick() {
    this._open = !this._open;

    if (this._open) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }
}


// -------------------------------------------------------
// Register custom element
// -------------------------------------------------------
customElements.define('toggle-tag', ToggleTag);


/* ===================================================================
   CHALLENGES
   ===================================================================

  ------------------------------------------------------
  Challenge 1 — Style integration
  ------------------------------------------------------
  Replace the built-in styles with design tokens from your CSS framework.

  Things to theme:
    - border color
    - header background color
    - padding scale (space-sm, space-md)
    - border-radius tokens
    - animation duration

  Try:
    var(--color-border)
    var(--radius-sm)
    var(--space-2)


  ------------------------------------------------------
  Challenge 2 — Arrow animation
  ------------------------------------------------------
  Make the arrow rotate smoothly using:
    - transform: rotate()
    - transition: 200ms ease

  Optional: make it point down when open (rotate 90deg).


  ------------------------------------------------------
  Challenge 3 — Add a "duration" attribute
  ------------------------------------------------------
  Let users write:

      <toggle-tag duration="300"></toggle-tag>

  This should control the transition time of the arrow rotation.


  ------------------------------------------------------
  Challenge 4 — Expand/collapse animation (advanced)
  ------------------------------------------------------
  Animate the reveal of content rather than using display: none.

  Techniques:
    - max-height + transition
    - animation frames + height auto workaround
    - CSS clip-path

  Goal:  
    <toggle-tag> content smoothly slides open and closed.


  ------------------------------------------------------
  Challenge 5 — Add a named slot for an icon (advanced)
  ------------------------------------------------------
  Example:

      <toggle-tag label="More Info">
        <span slot="icon">ℹ️</span>
        <p>Hidden details…</p>
      </toggle-tag>

  Steps:
    1. Add a <slot name="icon"></slot> next to the arrow.
    2. Style the icon.
    3. Support fallback if no icon is provided.

=================================================================== */
