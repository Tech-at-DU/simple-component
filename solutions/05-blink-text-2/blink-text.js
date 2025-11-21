// Tutorial — Blink Text with Attributes
// -------------------------------------
//
// This version of <blink-text> uses attributes to control how it blinks.
//
// Example usage:
//
//   <blink-text time="1000" min="0.2" max="1.0">Blink slowly</blink-text>
//
// Attributes:
//
//   - time: interval in milliseconds between opacity changes (default e.g. 1000ms)
//   - min:  minimum opacity (0.0–1.0), e.g. 0.2
//   - max:  maximum opacity (0.0–1.0), e.g. 1.0
//
// Your goals:
//
//   1. Read the initial attribute values in the constructor or connectedCallback.
//   2. Watch for changes to those attributes (observedAttributes + attributeChangedCallback).
//   3. Start an interval timer in connectedCallback that toggles opacity between min and max.
//   4. Clear the interval in disconnectedCallback.
//   5. Update the timer when attributes change (e.g. time is updated).

class BlinkText extends HTMLElement {
  constructor() {
    super();

    // Attach shadow root
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // Create an internal span to hold the blinking text
    this._blinkEl = document.createElement('span');
    this._shadowRoot.appendChild(this._blinkEl);

    // Copy the initial text from the host into the span.
    // Use textContent, not innerHTML.
    //
    // Example idea:
    //   this._blinkEl.textContent = ???

    const text = this.textContent
    this._blinkEl.innerText = text


    // Set default values for internal state:
    //
    //   this._time = 1000;     // default blink interval in ms
    //   this._min  = 0.0;      // default minimum opacity
    //   this._max  = 1.0;      // default maximum opacity
    //   this._opacityFlag = 1; // tracks "on/off" state (1 = max, 0 = min)
    //
    // Initialize these properties here so you always have a fallback
    // when attributes are missing.

    this._time = 1000
    this._min = 0.0
    this._max = 1.0
    this._opacityFlag = 1


    // Add initial styles to the blink element.
    // You will probably want:
    //
    //   - this._blinkEl.style.display = 'inline-block';
    //   - this._blinkEl.style.opacity = '1';
    //   - this._blinkEl.style.transition = 'opacity 0.5s ease-in-out';
    //
    // (Choose your own transition duration; you can also base it on _time later.)

    this._blinkEl.style.display = 'inline-block'
    this._blinkEl.style.opacity = '1'
    this._blinkEl.style.transition = 'opacity 500ms ease-in-out'
  }

  // Tell the component which attributes to watch for changes.
  static get observedAttributes() {
    // -----------------------------------------
    // CHALLENGE 1 — OBSERVED ATTRIBUTES
    // -----------------------------------------
    //
    // Add all the attribute names you want to respond to here.
    //
    // At minimum:
    //   - "time"
    //   - "min"
    //   - "max"
    //
    // Example shape:
    //   return ['time', 'min', 'max'];
    //
    // Fill this in.
    return ['time', 'min', 'max'];
  }

  // Called when an observed attribute changes:
  //   name:      the attribute name (e.g. "time")
  //   oldValue:  previous value (string or null)
  //   newValue:  new value (string or null)
  attributeChangedCallback(name, oldValue, newValue) {
    // -----------------------------------------
    // CHALLENGE 2 — HANDLE ATTRIBUTE CHANGES
    // -----------------------------------------
    //
    // For each observed attribute:
    //
    //   - If name === 'time':
    //       - parse newValue as an integer and assign to this._time
    //       - restart the timer (clear old interval, start a new one)
    //
    //   - If name === 'min':
    //       - parse newValue as a float and assign to this._min
    //
    //   - If name === 'max':
    //       - parse newValue as a float and assign to this._max
    //
    // HINTS:
    //   - use Number(), parseInt(), or parseFloat() as appropriate
    //   - guard against NaN (fallback to defaults if parsing fails)
    //   - you will want to call this._clearTimer() and this._addTimer()
    //     when time changes.
    switch (name) {
      case 'time': 
        this._time = parseInt(newValue)
        break
      case 'min': 
        this._min = parseInt(newValue)
        break
      case 'max':
        this._max = parseInt(newValue)
        break
      default: 
        break
    }
  }

  connectedCallback() {
    // -----------------------------------------
    // CHALLENGE 3 — READ INITIAL ATTRIBUTES
    // -----------------------------------------
    //
    // When the element is inserted into the DOM:
    //
    //   - Read the current values of the attributes (time, min, max)
    //     using this.getAttribute('time') etc.
    //   - If the attributes are present, update this._time, this._min, this._max.
    //   - Then start the blink timer by calling a helper method, e.g.:
    //       this._addTimer();
    //
    // Make sure you don't create multiple timers if connectedCallback()
    // runs more than once.
    this._time = parseInt(this.getAttribute('time')) || 1000
    this._min  = parseInt(this.getAttribute('min')) || 0.0
    this._max  = parseInt(this.getAttribute('max')) || 1.0
    
    this._addTimer()
  }

  disconnectedCallback() {
    // -----------------------------------------
    // CHALLENGE 4 — CLEAN UP YOUR TIMER
    // -----------------------------------------
    //
    // When the element is removed from the DOM, you must clear
    // the interval so it doesn't continue running.
    //
    // Implement a helper method _clearTimer() and call it here.
  }

  _addTimer() {
    // -----------------------------------------
    // CHALLENGE 5 — IMPLEMENT THE TIMER
    // -----------------------------------------
    //
    // Implement the logic to:
    //
    //   - clear any existing interval (defensive)
    //   - set this._blinkEl.style.transition for smooth fading
    //     (you can base the duration on this._time if you want)
    //   - create a new interval with:
    //
    //       this._timer = setInterval(() => {
    //         // toggle between min and max opacity
    //       }, this._time);
    //
    // Use your internal state:
    //   - if this._opacityFlag is 1, set opacity to this._min
    //   - if this._opacityFlag is 0, set opacity to this._max
    //   - then flip the flag:
    //       this._opacityFlag = this._opacityFlag === 1 ? 0 : 1;
    this._clearTimer()
    this._timer = setInterval(() => {
      this._opacityFlag = !this._opacityFlag
      this._blinkEl.style.opacity = this._opacityFlag ? this._max : this._min
    }, this._time)
  }

  _clearTimer() {
    // -----------------------------------------
    // CHALLENGE 6 — CLEAR THE INTERVAL
    // -----------------------------------------
    //
    // If this._timer is set, call clearInterval(this._timer).
    // Then reset this._timer to null (or undefined).
    //
    // Always check first so you don't call clearInterval on
    // an undefined value.
    clearInterval(this._timer)
  }
}

customElements.define('blink-text', BlinkText);

/*
ATTRIBUTES & BEHAVIOR NOTES
---------------------------

The idea here is that your custom element behaves like a "real" HTML tag:

  <blink-text time="2000" min="0.5" max="1.0">Hello World</blink-text>

- "time" controls the blink interval in ms (e.g. 2000ms = 2 seconds).
- "min" and "max" control the opacity range (from 0.0 to 1.0).

CHALLENGE SUMMARY:

1. Add 'time', 'min', and 'max' to observedAttributes().
2. Parse and store attribute values in attributeChangedCallback().
3. Read initial attribute values in connectedCallback().
4. Implement _addTimer() to:
   - set up the transition
   - start setInterval() that toggles opacity between min and max.
5. Implement _clearTimer() to safely clear the interval.
6. Make sure changing the "time" attribute restarts the timer.

OPTIONAL EXTRAS:

- Add a "paused" attribute; when present, stop blinking.
- Add a "once" attribute; fade in and out one time, then stop.
- Add a "mode" attribute that switches between "fade" and "hard" blink.
*/
