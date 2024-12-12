
// Import LitElement and html, and css.
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

// Extend LitElement
class LitCounter extends LitElement {
  
  // Define a property. 
  // Notice we set the type to number since count will be a number
  // Also notice we set reflect to true. This displays the value of 
  // count as an attribute on the source element. 
  // Declaring count here makes it a reactive, this causes the component 
  // to render when the the value of count changes. 
  static properties = {
    count: { 
      type: Number, 
      reflect: true 
    }
  };

  // Initialize this component
  constructor() {
    super();
    this.count = 0;
  }

  // Define some styles for this component
  // Styles should be run through the css function 
  static styles = css`
    :host {
      
    }

    .container {
      display: flex;
    }

    .counter-display {
      padding: 0 0.5rem;
      border-top: 1px solid;
      border-bottom: 1px solid;
    }

    .counter-button {
      border: 1px solid;
      background-color: #eee;
    }

    .counter-button.left {
      border-radius: 0.5rem 0 0 0.5rem;
    }

    .counter-button.right {
      border-radius: 0 0.5rem 0.5rem 0;
    }
  `;

  // Render displays this component 
  render() {
    // Events are assigned with @. Lit recognizes all of the standard events
    // https://lit.dev/docs/components/events/
    // Here the buttons are assigned 
    return html`
      <div class="container">
        <button 
          @click="${this._decrement}"
          class="counter-button left"
        >-</button>
        <div class="counter-display">${this.count}</div>
        <button 
           @click="${this._increment}"
          class="counter-button right"
        >+</button>
      </div>
    `;
  }

  _decrement(e) {
    this.count -= 1
  }

  _increment(e) {
    this.count += 1
  } 
}

customElements.define('lit-counter', LitCounter);