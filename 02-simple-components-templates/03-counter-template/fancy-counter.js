// Module-level template for FancyCounter
const template = document.createElement('template');

template.innerHTML = `
  <style>
    .container {
      margin: 3px;
      display: flex;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .button {
      padding: 1em;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 3px solid;
      border-bottom: 3px solid;
      cursor: pointer;
      user-select: none;
    }

    .left {
      border-top-left-radius: 0.5em;
      border-bottom-left-radius: 0.5em;
      border-left: 3px solid;
    }

    .right {
      border-top-right-radius: 0.5em;
      border-bottom-right-radius: 0.5em;
      border-right: 3px solid;
    }

    .arrow {
      width: 8px;
      height: 8px;
      border-top: 3px solid;
      border-right: 3px solid;
    }

    .left .arrow {
      transform: rotate(-135deg);
    }

    .right .arrow {
      transform: rotate(45deg);
    }

    .display {
      padding: 1em;
      border-top: 3px solid;
      border-bottom: 3px solid;
      min-width: 3ch;
      text-align: center;
    }
  </style>
  <div class="container">
    <div class="button left">
      <div class="arrow"></div>
    </div>

    <div class="display">0</div>

    <div class="button right">
      <div class="arrow"></div>
    </div>
  </div>
`;

class FancyCounter extends HTMLElement {
  constructor() {
    super();

    // Attach shadow + clone template
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    const tempNode = template.content.cloneNode(true);
    this._shadowRoot.appendChild(tempNode);

    // Cache important elements
    this._leftButton = this._shadowRoot.querySelector('.left');
    this._rightButton = this._shadowRoot.querySelector('.right');
    this._display = this._shadowRoot.querySelector('.display');

    // Internal state with sensible defaults
    this._value = 0;
    this._step = 1;
    this._max = 10;
    this._min = 0;

    // Bind methods once
    this._increment = this._increment.bind(this);
    this._decrement = this._decrement.bind(this);

    this._update();
  }

  _increment(e) {
    const next = this._value + this._step;
    if (next <= this._max) {
      this._value = next;
      this._update();
    }
  }

  _decrement(e) {
    const next = this._value - this._step;
    if (next >= this._min) {
      this._value = next;
      this._update();
    }
  }

  _update() {
    this._display.textContent = this._value;
    // Consider using CustomEvent with detail + bubbling in a real app.
    this.dispatchEvent(new Event('change'));
  }

  static get observedAttributes() {
    return ['value', 'min', 'max', 'step'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue == null) return;

    switch (name) {
      case 'value':
        this._value = parseInt(newValue, 10);
        if (Number.isNaN(this._value)) this._value = 0;
        this._update();
        break;
      case 'min':
        this._min = parseInt(newValue, 10);
        if (Number.isNaN(this._min)) this._min = 0;
        break;
      case 'max':
        this._max = parseInt(newValue, 10);
        if (Number.isNaN(this._max)) this._max = 10;
        break;
      case 'step':
        this._step = parseInt(newValue, 10);
        if (Number.isNaN(this._step) || this._step <= 0) this._step = 1;
        break;
    }
  }

  connectedCallback() {
    this._rightButton.addEventListener('click', this._increment);
    this._leftButton.addEventListener('click', this._decrement);
  }

  disconnectedCallback() {
    this._rightButton.removeEventListener('click', this._increment);
    this._leftButton.removeEventListener('click', this._decrement);
  }
}

customElements.define('fancy-counter', FancyCounter);

/*
CHALLENGES

- Challenge 1 — Integrate with your CSS Framework

  Replace the styles in the <style> block with styles that match
  your framework:

  - Use your design tokens (custom properties) for:
      - colors
      - border radius
      - spacing
      - font stack
  - Make the counter look like a first-class component in your system,
    not a standalone widget.

  Hints:
  - Reference tokens on :root in your framework:
      var(--color-border-strong)
      var(--radius-md)
      var(--space-sm)
      var(--font-family-base)
  - Decide whether this component should support light/dark themes.

- Challenge 2 — Variant support

  Add a "variant" attribute and corresponding CSS:

    <fancy-counter variant="outline"></fancy-counter>
    <fancy-counter variant="solid"></fancy-counter>

  In attributeChangedCallback, read "variant" and:
  - add a class to the root (e.g. "Counter--outline")
  - write CSS rules inside the template style to handle variants.
  
  Goal: practice mapping attribute → CSS class → visual variant.

- Challenge 3 — Better events (stretch)

  Replace the plain Event('change') with CustomEvent:

    new CustomEvent('change', {
      detail: { value: this._value },
      bubbles: true,
      composed: true,
    })

  Then, in a parent page, listen for "change" and log the new value.

  This is how real design systems expose component state to apps.

*/
