// The TodoItem class uses this template. 
// The template contains a style tag and all of the 
// html elements that will be used by the component.

const todoItemTemplate = document.createElement('template');
todoItemTemplate.innerHTML = `
<style>
  /* This is like styling the body for this shadow root */
  :host {
    display: block;
    font-family: sans-serif;
  }

  li {
    display: flex;
    
    /* Pushes the button to the right */
    & :last-child {
      margin-left: auto;
    }
  }

  /*  */
  .completed #text-label {
    text-decoration: line-through;
  }

  /*  */
  button {
    border: none;
    cursor: pointer;
    justify-self: flex-end;
  }
</style>

<li class="item"> 
  <label for="box">
    <input id="box" type="checkbox">
    <span id="text-label"></span>
  </label>
  <button>X</button>
</li>
`;

class TodoItem extends HTMLElement {
  // Create a shadowroot as a provate property. 
  // making this provate may be over thinking this a bit.
  #shadowRoot = this.attachShadow({ 'mode': 'open' });

  // *** Init ***
  constructor() {
    super();
  
    this.#shadowRoot.appendChild(todoItemTemplate.content.cloneNode(true));

    this.item = this.#shadowRoot.querySelector('.item');
    this.removeButton = this.#shadowRoot.querySelector('button');
    this.text = this.#shadowRoot.querySelector('#text-label');
    this.checkbox = this.#shadowRoot.querySelector('input');

    // Bind event handlers
    this.removeTodo = this.removeTodo.bind(this)
    this.toggleTodo = this.toggleTodo.bind(this)
    // Add some listeners
    this.removeButton.addEventListener('click', this.removeTodo);
    this.checkbox.addEventListener('click', this.toggleTodo);
  }

  // *** Lifecycle ***
  connectedCallback() {
    // We set a default attribute here; if our end user hasn't provided one,
    // our element will display a "placeholder" text instead.
    if(!this.hasAttribute('text')) {
      this.setAttribute('text', 'placeholder');
    }

    this.#renderTodoItem();
  }

  disconnectedCallback() {
    this.removeButton.removeEventListener('click', this.removeTodo);
    this.checkbox.removeEventListener('click', this.toggleTodo);
    console.log('removing listeners')
  }

  // *** Events ***
  removeTodo(e) {
    // This component can issue its own custom events
    this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index }))
  }

  toggleTodo(e) {
    // This component can issue its own custom events
    this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index }));
  }

  // *** Render *** 
  #renderTodoItem() {
    if (this.hasAttribute('checked')) {
      this.item.classList.add('completed');
      this.checkbox.setAttribute('checked', '');
    } else {
      this.item.classList.remove('completed');
      this.checkbox.removeAttribute('checked');
    }

    this.text.innerHTML = this._text
  }


  // *** Attributes ***
  static get observedAttributes() {
    return ['text', 'checked', 'index']
  }

  get checked() {
    return this.hasAttribute('checked')
  }

  set checked(val) {
    if (val) {
      this.setAttribute('checked', '')
    } else {
      this.removeAttribute('checked')
    }
  }

  get index() {
    return this._index
  }

  set index(val) {
    this.setAttribute('index', val)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'text': 
        this._text = newValue
        break
      case 'checked': 
        this._checked = this.hasAttribute('checked')
        break
      case 'index':
        this._index = parseInt(newValue)
        break
    }
  }
}

window.customElements.define('to-do-item', TodoItem)