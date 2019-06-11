import { html } from 'lit-element';
import { BaseView } from './base-view.js';
import { visualViewCss } from './visual-view-css';

class VisualView extends BaseView {
  render() {
    return html`
      ${visualViewCss}
	  <iframe src="http://buddhist-db.de/buddhnet/show.html"></iframe>
    `;
  }
}

customElements.define('visual-view', VisualView);