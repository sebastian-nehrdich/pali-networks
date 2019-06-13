import { html } from 'lit-element';
import { BaseView } from './base-view.js';


class TestFunction extends BaseView {
  static get properties() {
    return {
      ttask: { type: String },
    };
  }

  constructor() {
    super();
    this.ttask = '';
  }


  testFunction () {
    console.log("Im here");
    return "some random text";
  }
}

customElements.define('test-function', TestFunction);


