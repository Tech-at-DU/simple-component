// Tutorial #2 — Rainbow Text Web Component
// ----------------------------------------
//
// Your goal: Create a <rainbow-text> component that displays its text
// with each *word* in a different color. Example:
//
//   <rainbow-text>Hello world this is colorful</rainbow-text>
//
// Should render each word with a different hue.
//
// This tutorial introduces:
// - Reading content from the "light DOM"
// - Using the shadow DOM to render new elements
// - Splitting text into words
// - Creating DOM nodes dynamically
// - Setting styles on each generated element
//
// You will complete this component by following the instructions
// in the comments below.

class RainbowText extends HTMLElement {
  constructor() {
    super();

    // Attach a shadow root for internal rendering
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // -----------------------------------------
    // CHALLENGE 1 — GET THE TEXT TO TRANSFORM
    // -----------------------------------------
    //
    // Get the text that appears inside the <rainbow-text> tag.
    // This is the *light DOM* content.
    //
    // Use a property that returns only the text (not HTML).
    //
    // Store it in a variable, e.g.:
    //
    //   const text = ??
    //
    // Trim it so extra whitespace doesn’t create empty words.

    const text = this.textContent

    // -----------------------------------------
    // CHALLENGE 2 — SPLIT INTO WORDS
    // -----------------------------------------
    //
    // Split the text into an array of words.
    // Something like:
    //
    //   const words = text.split(??)
    //
    // Think about what argument you should pass to split().
    // What characters separate words?

    const words = text.split(' ')


    // -----------------------------------------
    // CHALLENGE 3 — RENDER EACH WORD
    // -----------------------------------------
    //
    // Loop over the array of words. For each word:
    //
    //   1. Create a <span> element.
    //   2. Set its text, use textContent.
    //   3. Give it a unique color using HSL.
    //   4. Append the span to the shadow root.
    //
    // To create a span:
    //   const el = document.createElement('span')
    //
    // To append it:
    //   this._shadowRoot.appendChild(el)
    //
    // You will need a formula to compute the hue.
    //
    // HINT:
    //   const hue = (360 / totalWords) * index
    //
    // But you must decide:
    //   - what “totalWords” is
    //   - what “index” is
    //
    // To set the color:
    //   el.style.color = `hsl(${hue}, 100%, 50%)`
    //
    // IMPORTANT:
    // Add a space between words so they don’t run together.
    // You decide how to insert the space.

    words.forEach((word, i) => {
      const span = document.createElement('span')
      span.innerText = word + ' '
      const hue = 360 / words.length * i
      span.style.color = `hsl(${hue}, 100%, 50%)`
      this._shadowRoot.appendChild(span)

      console.log(word)
    })


    // -----------------------------------------
    // OPTIONAL CHALLENGE 4 — RAINBOW LETTERS
    // -----------------------------------------
    //
    // Instead of coloring each *word*, try coloring each *letter*.
    //
    // Steps:
    //   - Split the string differently
    //   - Preserve spaces (don’t lose them)
    //   - Create one span per character
    //   - Compute hue based on total characters, not total words
    //
    // Keep this optional unless you're feeling confident.


    // -----------------------------------------
    // OPTIONAL CHALLENGE 5 — MODE ATTRIBUTE
    // -----------------------------------------
    //
    // Let users choose the mode:
    //
    //   <rainbow-text mode="letters">Hello World</rainbow-text>
    //
    // Read the attribute:
    //   const mode = this.getAttribute('mode')
    //
    // Then render either:
    //   - rainbow words, or
    //   - rainbow letters
    //
    // depending on what the user chose.
  }
}

// Register the new custom element
customElements.define('rainbow-text', RainbowText);
