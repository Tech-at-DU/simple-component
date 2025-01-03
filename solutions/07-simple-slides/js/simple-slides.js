
// Creates a simple slideshow

class SimpleSlides extends HTMLElement {
  constructor() {
    super()

    // Get the size of the element
    this._width = this.getAttribute('width')
    this._height = this.getAttribute('height')
    this._time = this.getAttribute('time')
    this._transition = this.getAttribute('transition')

    // Create a shadow root node
    this._shadowRoot = this.attachShadow({ mode: 'open' })

    // Create a couple elements to manage slides
    this._container = document.createElement('div')


    // Add some styles
    this._container.style.width = this._width + 'px'
    this._container.style.height = this._height + 'px'
    this._container.style.border = '1px solid'
    this._container.style.overflow = 'hidden'

    this._inner = document.createElement('div')
    this._inner.style.display = 'flex'
    this._inner.style.transition = '400ms'

    this._container.appendChild(this._inner)

    // Append this node
    this._shadowRoot.appendChild(this._container)

    // Get array of images
    this._imgs = Array.from(this.querySelectorAll('img'))
    // Append each img to the container
    for (let i = 0; i < this._imgs.length; i += 1) {
      this._inner.appendChild(this._imgs[i])
    }
    
    // Keep track of the index of the current image displayed
    this._index = -1
    this._paused = false
  }

  _addTimer() {
    this._removeTimer()
    this._timer = setInterval(() => {
      this._nextImg()
    }, this._time)
  }

  _removeTimer() {
    clearInterval(this._timer)
  }

  // lifecycle method 
  connectedCallback() {
    this._addTimer()
    this._nextImg()
  }
  // lifecycle method
  disconnectedCallback() {
    this._removeTimer()
  }

  // These are the attributes this component OBSERVING
  static get observedAttributes() {
    return ['time', 'paused', 'transition']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'time':
        this._time = newValue
        // this._removeTimer()
        this._addTimer()
        break
    
      case 'transition':
        this._transition = newValue
        this._inner.style.transition = `${this._transition}ms`
        break 

      case 'paused': 
        this._paused = newValue
        break

    }
  }

  // get _time2() {
  //   return this._time
  // }

  // set _time2(newTime) {
  //   this._time = newTime
  //   this._addTimer()
  // }

  _nextImg() {
    this._index = (this._index + 1) % this._imgs.length
    const x = this._index * -this._width
    this._inner.style.transform = `translate(${x}px, 0)`
  }
}

customElements.define('simple-slides', SimpleSlides)
