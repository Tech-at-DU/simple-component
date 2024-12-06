
// Import LitElement and html, and css.
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

// Extend LitElement
class LitRainbow extends LitElement {
  
  // Define a property 
  static properties = {
    text: { type: String }
  };

  // Initialize this component
  constructor() {
    super();
    this.text = this.innerText;
  }

  // Define some styles for this component
  // Styles should be run through the css function 
  static styles = css`
    :host {
      display: inline;
    }
    .rainbow {
      font-weight: bold;
      display: inline;
    }
  `;

  // Render displays this component 
  render() {
    // Always run your html output through the html function
    return html`
      <span class="rainbow">
        ${this._renderRainbowText(this.text)}
      </span>
    `;
  }

  // This helper function turns this.text into spans each with a color class.
  _renderRainbowText(text) {
    const colors = [
      'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'
    ];
    return text.split('').map((char, index) => {
      const color = colors[index % colors.length];
      // This is html so we run it through the html function
      return html`<span style="color: ${color};">${char}</span>`;
    });
  }
}

customElements.define('lit-rainbow', LitRainbow);