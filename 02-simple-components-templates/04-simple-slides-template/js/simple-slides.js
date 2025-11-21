// SimpleSlides Web Component — Improved Version

// Template for the slideshow UI
const simpleSlidesTemplate = document.createElement('template');
simpleSlidesTemplate.innerHTML = `
  <style>
    :host {
      display: inline-block;
    }

    .container {
      border: 3px solid;
      overflow: hidden;
      position: relative;
    }

    .inner {
      display: flex;
      transform: translateX(0);
      /* transition for transform will be set dynamically from JS */
    }

    ::slotted(img) {
      /* fallback if images are not moved into shadow; optional */
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  </style>
  <div class="container">
    <div class="inner"></div>
  </div>
`;

class SimpleSlides extends HTMLElement {
  constructor() {
    super();

    // Attach shadow root and clone template
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(
      simpleSlidesTemplate.content.cloneNode(true)
    );

    this._container = this._shadowRoot.querySelector('.container');
    this._inner = this._shadowRoot.querySelector('.inner');

    // Collect images from light DOM
    this._imgs = Array.from(this.querySelectorAll('img'));

    // Move images into shadow DOM (slide track)
    this._imgs.forEach(img => {
      // Make sure each image fits the container
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      this._inner.appendChild(img);
    });

    // Internal state with defaults
    this._width = 400;
    this._height = 300;
    this._time = 2000;        // ms between slides
    this._transition = 400;   // ms for slide animation
    this._paused = false;
    this._index = 0;
    this._timer = null;
  }

  // Attributes this component reacts to
  static get observedAttributes() {
    return ['width', 'height', 'time', 'transition', 'paused'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Normalize attributes whenever they change
    switch (name) {
      case 'width': {
        const n = Number(newValue);
        if (!Number.isNaN(n) && n > 0) {
          this._width = n;
          this._applySize();
          this._updateTransform();
        }
        break;
      }
      case 'height': {
        const n = Number(newValue);
        if (!Number.isNaN(n) && n > 0) {
          this._height = n;
          this._applySize();
        }
        break;
      }
      case 'time': {
        const n = Number(newValue);
        if (!Number.isNaN(n) && n > 0) {
          this._time = n;
          this._restartTimer();
        }
        break;
      }
      case 'transition': {
        const n = Number(newValue);
        if (!Number.isNaN(n) && n >= 0) {
          this._transition = n;
          this._applyTransition();
        }
        break;
      }
      case 'paused': {
        // presence/absence → boolean
        this._paused = newValue !== null;
        this._restartTimer();
        break;
      }
    }
  }

  connectedCallback() {
    // Initial sync from attributes
    this._initFromAttributes();

    // Apply size and transition based on current state
    this._applySize();
    this._applyTransition();

    // Show initial slide
    this._index = 0;
    this._updateTransform();

    // Start timer unless paused or trivial
    this._addTimer();
  }

  disconnectedCallback() {
    this._removeTimer();
  }

  // --- Internal helpers ---

  _initFromAttributes() {
    const widthAttr = this.getAttribute('width');
    const heightAttr = this.getAttribute('height');
    const timeAttr = this.getAttribute('time');
    const transitionAttr = this.getAttribute('transition');

    if (widthAttr != null) {
      const n = Number(widthAttr);
      if (!Number.isNaN(n) && n > 0) this._width = n;
    }
    if (heightAttr != null) {
      const n = Number(heightAttr);
      if (!Number.isNaN(n) && n > 0) this._height = n;
    }
    if (timeAttr != null) {
      const n = Number(timeAttr);
      if (!Number.isNaN(n) && n > 0) this._time = n;
    }
    if (transitionAttr != null) {
      const n = Number(transitionAttr);
      if (!Number.isNaN(n) && n >= 0) this._transition = n;
    }

    this._paused = this.hasAttribute('paused');
  }

  _applySize() {
    if (!this._container) return;
    this._container.style.width = `${this._width}px`;
    this._container.style.height = `${this._height}px`;
  }

  _applyTransition() {
    if (!this._inner) return;
    if (this._transition > 0) {
      this._inner.style.transition = `transform ${this._transition}ms ease`;
    } else {
      // No animation if transition is 0
      this._inner.style.transition = 'none';
    }
  }

  _addTimer() {
    this._removeTimer();
    if (this._paused) return;
    if (!this._imgs.length || this._imgs.length === 1) return;
    if (this._time <= 0) return;

    this._timer = setInterval(() => this._nextImg(), this._time);
  }

  _removeTimer() {
    if (this._timer != null) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  _restartTimer() {
    // Called when time/paused changes
    this._addTimer();
  }

  _nextImg() {
    if (!this._imgs.length) return;
    this._index = (this._index + 1) % this._imgs.length;
    this._updateTransform();
  }

  _updateTransform() {
    if (!this._inner) return;
    if (!this._imgs.length) return;

    const offset = -this._width * this._index;
    this._inner.style.transform = `translateX(${offset}px)`;
  }
}

customElements.define('simple-slides', SimpleSlides);
