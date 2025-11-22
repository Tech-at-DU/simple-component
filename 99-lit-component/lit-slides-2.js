import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class LitSlides2 extends LitElement {
  static properties = {
    index: { type: Number, reflect: true }
  };

  constructor() {
    super();
    this.index = 0;
    this.slides = [];
  }

  firstUpdated() {
    const slides = this.querySelectorAll('lit-slide')
    // Interesting, looks like it is possible to assign multiple items to a single slot. 
    slides.forEach(slide => {
      slide.setAttribute('slot', 'slides-slot')
    });
    
    this.slideCount = slides.length
    this.slidesInner = this.renderRoot.querySelector('.slides-inner')
    this.slidesOffset = parseInt(getComputedStyle(this.slidesInner).getPropertyValue('--slide-width'))

    // setting a custom property with JS is easier than getting the property!
    // Set a property with: 
    // element.style.setProperty('--some-custom-prop', 'value')
    // To get a custom property you must use getComputedStyle(element) first!
    // getComputedStyle(element).getPropertyValue('--some-custom-prop')
    // In this example above this returns 259px. I needed a number so I passed the 
    // returned string value to parseInt() which removes the suffix. 

    this._updateSlideVisibility(); // Ensure the first slide is visible on load
  }

  static styles = css`
    :host {
      --slide-width: 100%;
      --slide-height: 300px;
      display: block;
      font-family: Arial, sans-serif;
      margin: 1rem 0;
    }

    .container {
      display: flex;
      align-items: stretch;
    }

    .slide-container {
      position: relative;
      overflow: hidden; 
      width: var(--slide-width);
      height: var(--slide-height);
      margin: 0;
    }

    .slides-inner {
      display: flex;
      transition: 400ms;
    }

    .slide {
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 1s linear;
    }

    .slide.visible {
      opacity: 1;
      z-index: 1
    }

    .button {
      border: 1px solid #ccc;
      background-color: #f9f9f9;
      cursor: pointer;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      display: block;
    }

    .button.left {
      border-radius: 0.5rem 0 0 0.5rem;
    }

    .button.right {
      border-radius: 0 0.5rem 0.5rem 0;
    }

    .button:hover {
      background-color: #ddd;
    }`;

  render() {
    return html`
      <div class="container">
        <button 
          @click="${this._prev}" 
          class="button left">
          &larr;
        </button>
        <div class="slide-container">
          <div class="slides-inner">
            <slot name="slides-slot"></slot>
          </div>
        </div>
        <button 
          @click="${this._next}" 
          class="button right">
          &rarr;
        </button>
      </div>
    `;
  }

  _prev() {
    this.index = this.index > 0 ? this.index - 1 : this.slideCount - 1;
    this._updateSlideVisibility();
  }

  _next() {
    this.index = this.index < this.slideCount - 1 ? this.index + 1 : 0;
    this._updateSlideVisibility();
  }

  _updateSlideVisibility() {
    this.slidesInner.style.transform = `translate(${this.index * -this.slidesOffset}px, 0)`
    this.requestUpdate();
  }
}

customElements.define('lit-slides-2', LitSlides2);
