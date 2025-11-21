// Tutorial #3 — Ransom Note Web Component
// ---------------------------------------
//
// This component will take the text inside <ransom-note>
// and render it so each character looks like a mismatched,
// randomly styled ransom-note letter.
//
// Example:
//
//   <ransom-note>This looks suspicious</ransom-note>
//
// Should render each character with different:
// - font sizes
// - rotations
// - colors
// - font-families
// - font-weights
//
// Your job: follow the instructions inside the comments below
// to build this component.

class RansomNote extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root for isolated rendering.
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // -----------------------------------------
    // CHALLENGE 1 — READ THE INPUT TEXT
    // -----------------------------------------
    //
    // Get the original text content inside the <ransom-note> tag.
    // Use a property that returns plain text, not HTML.
    //
    // Example idea:
    //   const text = ???
    //
    // Trim whitespace so it doesn't create blank characters.


    // -----------------------------------------
    // CHALLENGE 2 — SPLIT INTO CHARACTERS
    // -----------------------------------------
    //
    // You need to style EACH CHARACTER individually.
    // Create an array of individual characters.
    //
    //   const chars = text.split(??)
    //
    // Think: which value to provide to split()?


    // -----------------------------------------
    // CHALLENGE 3 — LOOP & CREATE SPANS
    // -----------------------------------------
    //
    // For EACH character:
    //
    //   1. Create a <span> element.
    //        const el = document.createElement('span')
    //
    //   2. Place the character inside the span.
    //        el.textContent = singleCharacter
    //
    //   3. Apply SEVERAL random styles.
    //
    //       Examples (you decide the ranges!):
    //
    //       - font-size:
    //         el.style.fontSize = `${Math.random() * ? + ?}px`
    //
    //       - rotation:
    //         el.style.transform = `rotate(${Math.random() * ? - ?}deg)`
    //
    //       - color:
    //         el.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`
    //
    //       - font-family:
    //         const fonts = ['Helvetica', 'Times', 'Courier', 'Georgia'];
    //         el.style.fontFamily = fonts[ randomIndex ]
    //
    //       - font-weight:
    //         choose random values you like:
    //         100, 300, 500, 700, 900
    //
    //   4. Append the span to the shadow root.
    //        this._shadowRoot.appendChild(el)
    //
    // IMPORTANT:
    //   Preserve spaces! If the character is a space,
    //   you may need to add an actual " " or &nbsp; to make sure
    //   the layout doesn’t collapse.


    // -----------------------------------------
    // CHALLENGE 4 — MAKE IT LOOK MORE CHAOTIC
    // -----------------------------------------
    //
    // Add randomness to:
    //   - letter spacing
    //   - vertical alignment
    //   - rotation direction bias
    //   - color palette variety
    //
    // The goal is *messy but readable*.


    // -----------------------------------------
    // OPTIONAL CHALLENGE 5 — USER-CONTROLLED CHAOS
    // -----------------------------------------
    //
    // Add an attribute so users can control the intensity.
    //
    // Example:
    //   <ransom-note chaos="high">...</ransom-note>
    //
    // Implement chaos levels:
    //   - "low": small rotations, subtle color changes
    //   - "medium": normal random range
    //   - "high": wild rotations, large font differences
    //
    // HINT:
    //   const level = this.getAttribute('chaos') || 'medium'
    //
    // Then use "level" to scale your random ranges.
  }
}

customElements.define('ransom-note', RansomNote);
