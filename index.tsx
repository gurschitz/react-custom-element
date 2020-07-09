import React from "react";
import ReactDOM from "react-dom";

class MyCustomComponent extends HTMLElement {
  static get observedAttributes() {
    return ["test"];
  }

  private mountPoint = document.createElement("span");

  connectedCallback() {
    this.attachShadow({ mode: "open" }).appendChild(this.mountPoint);
    this.render();
  }

  render() {
    const props = Object.fromEntries(
      MyCustomComponent.observedAttributes.map((a) => [a, this.getAttribute(a)])
    );
    ReactDOM.render(<div>{JSON.stringify(props)}</div>, this.mountPoint);
  }

  attributeChangedCallback() {
    console.log(this.attributes);
    this.render();
  }
}

window.customElements.define("my-custom-component", MyCustomComponent);
