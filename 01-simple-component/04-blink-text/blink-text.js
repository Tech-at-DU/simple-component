// Tutorial — Bring Back <blink> with a Web Component
// --------------------------------------------------
//
// This component will recreate a safe version of the old <blink> tag.
//
// Usage:
//   <blink-text>Blink me (but not too fast)</blink-text>
//
// Your goal:
// - Make the text fade in and out over time
// - Use a timer (setInterval) started in connectedCallback()
// - Clean up the timer in disconnectedCallback()
// - Use opacity + CSS transition instead of rapidly toggling display
//
// IMPORTANT: avoid very fast flashing (accessibility issue).
// Keep the interval to something like 700–1000ms or slower.

class BlinkText extends HTMLElement {
  constructor() {
    super();

    // Attach a shadow root to encapsulate internal DOM and styles.
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // Create an element to hold the blinking text.
    this._blinkEl = document.createElement('span');
    this._shadowRoot.appendChild(this._blinkEl);

    // Copy the initial text content from the host element
    // into the internal span. Use textContent instead of innerHTML.
    //
    // Example idea:
    //   this._blinkEl.textContent = ???
    //
    // (You fill this in.)

    // Add any initial styles needed to the blinking element.
    // At minimum you will want:
    // - display: inline-block (so transforms/transitions work predictably)
    // - transition on opacity for smooth fading (Challenge 2)
    //
    // Example idea:
    //   this._blinkEl.style.transition = 'opacity 0.5s ease-in-out';
    //
    // (You decide exact values.)
  }

  // Called when this component is inserted into the DOM.
  connectedCallback() {
    // -----------------------------------------
    // CHALLENGE 1 — START THE BLINK TIMER
    // -----------------------------------------
    //
    // Goal: make the text appear and disappear over time by
    // toggling its opacity between 0 and 1.
    //
    // Steps:
    //   1. Initialize a state flag, e.g. this._visible = true;
    //   2. Create an interval with setInterval().
    //   3. Inside the interval callback:
    //        - toggle the flag
    //        - set this._blinkEl.style.opacity based on the flag
    //
    // Example skeleton:
    //
    //   this._visible = true;
    //   this._timer = setInterval(() => {
    //     // toggle visible state
    //     // update this._blinkEl.style.opacity
    //   }, 1000);
    //
    // Use a reasonable interval (e.g. 700–1000ms) to avoid
    // aggressive flashing.


    // -----------------------------------------
    // CHALLENGE 2 — FADE, DON'T JUMP
    // -----------------------------------------
    //
    // Once basic blinking works, make it fade smoothly instead of
    // instantly switching.
    //
    // Use CSS transition on opacity:
    //
    //   this._blinkEl.style.transition = 'opacity 0.5s ease-in-out';
    //
    // Then toggling:
    //   this._blinkEl.style.opacity = '0';
    //   this._blinkEl.style.opacity = '1';
    //
    // will produce a fade in/out instead of a hard jump.
  }

  // Called when this component is removed from the DOM.
  disconnectedCallback() {
    // -----------------------------------------
    // CHALLENGE 3 — CLEAN UP YOUR TIMER
    // -----------------------------------------
    //
    // When the element is removed, you MUST clear the interval
    // so it doesn’t keep running in the background.
    // 
    // If you stored the interval id in this._timer,
    // you can stop it with:
    //
    //   clearInterval(this._timer);
    //
    // Add a defensive check so you don’t call clearInterval on
    // an undefined value.
  }
}

customElements.define('blink-text', BlinkText);

/*
EXTRA IDEAS (Optional):

- Let the user control the blink speed with an attribute, e.g.:
    <blink-text speed="1500">Slow blink</blink-text>
  Read the attribute in connectedCallback():
    const speed = Number(this.getAttribute('speed')) || 1000;

- Add a "pause" mode:
    <blink-text paused>...</blink-text>
  If the attribute "paused" is present, do not start the timer.

- Add a "once" mode:
    <blink-text once>...</blink-text>
  Fade in, fade out one time, then stop.
*/
