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

  <!-- 
  
    This template now includes "parts". 
    The elements with named parts can be accessed 
    from styles defined in the light DOM.
    
    TODO: Find the parts named: 
    - container
    - button
    - icon
    - display

  -->

  <div class="container" part="container">
    <div class="button left" part="button decrement">
      <div class="arrow" part="icon"></div>
    </div>

    <div class="display" part="display"></div>

    <div class="button right" part="button increment">
      <div class="arrow" part="icon"></div>
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

  // Getters and setters 
  get value() {
    return this._value
  }

  set value(newValue) {
    const num = Number(newValue)
    if (Number.isNaN(num)) {
      return
    }

    this._value = num
    this.setAttribute('value', String(num))

    this._update
  }

  // Private Methods
  _increment(e) {
    const next = this._value + this._step;
    if (next <= this._max) {
      this._value = next;
      this.value = this._value
      this._update();
    }
  }

  _decrement(e) {
    const next = this._value - this._step;
    if (next >= this._min) {
      this._value = next;
      this.value = this._value
      this._update();
    }
  }

  _update() {
    this._display.textContent = this._value;
    this.dispatchEvent(new Event('change'));
  }

  static get observedAttributes() {
    return ['value', 'min', 'max', 'step'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue == null) return;

    switch (name) {
      case 'value':
        const num = Number(newValue);
        // Prevent circular attribute changed calls
        if (!Number.isNaN(num) && num !== this._value) {
          this._value = num;
          this.value = this._value
          this._update();
        }
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
