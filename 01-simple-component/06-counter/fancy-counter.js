// Tutorial — Fancy Counter Web Component
// --------------------------------------
//
// Build a <fancy-counter> component that renders a small counter UI
// with two buttons and a display:
//
//   <fancy-counter></fancy-counter>
//
// Renders something like:
//
//   [ - ]  0  [ + ]
//
// Requirements:
//
// - The middle element shows the current value.
// - Left button decrements, right button increments.
// - The component should be configurable via attributes:
//
//     <fancy-counter value="5" min="0" max="10" step="2"></fancy-counter>
//
//   - value: starting value
//   - min:   minimum allowed value
//   - max:   maximum allowed value
//   - step:  how much to add/subtract per click
//
// Follow the comments below to implement the component.

class FancyCounter extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // -----------------------------------------
    // CHALLENGE 1 — BUILD THE INTERNAL STRUCTURE
    // -----------------------------------------
    //
    // Create a container element for the counter UI:
    //
    //   const container = document.createElement('div');
    //
    // Append the container to the shadow root:
    //
    //   this._shadowRoot.appendChild(container);
    //
    // Then create three internal elements:
    //
    //   - left button (e.g. span or button)
    //   - display element (e.g. span or div)
    //   - right button
    //
    // Store references on "this", for example:
    //
    //   this._btnDec = ...
    //   this._display = ...
    //   this._btnInc = ...
    //
    // Append them to the container in the correct order.


    // -----------------------------------------
    // CHALLENGE 2 — STYLE THE COUNTER
    // -----------------------------------------
    //
    // Use inline styles for now (later you can move to <style>).
    //
    // On the container:
    //   - display: flex
    //   - alignItems: 'center'
    //   - gap between children
    //
    // On the left/right “buttons”:
    //   - cursor: 'pointer'
    //   - padding
    //   - border / background to look clickable
    //
    // On the display:
    //   - larger font-size
    //   - fixed min-width to keep layout stable
    //
    // Example idea:
    //   container.style.display = 'flex';
    //   container.style.alignItems = 'center';
    //
    // Choose your own exact styles.


    // -----------------------------------------
    // CHALLENGE 3 — INTERNAL STATE
    // -----------------------------------------
    //
    // Define properties to track the current value and bounds:
    //
    //   this._value = 0;
    //   this._min = -Infinity;  // or a reasonable default
    //   this._max = Infinity;
    //   this._step = 1;
    //
    // Initialize these here so the component has defaults even if
    // no attributes are provided.
    //
    // Finally, call a helper to update the display:
    //
    //   this._update();
  }

  // Use this to increase the value
  _increment(e) {
    // -----------------------------------------
    // CHALLENGE 4 — INCREMENT LOGIC
    // -----------------------------------------
    //
    // Increase this._value by this._step, but do not exceed this._max.
    //
    // Pseudocode:
    //   const next = this._value + this._step;
    //   this._value = Math.min(next, this._max);
    //   this._update();
  }

  // Use this to decrease the value
  _decrement(e) {
    // -----------------------------------------
    // CHALLENGE 5 — DECREMENT LOGIC
    // -----------------------------------------
    //
    // Decrease this._value by this._step, but do not go below this._min.
    //
    // Pseudocode:
    //   const next = this._value - this._step;
    //   this._value = Math.max(next, this._min);
    //   this._update();
  }

  // Use this to update the value displayed
  _update() {
    // -----------------------------------------
    // CHALLENGE 6 — UPDATE DISPLAY
    // -----------------------------------------
    //
    // Set the text of the display element to this._value.
    //
    // Example:
    //   this._display.textContent = this._value;
  }

  // Observe configuration attributes
  static get observedAttributes() {
    // -----------------------------------------
    // CHALLENGE 7 — OBSERVED ATTRIBUTES
    // -----------------------------------------
    //
    // Add these attribute names:
    //
    //   - "value"
    //   - "min"
    //   - "max"
    //   - "step"
    //
    // Example:
    //   return ['value', 'min', 'max', 'step'];
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // -----------------------------------------
    // CHALLENGE 8 — HANDLE ATTRIBUTE CHANGES
    // -----------------------------------------
    //
    // This runs whenever one of the observed attributes changes.
    //
    // Use a switch or if/else to handle each attribute:
    //
    //   - value: parse as number and set this._value
    //   - min:   parse as number and set this._min
    //   - max:   parse as number and set this._max
    //   - step:  parse as number and set this._step
    //
    // After updating a property, call this._update() to refresh
    // the display (especially for "value").
    //
    // Remember: newValue is a string. Use Number(), parseInt(),
    // or parseFloat(), and provide fallbacks if parsing fails.
  }

  connectedCallback() {
    // -----------------------------------------
    // CHALLENGE 9 — INITIAL SETUP
    // -----------------------------------------
    //
    // This runs when the element is inserted into the DOM.
    //
    // Here you should:
    //   - Read initial attributes (value, min, max, step) using
    //     this.getAttribute(...), and update this._value / _min / _max / _step.
    //   - Attach click event listeners to the left/right buttons:
    //
    //       this._btnInc.addEventListener('click', this._increment.bind(this));
    //       this._btnDec.addEventListener('click', this._decrement.bind(this));
    //
    //   - Call this._update() once to ensure the display is in sync.
  }

  disconnectedCallback() {
    // -----------------------------------------
    // CHALLENGE 10 — CLEAN UP LISTENERS
    // -----------------------------------------
    //
    // Remove any event listeners you added in connectedCallback()
    // to avoid memory leaks:
    //
    //   this._btnInc.removeEventListener('click', ...);
    //   this._btnDec.removeEventListener('click', ...);
    //
    // You’ll need to keep references to the bound handlers if
    // you want to remove them cleanly.
  }
}

customElements.define('fancy-counter', FancyCounter);

/*
CHALLENGE SUMMARY
-----------------

Challenge 1:
  - Build the internal DOM: container + left button + display + right button.

Challenge 2:
  - Style the container as a horizontal flex row.
  - Style the buttons to look clickable.
  - Style the display to show a large number.

Challenge 3:
  - Add internal state: _value, _min, _max, _step.
  - Call _update().

Challenge 4 & 5:
  - Implement _increment() and _decrement() honoring min/max bounds.

Challenge 6:
  - Implement _update() to sync the display.

Challenge 7 & 8:
  - Observe "value", "min", "max", "step".
  - Parse the new attribute values and update internal state.
  - Call _update() when needed.

Challenge 9:
  - On connectedCallback:
    - read initial attributes
    - attach click listeners
    - call _update().

Challenge 10:
  - On disconnectedCallback:
    - remove event listeners.

EXTRA IDEAS:

- Add keyboard support: left/right arrow keys to decrement/increment.
- Add a "disabled" attribute which prevents clicking.
- Add a "label" slot so you can write:
    <fancy-counter label="Quantity"></fancy-counter>
  and render the label next to or above the counter.
*/
