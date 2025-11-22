import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import Navigo from 'https://unpkg.com/navigo@7.1.2/lib/navigo.es.js'

class Page extends LitElement {

  render() {
    return html`<h1>
    Page #
    <a href="#!/pagea">Page A</a> <a href="#!/pageb">Page B</a>
    <a href="#!/">Home</a>
    <slot name="content"></slot>
    </h1>`
  }
}

customElements.define('lit-page', Page)

class App extends LitElement {
  static properties = {
    route: { type: Object }
  }

  constructor() {
    super() 
    this.route = html`<h1>
    Hello World
      <a href="#!/pagea">Page A</a> <a href="#!/pageb">Page B</a>
      <a href="#!/">Home</a>
    </h1>`
    this.router = new Navigo("/", true, "#!")
    this.router.on("pagea", () => this.route = html`<lit-page>Page A</lit-page>`)
    this.router.on("pageb", () => this.route = html`<lit-page>Page B</lit-pagee>`)
    this.router.on("*", () => this.route = html`<h1>Home</h1>`)
  }

  render() {
    return html`
      <div> 
      - App - 
        ${this.route}
      </div>`
  }
}

customElements.define('lit-app', App)