// Logo template -----------------------------------------------------
const logoTemplate = document.createElement('template');

logoTemplate.innerHTML = `
  <style>
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

// Component ---------------------------------------------------------
class CompanyLogo extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root (optional for this demo)
    this.attachShadow({ mode: 'open' });

    // Clone template + append
    this.shadowRoot.appendChild(
      logoTemplate.content.cloneNode(true)
    );
  }
}

// Register element --------------------------------------------------
customElements.define('company-logo', CompanyLogo);
