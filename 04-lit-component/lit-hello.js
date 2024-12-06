
// Import Lit Element
// In this example I imported from the CDN. This is whole lit package 
// bundled and ready to use. 
// You can also use Lit with npm if you have an npm project. 

// Import LitElement and html.
import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

// Extend LitElement
class LitHello extends LitElement {
  constructor() {
    // Call super in the constructor
    super()

  }

  // Render should return the html this component displays
  // Always run your html through the html function. 
  // See Tagged Templates here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
  render() {
    return html`
    <h1>Hello World</h1>`
  }
}

customElements.define('lit-hello', LitHello)