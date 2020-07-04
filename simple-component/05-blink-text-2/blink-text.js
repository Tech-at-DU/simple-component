
class BlinkText extends HTMLElement {
  constructor() {
    super();
    
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // Make a new p element
    this._blinkEl = document.createElement('span')
    this._shadowRoot.appendChild(this._blinkEl)

    // Get the text in the original tag and put it in the P element
    this._blinkEl.innerHTML = this.innerHTML

    // Use this to manage the opacity
    this._opacity = 1
    
  }


  // Tell this component it should look for changes to time
  static get observedAttributes() {
    return ['time'];
  }  


  // Handle changes to time
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'time') {
      this._time = parseInt(newValue)
      this._clearTimer()
      this._addTimer()
    }
  }


  connectedCallback() {
    // 
  }


  disconnectedCallback() {
    this._clearTimer()
  }


  _addTimer() {
    this._blinkEl.style.transition = this._time + 'ms'
    this._timer = setInterval(() => {
      this._opacity = this._opacity === 1 ? 0 : 1
      this._blinkEl.style.opacity = this._opacity
    }, this._time);
  }


  _clearTimer() {
    console.log('clear', this._time)
    clearInterval(this._timer)
  }
}

customElements.define('blink-text', BlinkText);


/*

The new tags you define have attributes like the regular tags. 
Attributes set options used to configure the functionality of 
the element. 

Here the time of the blink is set with the time attribute. 
Take a look at the tags in the html:

<blink-text time="2000">Hello World</blink-text>
<blink-text time="1000">Foo Par</blink-text>

The change the tiems and test. The times are set in millisecond, 
so 1000 = 1 sec. 

- Challenge - 1 - 

 Opacity changes from 1 to 0 currently. Add two new attributes 
 one for the min opacity and the other for max. Follow these steps: 

 - Set the attributes on the tags <blink-text time="1000" min="0.5" max="1.0">
 - use a couple properties to keep track of opacity.
  - this._opacity - tracks whether the element is fading in or out
  - this._min - the minimum value of opacity 0.0 to 1.0
  - this._max - ths maximum value of opacity 0.0 to 1.0
  - Assign each of these a default value in the constructor
 - Use the attributeChangedCallback() to set the attribute value on your properties
 - Use the values you stored in properties in the _addTimer() method to set the opacity.
  - Each time the interval callbacks is called:
    - toggle the this._opacity from 0 to 1
    - Then set the opacity of the element to: 
      - min if opacity is 0
      - max if opacity is 1
 
- Challenge - 2 - 



*/