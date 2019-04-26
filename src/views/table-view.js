import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-text-field/theme/material/vaadin-text-field';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-group';
import '@vaadin/vaadin-select/theme/material/vaadin-select';
import '@vaadin/vaadin-list-box/theme/material/vaadin-list-box';
import '@vaadin/vaadin-accordion/theme/material/vaadin-accordion';

const VisibilityFilters = {
  SHOW_SEGMENT: 'Segment',
  SHOW_NUMBERS: 'Numbers'
};

class TableView extends LitElement {
  static get properties() {
    return {
      task: { type: String },
      sanskritTask: { type: String },
      probability: { type: Number },
      maxResults: { type: Number },
      suttaData: { type: String },
      filter: { type: String },
      maxResultsHidden: { type: String },
      panelOpened: { type: String }
    };
  }

  constructor() {
    super();
    this.task = '';
    this.sanskritTask = '';
    this.probability = 0.065;
    this.maxResults = 10;
    this.suttaData = '';
    this.filter = VisibilityFilters.SHOW_SEGMENT;
    this.maxResultsHidden = '';
    this.panelOpened = '10';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {

    return html` 

      <style>
        vaadin-radio-button, vaadin-text-field, vaadin-select {
          --material-primary-color: rgba(206, 132, 0, 1);
          --material-primary-text-color: rgba(206, 132, 0, 1);
        }

        vaadin-text-field {
          width: 150px;
        }

        vaadin-accordion {
          display: table;
        }

        .start-segment {
          padding-right: 10px;
          width: 30%;
        }

        .start-segment.nr {
          width: 10%;
        }

        .segment-header {
          font-weight: bold;
        }

        td {
          vertical-align: top;
          padding: 10px;
          border: 3px solid white;
          font-family: sans-serif;
          border-radius: 10px;
          background-color: rgb(244, 243, 242);
        }

        td.parallel-item {          
          border: 2px solid white;
        }

        .max-results-hidden {
          display: none;
        }

      </style>

      <div class="input-layout"
  		  @keyup="${this.shortcutListener}"> 

        <vaadin-accordion opened="${this.panelOpened}">

          <vaadin-accordion-panel class="main-panel" theme="material">
            <div slot="summary">Pali texts</div>
            <div>

              <vaadin-accordion-panel theme="material">
                <div slot="summary">Majjhima Nikaya</div>
                <div>
                  <vaadin-select 
                    placeholder="Select a sutta" 
                    value="${this.task}" 
                    @value-changed="${this.updateTask}">
                    <template>
                      <vaadin-list-box>
                        ${this.insertSuttaNumbers()}
                      </vaadin-list-box>
                    </template>
                  </vaadin-select>
                </div>
              </vaadin-accordion-panel>
              <vaadin-accordion-panel theme="material">
                <div slot="summary">Digha Nikaya</div>
                <div>Not yet available</div>
              </vaadin-accordion-panel>

            </div>
          </vaadin-accordion-panel>

          <vaadin-accordion-panel class="main-panel" theme="material">
            <div slot="summary">Sanskrit texts</div>
            <div>
                  <vaadin-select 
                    placeholder="Select a sutta" 
                    value="${this.sanskritTask}"
                    @value-changed="${this.updateSanskritTask}">
                    <template>
                      <vaadin-list-box>
                        ${this.insertSanskrit()}
                      </vaadin-list-box>
                    </template>
                  </vaadin-select>
            </div>
          </vaadin-accordion-panel>

        </vaadin-accordion>

        <vaadin-radio-group
          label="Choose view:"
          class="visibility-filters"
          value="${this.filter}"
          @value-changed="${this.filterChanged}"> 

          ${Object.values(VisibilityFilters).map( 
            filter => html`
              <vaadin-radio-button value="${filter}">
                ${filter}
              </vaadin-radio-button>`
          )}
        </vaadin-radio-group>

        <vaadin-text-field
          label="Probability cutoff:"
          placeholder="Probability cutoff (default = 0.065)"
          value="${this.probability}" 
          @change="${this.updateProbability}"> 
        </vaadin-text-field>

        <vaadin-text-field
          label="Max number of results:"
          class="${this.maxResultsHidden}"
          placeholder="Default value: 5"
          value="${this.maxResults}" 
          @change="${this.updateMaxResults}"> 
        </vaadin-text-field>
  		</div>

      <table>
        ${this.suttaData}

      </table>
    `;
  }

  updateTask(e) {
    this.task = e.target.value;
    this.applyFilter();
  }

  updateSanskritTask(e) {
    this.sanskritTask = e.target.value;
    // this.applyFilter();
  }

  updateProbability(e) {
    this.probability = parseFloat(e.target.value);
  }

  updateMaxResults(e) {
    this.maxResults = parseInt(e.target.value);
  }

  shortcutListener(e) {
    if (e.key === 'Enter') {
      this.applyFilter();
    }
  }

  insertSuttaNumbers() {
    let suttaNumberList = '';
    for (let i = 1; i <= 152; i++) {
      suttaNumberList = html`${suttaNumberList}
            <vaadin-item>mn${i}</vaadin-item>`
    }
    return suttaNumberList
  }

  insertSanskrit() {
    let sanskritSuttaList = 'Not yet available';
    // for (let i = 1; i <= 152; i++) {
    //   sanskritSuttaList = html`${sanskritSuttaList}
    //         <vaadin-item>mn${i}</vaadin-item>`
    // }
    return sanskritSuttaList
  }

  filterChanged(e) {
    this.filter = e.target.value;
    (this.filter == VisibilityFilters.SHOW_NUMBERS) ? this.hideMaxNumbers() : this.showMaxNumbers();
    this.task ? this.applyFilter() : '';
  }

  applyFilter() {
    if (!this.task) {
      return;
    }
    let url = `suttas/${this.task}.json`;
    if (this.filter == VisibilityFilters.SHOW_NUMBERS) {
        fetch(url).then(r => r.json()).then(data => {
          this.buildSegTable(data);
        });
    } else {
        fetch(url).then(r => r.json()).then(data => {
          this.buildTable(data);
        });
    }
  }

  hideMaxNumbers() {
    this.maxResultsHidden = 'max-results-hidden';
  }

  showMaxNumbers() {
    this.maxResultsHidden = '';
  }

  buildTable(data) {
    let suttaItem = '';
    suttaItem = html`${suttaItem}
      <tr class="info-row"><td colspan="2"><b>Parallel segments for each segment in ${this.task.toUpperCase()}.</b><br>
        The lower the probability number, the better the match. You can change the cutoff for the probability in the box above. Default = 0.065<br>
        Click on the segment numbers to go to the relevant section in SuttaCentral.<br>
        When there is a range of parallel segment numbers, only the first one is shown.
      </td></tr>
      <tr class="header-row">
          <td class="start-segment segment-header">
            Segment Number in ${this.task}
          </td>
          <td class="segment-header">
            Parallel segments and probabilities.
          </td>
      </tr>
    `;
    for (let i = 0; i < data.length; i++) {
      let parallelsItems = '';
      let rowSpan = 1;
      let showCounter = 0;

      for (let p = 0; p < data[i].parallels.length; p++) {
        if (data[i].parallels[p].probability <= this.probability) {
          rowSpan += 1;
        }
        (rowSpan > this.maxResults) ? rowSpan = this.maxResults+1 : rowSpan = rowSpan;
      }

      for (let p = 0; p < data[i].parallels.length; p++) {
        let parSegmentRef = data[i].parallels[p].parsegnr;
        let parSutta = (parSegmentRef ? parSegmentRef.split(':') : []);

        if (data[i].parallels[p].probability <= this.probability && showCounter < this.maxResults) {      
          parallelsItems = html`${parallelsItems}
              <tr>
                <td class="parallel-item">
                  <a href="https://suttacentral.net/${parSutta[0]}/pli/ms#${parSutta[1]}" target="_blank">${parSegmentRef}</a><br>
                  Probability: ${data[i].parallels[p].probability}<br>
                  ${data[i].parallels[p].parsegment}
                </td>
              </tr>
          `
          showCounter += 1;
        }
      }

      suttaItem = html`${suttaItem}
        <tr>
          <tr>
            <td class="start-segment" rowspan="${rowSpan}">
              <a href="https://suttacentral.net/${this.task}/pli/ms#${data[i].segmentnr}" target="_blank">${data[i].segmentnr}</a><br>${data[i].segment}
            </td>
          </tr>
          ${parallelsItems}
        </tr>
      `
    }
    this.suttaData = suttaItem;
  }

  buildSegTable(data) {
    let suttaItem = '';
    let collectionkeys = ["dn","mn","sn","an","dhp","ud","iti","snp","vv","pv","thag","thig","ja","mnd","cnd","ne","pe","mil","other"];
    suttaItem = html`${suttaItem}
      <tr><td colspan="20"><b>Parallel segment numbers sorted by collection for ${this.task.toUpperCase()}.</b><br>
        Click on the segment numbers to go to the relevant section in SuttaCentral.<br>
        When there is a range of parallel segment numbers, only the first one is shown.
      </td></tr>
      <tr>
          <td class="start-segment-nr segment-header">
            Segment Number in ${this.task}
          </td>
          ${this.addHeader(collectionkeys)}
      </tr>
    `;

    for (let i = 0; i < data.length; i++) {
      let collections = {dn:[],mn:[],sn:[],an:[],dhp:[],ud:[],iti:[],snp:[],vv:[],pv:[],thag:[],thig:[],ja:[],mnd:[],cnd:[],ne:[],pe:[],mil:[],other:[]};

      for (let p = 0; p < data[i].parallels.length; p++) {
        let parSegmentRef = data[i].parallels[p].parsegnr;
        let parSutta = (parSegmentRef ? parSegmentRef.split(':') : []);
        let parCollection = parSutta[0].match(/[a-z\-]*/g)[0];

        if (data[i].parallels[p].probability <= this.probability) {
            if (collections[`${parCollection}`]) {
              collections[`${parCollection}`].push(parSutta);
            } else {
              collections["other"].push(parSutta);
            }
        }
      }

      suttaItem = html`${suttaItem}
        <tr>
            <td>
              <a href="https://suttacentral.net/${this.task}/pli/ms#${data[i].segmentnr}" target="_blank">${data[i].segmentnr}</a>
            </td>
            ${this.addParallelItems(collections)}
        </tr>
      `
    }
    this.suttaData = suttaItem;
  }

  addParallelItems(collections) {
    if (!collections) {
      return;
    }
    const keys = Object.keys(collections);
    let parallelsItemsTable = '';

    for (const key of keys) {
      parallelsItemsTable = html`${parallelsItemsTable}
        <td>
          ${this.addParallels(collections[key])}
        </td>`;
    }
    return parallelsItemsTable;
  }

  addParallels(inputArray) {
    let parallelInput = '';
    inputArray.forEach(item => {
        parallelInput = html`${parallelInput}
          <a href="https://suttacentral.net/${item[0]}/pli/ms#${item[1]}" target="_blank">${item[0]}:${item[1]}</a>
          <br>`
      })
    return parallelInput;
  }

  addHeader(inputKeys) {
    let header = '';
    inputKeys.forEach(item => {
      header = html`${header}
        <td class="segment-header">
          ${item.toUpperCase()}
        </td>`
    })
    return header;
  }
}

customElements.define('table-view', TableView);


