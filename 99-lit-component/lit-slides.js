import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class LitSlides extends LitElement {
  static properties = {
    index: { type: Number, reflect: true }
  };

  constructor() {
    super();
    this.index = 0;
    this.slides = [];
  }

  firstUpdated() {
    // Use first updated to initialize things that reference the DOM. 
    // Using firstUpdated guarantees that all DOM elements are available. 
    // https://lit.dev/docs/components/lifecycle/#firstupdated
    this.slides = Array.from(this.children);
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
          ${this.slides.map(
            (slide, i) => html`
              <div class="slide ${i === this.index ? 'visible' : ''}">
                ${slide.cloneNode(true)}
              </div>`
          )}
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
    this.index = (this.index - 1 + this.slides.length) % this.slides.length;
    this._updateSlideVisibility();
  }

  _next() {
    this.index = (this.index + 1) % this.slides.length;
    this._updateSlideVisibility();
  }

  _updateSlideVisibility() {
    this.requestUpdate(); // Ensure the slides re-render with updated visibility
    // https://lit.dev/docs/components/lifecycle/#requestUpdate
  }
}

customElements.define('lit-slides', LitSlides);
