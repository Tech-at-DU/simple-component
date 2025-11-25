# Simple Web Component Examples

This repo contains examples that introduce web components. 

Your goal is to look at the examples and solve the challenge problems included there in the comments. 

You should complete at least the first two examples in section. 

- 01-simple-component
- 02-simple-component-templates
- 03-simple-component-slots

Each of the examples in these folders focus different web technologies that make up web components. 

- Custom Elements - Using `customElements.define()` you create define your own, new HTML elements, and back them up with in-built functionality. 
- Shadow Root - Using `this.attachShadow()` you can add a shadow DOM node to a custom element. 
- HTML Template - Allows you to create template elements, `<template>`, that can be defined and copied. This is vanilla HTML, and can be used without creating a custom element. 
- HTML Slot - The `<slot>` element works with a template. Slots define placeholders for external content to be added to a template. 

Web Components have a wide range of uses. The secret is that web components can be mixed easily with other web technologies because they are native to the web. 

Take note! The examples show two different "modes" where web components can hold their sub elements hidden in a shadow DOM, or expose their sub elements to CSS from outside. 

Shadow elements can be affected using CSS selectors: 

- `:host`, `:host()`
- `::slotted()`
- `::part()`


