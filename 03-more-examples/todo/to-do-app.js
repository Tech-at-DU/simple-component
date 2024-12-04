// This example uses Templates 
// Templates here refer to the core web technology. 
// Read about Templates here: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template

// In short a template is an HTML fragment that you can 
// use via JS. 

// Templates can be defined in the DOM or generated 
// with a string.

// When used with web components you'll likely be 
// writing your templates in template strings, with
// the ` and `. This is a little awkward as there isn't 
// any color coding by default. There may be an 
// extension that handles this?

// The todoAppTemplate below creates a template, and 
// then populates it with a block of HTML. The HTML
// includes: 

// <style>
// <h1>
// <input>
// <button>
// <ul>

// These tags should have all of the class, id and 
// other attributes that are needed for the component 
// to function. 

// Important here is the style tag. Notice that this 
// contains all of the styles used to style this 
// component and its child elements. 

// NOTE! The styles here use the :host selector. 
// This selector selects the shadow root host, which 
// will be the parent element for this template when 
// it is instantiated. 

// NOTE! These styles do not escape the shadows! They 
// will affect elements outside of the shadow root!

// NOTE! While this looks like a global variable, it 
// is contained in a module and so doesn't polute 
// the global space. 

const todoAppTemplate = document.createElement('template');
todoAppTemplate.innerHTML = `
<style>
  :host {
    display: block;
    font-family: sans-serif;
    text-align: center;
    
    & button {
      border-radius: 1rem;
      color: red;
    }
  }

  button {
    border: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
    padding: 0;
  }
</style>

<h1>To do</h1>

<input type="text" placeholder="Add a new to do"></input>

<button>Add</button>

<ul id="todos"></ul>
`;


// This class will create a copy of todoAppTemplate. 

class TodoApp extends HTMLElement {
  // Using the # private operator we can define this here
  #shadowRoot = this.attachShadow({ 'mode': 'open' })
  #todos = []

  constructor() {
    super()
    // Or here...
    // this.#shadowRoot = this.attachShadow({ 'mode': 'open' })

    // Here I cloned the todoAppTemplate
    this.#shadowRoot.appendChild(todoAppTemplate.content.cloneNode(true))
    // Cloning this node copies the entire contents into the destination node.
    // TODO: Find this in the inspector. 

    // We need some references to elements contained in our shadow root
    this.todoList = this.#shadowRoot.querySelector('ul')
    this.input = this.#shadowRoot.querySelector('input')
    this.submitButton = this.#shadowRoot.querySelector('button')

    // Time to add an event listener. Might be better to use 
    // event delegation here! 
    // Must "bind" addTodo to "this" here.
    this.addTodo = this.addTodo.bind(this)
    this.submitButton.addEventListener('click', this.addTodo)
  }

  // If this element is removed from the DOM we should remove that listener!
  disconnectedCallback() {
    this.submitButton.removeEventListener('click', this.addTodo)
  }

  //Add a todo item
  addTodo() {
    if (this.input.value.length > 0) {
      this.#todos.push({ 
        text: this.input.value,
        checked: false
      }) 
      this.#renderTodoList()
      this.input.value = ''
    }
  }


  removeTodo(e) {
    this.#todos.splice(e.detail, 1)
    this.#renderTodoList()
  }

  toggleTodo(e) {
    console.log(e)
    const todo = this.#todos[e.detail]
    this.#todos[e.detail] = Object.assign({}, todo, {
      checked: !todo.checked
    })
    this.#renderTodoList()
  }

  #renderTodoList() {
    this.todoList.innerHTML = ''

    this.#todos.forEach((todo, index) => {
      const todoItem = document.createElement('to-do-item')
      todoItem.setAttribute('text', todo.text)
      
      if (todo.checked) {
        todoItem.setAttribute('checked', '')
      }

      todoItem.setAttribute('index', index)
      todoItem.addEventListener('onRemove', (e) => {
        this.removeTodo(e)
      })

      todoItem.addEventListener('onToggle', (e) => {
        this.toggleTodo(e)
      })

      this.todoList.appendChild(todoItem)
    });
  }

  set todos(value) {
    this.#todos = value
    this.#renderTodoList()
  }

  get todos() {
    return this.#todos
  }
}

window.customElements.define('to-do-app', TodoApp)