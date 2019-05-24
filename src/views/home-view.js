import { html } from 'lit-element';
import { BaseView } from './base-view.js';

class HomeView extends BaseView {
  render() {
    return html`
      <h1>Homepage</h1>
      <p>
        Some text regarding this website here.
      </p>
    `;
  }
}

customElements.define('home-view', HomeView);