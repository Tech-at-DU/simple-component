// SimpleSlides (Light DOM Version)
// --------------------------------
// This version demonstrates a Custom Element that *does not*
// use a Shadow DOM. The template is inserted directly into
// the element's light DOM, so styles participate in the page’s
// global cascade.

// TEMPLATE ----------------------------------------------------
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
      border: 3px solid;
      overflow: hidden;
    }

    .inner {
      display: flex;
      /* Default transition — can be overridden by attribute */
      transition: transform 400ms ease;
    }
  </style>

  <div class="container">
    <div class="inner"></div>
  </div>
`;

// COMPONENT ---------------------------------------------------
class SimpleSlides extends HTMLElement {
  constructor() {
    super();

    // 1. Read attributes as numbers (avoid string coercion bugs)
    this._width = Number(this.getAttribute('width')) || 400;
    this._height = Number(this.getAttribute('height')) || 300;
    this._time = Number(this.getAttribute('time')) || 2000;
    this._transition = Number(this.getAttribute('transition')) || 400;
    this._paused = this.hasAttribute('paused');

    // 2. Insert template into the *light DOM* (no shadow root)
    //    This means styles inside <style> apply normally
    //    and can be affected by global CSS.
    this.appendChild(template.content.cloneNode(true));

    // 3. Select internal structure directly through this.querySelector
    this._container = this.querySelector('.container');
    this._inner = this.querySelector('.inner');

    // 4. Apply configured width + height
    this._container.style.width = `${this._width}px`;
    this._container.style.height = `${this._height}px`;

    // 5. Collect all <img> children from the light DOM
    this._imgs = Array.from(this.querySelectorAll('img'));

    // Move images into the .inner track
    this._imgs.forEach(img => {
      img.style.width = `${this._width}px`;
      img.style.height = `${this._height}px`;
      img.style.objectFit = 'cover';
      this._inner.appendChild(img);
    });

    // Index of current image
    this._index = 0;
    this._timer = null;
  }

  // LIFECYCLE --------------------------------------------------

  connectedCallback() {
    if (!this._paused) {
      this._startTimer();
    }
    this._updateTransform();
  }

  disconnectedCallback() {
    this._stopTimer();
  }

  // OBSERVED ATTRIBUTES ----------------------------------------
  static get observedAttributes() {
    return ['width', 'height', 'time', 'transition', 'paused'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'width':
        this._width = Number(newValue);
        this._container.style.width = `${this._width}px`;
        this._updateTransform();
        break;

      case 'height':
        this._height = Number(newValue);
        this._container.style.height = `${this._height}px`;
        break;

      case 'time':
        this._time = Number(newValue);
        this._restartTimer();
        break;

      case 'transition':
        this._transition = Number(newValue);
        this._inner.style.transition = `transform ${this._transition}ms ease`;
        break;

      case 'paused':
        this._paused = newValue !== null;
        this._restartTimer();
        break;
    }
  }

  // INTERNAL METHODS -------------------------------------------

  _startTimer() {
    this._stopTimer();

    // Don’t run a timer if paused or only one slide
    if (this._paused || this._imgs.length <= 1) return;

    this._timer = setInterval(() => this._nextSlide(), this._time);
  }

  _stopTimer() {
    if (this._timer !== null) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  _restartTimer() {
    this._startTimer();
  }

  _nextSlide() {
    if (!this._imgs.length) return;

    this._index = (this._index + 1) % this._imgs.length;
    this._updateTransform();
  }

  _updateTransform() {
    const offset = -this._width * this._index;
    this._inner.style.transform = `translateX(${offset}px)`;
  }
}

// REGISTER -----------------------------------------------------
customElements.define('simple-slides-light', SimpleSlides);
