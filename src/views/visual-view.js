import { html } from 'lit-element';
import { BaseView } from './base-view.js';
import { visualViewCss } from './visual-view-css';
import '@vaadin/vaadin-select/theme/material/vaadin-select';
import '@vaadin/vaadin-list-box/theme/material/vaadin-list-box';

class VisualView extends BaseView {
  static get properties() {
    return {
      leftItem: { type: String },
      rightItem: { type: String },
      viewData: { type: String },
      collectionData: { type: Object }
    };
  }

  constructor() {
    super();
    this.leftItem = '';
    this.rightItem = '';
    this.viewData = '';
    this.collectionData = { ps: "Pali Suttas",
                pv: "Pali Vinaya",
                pa: "Pali Abhidhamma",
                ss: "Sanskrit Suttas",
                sv: "Sanskrit Vinaya",
                sa: "Sanskrit Abhidhamma",
                tk: "Tibetan Kangyur",
                tt: "Tibetan Tengyur"};
  }

  render() {
    return html`
      ${visualViewCss}

      <p class="expanation-text">This page is still under construction and at the moment only works for Tibetan Kangyur and Tengyur texts</p>

      <vaadin-select 
        class="visual-view-dropdown"
        placeholder="Select a collection" 
        value="${this.leftItem}" 
        @value-changed="${this.updateLeftView}"
        style="float:left">
        <template>
          <vaadin-list-box>
            ${this.insertCollectionData()}
          </vaadin-list-box>
        </template>
      </vaadin-select>

      <vaadin-select 
        class="visual-view-dropdown"
        placeholder="Select a collection" 
        value="${this.rightItem}" 
        @value-changed="${this.updateRightView}"
        style="float:right">
        <template>
          <vaadin-list-box>
            ${this.insertCollectionData()}
          </vaadin-list-box>
        </template>
      </vaadin-select>

    ${this.viewData}
    `;
  }

  updateLeftView(e) {
    this.leftItem = e.target.value;
    this.updateView();
  }

  updateRightView(e) {
    this.rightItem = e.target.value;
    this.updateView();
  }

  updateView() {
    let leftItemSelect = Object.keys(this.collectionData).find(key => this.collectionData[key] === this.leftItem);
    let rightItemSelect = Object.keys(this.collectionData).find(key => this.collectionData[key] === this.rightItem);
    if (leftItemSelect == 'tk' && rightItemSelect == 'tt') {
      this.viewData = html`<iframe src="http://buddhist-db.de/buddhnet/show.html"></iframe>`;
    }
  }

  insertCollectionData() {
    let collectionsInput = '';
    Object.values(this.collectionData).forEach(value => {
      collectionsInput = html`${collectionsInput}
        <vaadin-item>${value}</vaadin-item>`
      });
    return collectionsInput;
  }
}

customElements.define('visual-view', VisualView);
