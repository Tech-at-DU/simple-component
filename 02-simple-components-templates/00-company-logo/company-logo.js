// ====================================================================
// COMPANY LOGO COMPONENT
// This example introduces:
//   - <template>
//   - cloneNode()
//   - shadow DOM
//   - basic component structure
//
// Challenges are included at the bottom as comments.
// ====================================================================


// --------------------------------------------------------------------
// TEMPLATE: Defines the HTML + CSS structure for the component.
// <template> content is inert until cloned and inserted into the DOM.
// --------------------------------------------------------------------
const logoTemplate = document.createElement('template');

logoTemplate.innerHTML = `
  <style>
    /* Component styles live inside the template so each instance
       receives the same structure and visuals. */

    .logo {
      position: relative;
      gap: 0.5rem;
      font-family: system-ui, sans-serif;
      font-weight: 600;
      color: #222;
      border: 1px solid;
      width: 50px;
      height: 50px;
      margin: 1rem;
      border-radius: 6px;
    }

    /* Three rotated “mark” shapes for the logo design */
    .mark {
      position: absolute;
      transform-origin: 80% 80%;
      width: 24px;
      height: 24px;
      left: 6px;
      bottom: 30%;
      border-radius: 0 50% 50% 50%;
      background: linear-gradient(135deg, #f74e4e74, #d237b368);
    }

    .mark:nth-child(2) {
      rotate: 45deg;
      background: linear-gradient(135deg, hsla(121, 91%, 64%, 0.46), #37d2c068);
    }

    .mark:nth-child(3) {
      rotate: 90deg;
      background: linear-gradient(135deg, hsla(52, 91%, 64%, 0.46), #d2b13768);
    }

    /* Company name */
    span {
      position: absolute;
      bottom: 0;
      left: 50%;
      translate: -50%;
      font-size: 12px;
    }
  </style>

  <div class="logo">
    <div class="mark"></div>
    <div class="mark"></div>
    <div class="mark"></div>
    <span>MyCo</span>
  </div>
`;


// --------------------------------------------------------------------
// COMPONENT CLASS
// --------------------------------------------------------------------
class CompanyLogo extends HTMLElement {
  constructor() {
    super();

    // Create a shadow DOM root. Content inside is isolated from the page.
    this.attachShadow({ mode: 'open' });

    // Clone the template (deep clone) and append it to the shadow root.
    // cloneNode(true) copies the entire <template> subtree.
    const fragment = logoTemplate.content.cloneNode(true);
    this.shadowRoot.appendChild(fragment);

    // Future enhancements (Challenges below) will modify this section.
  }

  /*
  ================================================================
  CHALLENGE 1 — Add a "brand" attribute
  ================================================================
  Goal:
    Allow the user to write:
      <company-logo brand="WebDevCo"></company-logo>

  Steps:
    1. Add "brand" to observedAttributes.
    2. Inside attributeChangedCallback(), update the <span> text.
    3. Assign a default brand name when none is provided.

  Hint:
    Use querySelector inside the shadow root to access the <span>.
  */


  /*
  ================================================================
  CHALLENGE 2 — Add size options
  ================================================================
  Goal:
    Support:
      <company-logo size="small">
      <company-logo size="large">

  Requirements:
    - Use CSS custom properties *inside the template* for:
        --logo-size
        --font-size
    - Switch values based on the "size" attribute.
    - Avoid inline styles. Modify CSS variables instead.

  Example idea:
    this.style.setProperty('--logo-size', '80px')
  */


  /*
  ================================================================
  CHALLENGE 3 — Add a slotted brand name (Advanced)
  ================================================================
  Goal:
    Allow:
      <company-logo>My Custom Corp</company-logo>

  Steps:
    1. Replace the <span> with <slot></slot>.
    2. Keep default text ("MyCo") if the user provides nothing.
    3. You will need:
         - a <slot> element
         - slotchange event

  Stretch:
    - Support a named slot for an icon or symbol.
  */
}


// Register the custom element
customElements.define('company-logo', CompanyLogo);
