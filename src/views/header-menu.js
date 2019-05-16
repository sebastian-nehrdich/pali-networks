import { LitElement, html } from 'lit-element';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-app-layout';
import { headerMenuCss } from './header-menu-css';
import './table-view';

class HeaderMenu extends LitElement {
  static get properties() {
    return {
    };
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      ${headerMenuCss}
      <div class="menu-layout"> 
          <vaadin-app-layout>
            <h3 slot="branding">Buddhist-db</h3>
            <vaadin-tabs slot="menu" selected="{{page}}">
              <vaadin-tab>Home</vaadin-tab>
              <vaadin-tab>Pali</vaadin-tab>
              <vaadin-tab>Sanskrit</vaadin-tab>
            </vaadin-tabs>

            <div class="content">
                <iron-pages selected="[[page]]">
                  <page><h3 id="home">Home</h3>.... text ...</page>
                  <page><h3 id="pali">Pali</h3><table-view/></page>
                  <page><h3 id="sanskrit">Sanskrit</h3><table-view/></page>
                </iron-pages>
            </div>
          </vaadin-app-layout>
      </div>
    `;
  }


}

customElements.define('header-menu', HeaderMenu);


