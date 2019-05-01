import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-text-field/theme/material/vaadin-text-field';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-group';
import '@vaadin/vaadin-select/theme/material/vaadin-select';
import '@vaadin/vaadin-list-box/theme/material/vaadin-list-box';
import '@vaadin/vaadin-accordion/theme/material/vaadin-accordion';
import { tableViewCss } from './table-view-css';

const VisibilityFilters = {
  SHOW_SEGMENT: 'Segment',
  SHOW_NUMBERS: 'Numbers',
  SHOW_GRAPH: 'Graph'
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
      ${tableViewCss}
      <div class="input-layout"
  		  @keyup="${this.shortcutListener}"> 

        <vaadin-accordion opened="${this.panelOpened}">

          <vaadin-accordion-panel class="main-panel" theme="material">
            <div slot="summary">Pali</div>
            <div>

              <vaadin-accordion-panel class="main-panel" theme="material">
                <div slot="summary">Suttas</div>
                <div>

                  <vaadin-accordion-panel theme="material">
                    <div slot="summary">Digha Nikaya</div>
                    <div>Not yet available</div>
                  </vaadin-accordion-panel>

                  <vaadin-accordion-panel theme="material">
                    <div slot="summary">Majjhima Nikaya</div>
                    <div>
                      <vaadin-select 
                        placeholder="Select a sutta" 
                        value="${this.task}" 
                        @value-changed="${this.updateTask}">
                        <template>
                          <vaadin-list-box>
                            ${this.insertSuttaNumbers("mn")}
                          </vaadin-list-box>
                        </template>
                      </vaadin-select>
                    </div>
                  </vaadin-accordion-panel>

                  <vaadin-accordion-panel theme="material">
                    <div slot="summary">Samyutta Nikaya</div>
                    <div>
                      ${this.insertSuttaNumbers("sn")}
                    </div>
                  </vaadin-accordion-panel>

                  <vaadin-accordion-panel theme="material">
                    <div slot="summary">Anguttara Nikaya</div>
                    <div>
                      ${this.insertSuttaNumbers("an")}
                    </div>
                  </vaadin-accordion-panel>

                  <vaadin-accordion-panel theme="material">
                    <div slot="summary">Khuddaka Nikaya</div>
                    <div>
                      ${this.insertSuttaNumbers("kn")}
                    </div>
                  </vaadin-accordion-panel>

                </div>
              </vaadin-accordion-panel>

             <vaadin-accordion-panel class="main-panel" theme="material">
                <div slot="summary">Vinaya</div>
                <div>${this.insertSuttaNumbers("vinaya")}</div>
             </vaadin-accordion-panel>

             <vaadin-accordion-panel class="main-panel" theme="material">
                <div slot="summary">Abhidhamma</div>
                <div>${this.insertSuttaNumbers("abhidhamma")}</div>
             </vaadin-accordion-panel>

            </div>
          </vaadin-accordion-panel>

        </vaadin-accordion>

        <vaadin-accordion opened="${this.panelOpened}">
          <vaadin-accordion-panel class="main-panel" theme="material">
            <div slot="summary">Sanskrit texts</div>
            <div>Not yet available</div>
        </vaadin-accordion>

        <div class="filter-group">
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
              class="${this.probabilityHidden}"
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
  		</div>

      ${this.suttaData}

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

  insertSuttaNumbers(collection) {
    let suttaNumberList = '';
    const collectionLength = {"dn": 34, "mn": 152, "sn": 56, "an": 11};

    switch(collection) {
      case ("dn"):
        for (let i = 1; i <= collectionLength[collection]; i++) {
          suttaNumberList = html`${suttaNumberList}
                <vaadin-item>${collection}${i}</vaadin-item>`
        }
        return suttaNumberList;
        break;
      case ("mn"):
        for (let i = 1; i <= collectionLength[collection]; i++) {
          suttaNumberList = html`${suttaNumberList}
                <vaadin-item>${collection}${i}</vaadin-item>`
        }
        return suttaNumberList;
        break;
      case ("sn"):
        for (let i = 1; i <= collectionLength[collection]; i++) {
          suttaNumberList = html`${suttaNumberList}
              <vaadin-accordion-panel theme="material">
                <div slot="summary">${collection.toUpperCase()} ${i}</div>
                <div>Not yet available</div>
              </vaadin-accordion-panel>`
        }
        return suttaNumberList;
        break;
      case ("an"):
        for (let i = 1; i <= collectionLength[collection]; i++) {
          suttaNumberList = html`${suttaNumberList}
              <vaadin-accordion-panel theme="material">
                <div slot="summary">${collection.toUpperCase()} ${i}</div>
                <div>Not yet available</div>
              </vaadin-accordion-panel>`
        }
        return suttaNumberList;
        break;
      case ("kn"):
        const knCollection = ["kp","dhp","ud","iti","snp","vv","pv","thag","thig","tha-ap","thi-ap","bv","cp","ja","mnd","cnd","ps","ne","pe","mil"];
        knCollection.forEach(item => {
          suttaNumberList = html`${suttaNumberList}
              <vaadin-accordion-panel theme="material">
                <div slot="summary">${item.toUpperCase()}</div>
                <div>Not yet available</div>
              </vaadin-accordion-panel>`
        });
        return suttaNumberList;
        break;
      case ("vinaya"):
        const vinayaCollection = ["pli-tv-pvr"];
        vinayaCollection.forEach(item => {
          suttaNumberList = html`${suttaNumberList}
              <vaadin-accordion-panel theme="material">
                <div slot="summary">${item.toUpperCase()}</div>
                <div>Not yet available</div>
              </vaadin-accordion-panel>`
        });
        return suttaNumberList;
        break;
      case ("abhidhamma"):
        const abhidhammaCollection = ["ds","vb","dt","pp","kv","ya","patthana"];
        abhidhammaCollection.forEach(item => {
          suttaNumberList = html`${suttaNumberList}
              <vaadin-accordion-panel theme="material">
                <div slot="summary">${item.toUpperCase()}</div>
                <div>Not yet available</div>
              </vaadin-accordion-panel>`
        });
        return suttaNumberList;
        break;
      default:
        return suttaNumberList;
    }
  }


  insertSanskrit() {
    let sanskritSuttaList = 'Not yet available';
    // for (let i = 1; i <= 152; i++) {
    //   sanskritSuttaList = html`${sanskritSuttaList}
    //         <vaadin-item>mn${i}</vaadin-item>`
    // }
    return sanskritSuttaList;
  }

  filterChanged(e) {
    this.filter = e.target.value;
    (this.filter == VisibilityFilters.SHOW_SEGMENT) ? this.maxResultsHidden = '' : this.maxResultsHidden = 'element-hidden';
    (this.filter == VisibilityFilters.SHOW_GRAPH) ? this.probabilityHidden = 'element-hidden' : this.probabilityHidden = '';
    this.task ? this.applyFilter() : '';
  }

  applyFilter() {
    if (!this.task) {
      return;
    }
    let url = `./suttas/${this.task}.json`;
    let networkUrl = `./network/index.html#${this.task}`;
    if (this.filter == VisibilityFilters.SHOW_NUMBERS) {
        fetch(url).then(r => r.json()).then(data => {
          this.buildSegTable(data);
        });
    } else if (this.filter == VisibilityFilters.SHOW_SEGMENT) {
        fetch(url).then(r => r.json()).then(data => {
          this.buildTable(data);
        });
    } else {
        fetch(networkUrl).then(r => r.text()).then(data => {
          this.suttaData = html`<iframe src="${networkUrl}"></iframe>`;
        });
    }
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
            SuttaCentral Segment in ${this.task.toUpperCase()}
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
                  <span class="probability">Probability: ${data[i].parallels[p].probability}</span><br>
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
    this.suttaData = html`<table>${suttaItem}</table>`;
  }

  buildSegTable(data) {
    let suttaItem = '';
    let collectionkeys = ["dn","mn","sn","an","dhp","ud","iti","snp","vv","pv","thag","thig","tha-ap","thi-ap","ja","mnd","cnd","ps","ne","pe","mil","vinaya","ds","vb","dt","pp","kv","ya","patthana","other"];
    suttaItem = html`${suttaItem}
      <tr><td colspan="${collectionkeys.length+1}"><b>Parallel segment numbers sorted by collection for ${this.task.toUpperCase()}.</b><br>
        Click on the segment numbers to go to the relevant section in SuttaCentral.<br>
        When there is a range of parallel segment numbers, only the first one is shown.
      </td></tr>
      <tr>
          <td class="start-segment-nr segment-header">
            SuttaCentral Segment id in ${this.task.toUpperCase()}
          </td>
          ${this.addHeader(collectionkeys)}
      </tr>
    `;

    for (let i = 0; i < data.length; i++) {
      let collections = {dn:[],mn:[],sn:[],an:[],dhp:[],ud:[],iti:[],snp:[],vv:[],pv:[],thag:[],thig:[],thaap:[],thiap:[],ja:[],mnd:[],cnd:[],ps:[],ne:[],pe:[],mil:[],plitvpvr:[],ds:[],vb:[],dt:[],pp:[],kv:[],ya:[],patthana:[],other:[]};

      for (let p = 0; p < data[i].parallels.length; p++) {
        let parSegmentRef = data[i].parallels[p].parsegnr;
        let parSutta = (parSegmentRef ? parSegmentRef.split(':') : []);
        let parCollection = parSutta[0].match(/[a-z\-]*/g)[0].replace(/-/g,'');

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
    this.suttaData = html`<table>${suttaItem}</table>`;
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


