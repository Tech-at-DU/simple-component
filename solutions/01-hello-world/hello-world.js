// Hello World Web Component
// Defines a custom <hello-world> element that renders “Hello World”.

class HelloWorld extends HTMLElement {
  constructor() {
    super(); // always call super() in a custom element constructor
  }

  // Use connectedCallback to initialize your component
  connectedCallback() {
    // runs when the element is added to the document
    // Attach a shadow root so the component manages its own internal DOM.
    const shadow = this.attachShadow({ mode: 'open' });

    // Create the element that will hold the text.
    const el = document.createElement('h1');
    el.textContent = 'Hello World';

    // Basic styling for the text via <style> in the shadow DOM.
    const style = document.createElement('style');
    style.textContent = `
      h1 {
        color: red;
        font-size: 3rem;
        letter-spacing: 1rem;
      }
    `;

    // Add styles and content to the shadow root.
    shadow.append(style, el);
  }
}

customElements.define('hello-world', HelloWorld);

/*  
Challenges:

1. Change the internal element from a <span> to a <h1>. 
   - Update both the element creation and the <style> rules.

2. Change the text to something else and adjust the styles
   (font-size, color, letter-spacing) so the element looks 
   clearly different.

3. Bonus: Add a second <hello-world> element on the page.
   - Does each instance render its own shadow DOM?
   - Try inspecting them in DevTools.

When you're finished be sure to inspect the element and 
open the Shadow Content. 
*/
