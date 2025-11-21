// Tutorial — Simple Slides / Carousel Web Component
// --------------------------------------------------
//
// This component will take <img> elements inside <simple-slides>
// and turn them into a basic slideshow / carousel.
//
// Example:
//
//   <simple-slides
//     width="400"
//     height="300"
//     time="2000"
//     transition="500"
//   >
//     <img src="one.jpg" alt="">
//     <img src="two.jpg" alt="">
//     <img src="three.jpg" alt="">
//   </simple-slides>
//
// Attributes:
//
//   - width:      width of the slideshow in pixels
//   - height:     height of the slideshow in pixels
//   - time:       how long each slide is shown (ms)
//   - transition: how long the slide animation takes (ms)
//   - paused:     (optional) if present, slideshow should not auto-advance
//
// Your goals:
//
//   1. Build the container + inner track structure.
//   2. Move all <img> children into the inner track.
//   3. Implement an interval that calls _nextImg() based on `time`.
//   4. Use CSS transform + transition to slide horizontally.
//   5. React to attribute changes (time, transition, paused).
//   6. Clean up timers when the element is removed.

class SimpleSlides extends HTMLElement {
  constructor() {
    super();

    // Read initial attributes (as strings); you will likely convert them
    // to numbers later:
    //
    //   this._widthAttr      = this.getAttribute('width');
    //   this._heightAttr     = this.getAttribute('height');
    //   this._timeAttr       = this.getAttribute('time');
    //   this._transitionAttr = this.getAttribute('transition');
    //   this._pausedAttr     = this.getAttribute('paused');
    //
    // You will then create normalized numeric properties like:
    //
    //   this._width      = Number(this._widthAttr) || 400;
    //   this._time       = Number(this._timeAttr) || 2000;
    //
    // Do this either here or in connectedCallback; just be consistent.


    // Create a shadow root node
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // -----------------------------------------
    // CHALLENGE 1 — BUILD THE CONTAINER & INNER
    // -----------------------------------------
    //
    // Create a container <div> to act as the viewport.
    //   - Set its width/height from this._width / this._height.
    //   - Add a border or background if you want.
    //   - Set overflow to "hidden".
    //
    // Example structure:
    //
    //   const container = document.createElement('div');
    //   this._shadowRoot.appendChild(container);
    //
    // Create an inner <div> that will hold all slides in a row:
    //   - display: flex
    //   - will be translated with transform: translateX(...)
    //
    // Store references, e.g.:
    //
    //   this._container = container;
    //   this._inner = innerDiv;
    //
    // Append inner to container, and container to shadow root.


    // -----------------------------------------
    // CHALLENGE 2 — MOVE IMAGES INTO THE INNER TRACK
    // -----------------------------------------
    //
    // Get the <img> children from the light DOM:
    //
    //   this._imgs = Array.from(this.querySelectorAll('img'));
    //
    // Loop over this._imgs and append each <img> to this._inner.
    //
    // Each image should:
    //   - have width set to 100% of the container width
    //   - height set to 100% or "object-fit: cover" as you prefer
    //
    // After this, the light DOM is just the <simple-slides> tag,
    // and all <img> tags live in the shadow DOM track.


    // -----------------------------------------
    // CHALLENGE 3 — INITIAL STATE
    // -----------------------------------------
    //
    // Keep track of:
    //
    //   this._index = 0;      // current slide index
    //   this._time = ...;     // numeric ms value for interval
    //   this._transition = ...; // numeric ms for CSS transition
    //   this._paused = false; // or derived from attribute
    //
    // Apply the transition style to the inner div:
    //
    //   this._inner.style.transition = `transform ${this._transition}ms ease`;
    //
    // Set an initial transform:
    //
    //   this._inner.style.transform = 'translateX(0px)';
  }

  // Use this to add the interval/timer
  _addTimer() {
    // -----------------------------------------
    // CHALLENGE 4 — START THE TIMER
    // -----------------------------------------
    //
    // Only create a timer if:
    //   - there are images (this._imgs.length > 1)
    //   - not paused (this._paused === false)
    //
    // Use:
    //
    //   this._timer = setInterval(() => {
    //     this._nextImg();
    //   }, this._time);
    //
    // Make sure you clear any existing timer first
    // to avoid multiple intervals running at once.
  }

  // Use this method to remove the interval/timer
  _removeTimer() {
    // -----------------------------------------
    // CHALLENGE 5 — CLEAR THE TIMER
    // -----------------------------------------
    //
    // If this._timer exists, call clearInterval(this._timer)
    // and then set this._timer = null (or undefined).
  }

  // This method is called when this component is added to the DOM
  connectedCallback() {
    // -----------------------------------------
    // CHALLENGE 6 — INITIALIZE AND START
    // -----------------------------------------
    //
    // Here you should:
    //
    //   - Normalize numeric values for width, height, time, transition.
    //   - Apply width/height to the container.
    //   - Apply transition to the inner track.
    //   - Initialize this._paused based on the "paused" attribute.
    //   - Call this._addTimer() if not paused.
  }

  // This method is called when this component is removed from the DOM
  disconnectedCallback() {
    // -----------------------------------------
    // CHALLENGE 7 — CLEAN UP
    // -----------------------------------------
    //
    // Call this._removeTimer() here.
  }

  // Use this list for all properties that your element observes
  static get observedAttributes() {
    // -----------------------------------------
    // CHALLENGE 8 — OBSERVED ATTRIBUTES
    // -----------------------------------------
    //
    // This should match the attributes you support:
    //
    //   - "time"
    //   - "transition"
    //   - "paused"
    //   - (optionally) "width", "height" if you want to update them dynamically
    //
    // Example:
    //   return ['time', 'transition', 'paused'];
    return [];
  }

  // Handle changes to attributes on the custom element
  attributeChangedCallback(name, oldValue, newValue) {
    // -----------------------------------------
    // CHALLENGE 9 — HANDLE ATTRIBUTE CHANGES
    // -----------------------------------------
    //
    // Use a switch statement to respond to changes:
    //
    //   switch (name) {
    //     case 'time':
    //       // parse newValue to number, assign to this._time
    //       // restart the timer: this._removeTimer(); this._addTimer();
    //       break;
    //
    //     case 'transition':
    //       // parse newValue, assign to this._transition
    //       // update this._inner.style.transition
    //       break;
    //
    //     case 'paused':
    //       // if newValue is null, paused was removed -> resume
    //       // if newValue is not null, paused was added -> stop
    //       // control the timer accordingly
    //       break;
    //
    //     // optional: handle width/height changes here too
    //   }
  }

  // Use this to advance to the next image or loop back to the first image.
  _nextImg() {
    // -----------------------------------------
    // CHALLENGE 10 — ADVANCE THE SLIDES
    // -----------------------------------------
    //
    // Logic:
    //
    //   1. Increment this._index:
    //        this._index++;
    //
    //   2. If this._index >= this._imgs.length, wrap back to 0.
    //
    //   3. Compute the offset in pixels:
    //        const offset = -this._width * this._index;
    //
    //   4. Update the transform on the inner track:
    //        this._inner.style.transform = `translateX(${offset}px)`;
    //
    // This will slide the track to the left by one slide width
    // each time _nextImg() is called.
  }
}

customElements.define('simple-slides', SimpleSlides);

/*
CHALLENGE SUMMARY
-----------------

Challenge 1:
  - Create container and inner track (<div>s), append to shadow root.
  - Style container: fixed width/height, overflow hidden.
  - Style inner: display flex, will be translated with transform.

Challenge 2:
  - Move <img> children from light DOM into the inner track.
  - Ensure they fill the slide area consistently.

Challenge 3:
  - Initialize state: _index, _time, _transition, _paused.
  - Apply transition style to inner.

Challenge 4 & 5:
  - Implement _addTimer() and _removeTimer() to manage setInterval.

Challenge 6 & 7:
  - On connectedCallback: normalize attributes, apply styles, start timer.
  - On disconnectedCallback: clear timer.

Challenge 8 & 9:
  - Observe "time", "transition", "paused".
  - When "time" changes: update _time, restart timer.
  - When "transition" changes: update _transition and CSS.
  - When "paused" is added/removed: stop or start the timer.

Challenge 10:
  - Implement _nextImg() to advance slides and loop back to the first.

EXTRA IDEAS:

- Add left/right arrow buttons to manually navigate between slides.
- Add indicators (dots) for the current slide.
- Allow direction attribute, e.g. direction="rtl" to slide right.
- Allow "hover to pause" behavior using mouseenter/mouseleave.
*/
