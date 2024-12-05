
class BlinkText extends HTMLElement {

  constructor() {
    super(); // Must call super!
    
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // Make a new p element
    this._blinkEl = document.createElement('span')
    this._shadowRoot.appendChild(this._blinkEl)

    // Get the text in the original tag and put it in the P element
    this._blinkEl.innerHTML = this.innerHTML
    console.log(this.innerHTML)

    this._opacity = 1
  }



  // Lifecycle method called when this component is appended to the DOM
  connectedCallback() {
    this._blinkEl.style.transition = '400ms'
    this._timer = setInterval(() => {
      this._opacity = this._opacity === 1 ? 0 : 1
      this._blinkEl.style.opacity = this._opacity
    }, 1000)
  }

  // Lifecycle method called when the component is removed from the DOM
  disconnectedCallback() {
    clearInterval(this._timer)
  }
}

customElements.define('fw-blink', BlinkText);
