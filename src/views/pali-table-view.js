import { html } from 'lit-element';
import { BaseView } from './base-view.js';
import '@vaadin/vaadin-text-field/theme/material/vaadin-number-field';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/theme/material/vaadin-radio-group';
import '@vaadin/vaadin-select/theme/material/vaadin-select';
import '@vaadin/vaadin-list-box/theme/material/vaadin-list-box';
import '@vaadin/vaadin-accordion/theme/material/vaadin-accordion';
import '@vaadin/vaadin-split-layout/theme/material/vaadin-split-layout';
import { tableViewCss } from './table-view-css';
import { pliMenu } from '../suttalists/pli-menu';

import { VisibilityFilters } from '../redux/reducer.js';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { updateFilter,
         updateProbability,
         updateMaxResults,
         updatePage
       } from '../redux/actions.js';

class PaliTableView extends connect(store)(BaseView) {
  static get properties() {
    return {
      task: { type: String },
      menuItems: { type: String },
      vinayaMenuItems: { type: String },
      abhidhammaMenuItems: { type: String },
      inputData: { type: Object },
      probability: { type: Number },
      maxResults: { type: Number },
      suttaData: { type: String },
      filter: { type: String },
      page: { type: Number },
      parallelTextWindow: { type: Number },
      ParallelText: { type: Number },
      panelOpened: { type: String },
      knCollection: { type: Object },
      abCollection: { type: Object },
      vnCollection: { type: Object }
    };
  }

  stateChanged(state) { 
    this.filter = state.filter;
    this.probability = state.probability;
    this.maxResults = state.maxResults;
    this.page = state.page;
  }

  constructor() {
    super();
    this.task = '';
    this.inputData = {};
    this.menuItems = '';
    this.vinayaMenuItems = '';
    this.abhidhammaMenuItems = '';
    this.suttaData = '';
    this.panelOpened = '10';
    this.parallelTextWindow = 'Click on a segment in the text to display the parallels.';
    this.parallelText = 'Click on a parallel to display the full text of the relevant sutta.';
    this.vnCollection = {plitvpvr: "Parivāra"};
    this.knCollection = {"kp": "Khuddakanikāya",
                    "dhp": "Dhammapada",
                    "ud": "Udāna",
                    "iti": "Itivuttaka",
                    "snp": "Suttanipāta",
                    "vv": "Vimānavatthu",
                    "pv": "Petavatthu",
                    "thag": "Theragāthā",
                    "thig": "Therīgāthā",
                    "tha-ap": "Therāpadāna",
                    "thi-ap": "Therīapadāna",
                    "bv": "Buddhavaṃsa",
                    "cp": "Cariyāpiṭaka",
                    "ja": "Jātaka",
                    "mnd": "Mahāniddesa",
                    "cnd": "Cūḷaniddesa",
                    "ps": "Paṭisambhidāmagga",
                    "ne": "Netti",
                    "pe": "Peṭakopadesa",
                    "mil": "Milindapañha"};
    this.abCollection = {"ds": "Dhammasaṅgaṇī",
                    "vb": "Vibhaṅga",
                    "dt": "Dhātukathā",
                    "pp": "Puggalapaññatti",
                    "kv": "Kathāvatthu",
                    "ya": "Yamaka",
                    "patthana": "Paṭṭhāna"};
  }

  connectedCallback() {
    super.connectedCallback();
    this.renderPaliMenu();
    this.renderPaliVinayaMenu();
    this.renderPaliAbhidhammaMenu();
  }

  render() {
    return html`
      ${tableViewCss}
      <div class="input-layout"> 

        <vaadin-accordion class="menu-accordion" opened="${this.panelOpened}">
              <vaadin-accordion-panel class="main-panel" theme="material">
                <div slot="summary">Sutta</div>
                <div>
                  ${this.menuItems}
                </div>
              </vaadin-accordion-panel>
        </vaadin-accordion>

        <vaadin-accordion class="menu-accordion" opened="${this.panelOpened}">
          ${this.vinayaMenuItems}
        </vaadin-accordion>

        <vaadin-accordion class="menu-accordion" opened="${this.panelOpened}">
          ${this.abhidhammaMenuItems}
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

            <vaadin-number-field
              label="Probability cutoff:"
              id="probability-cutoff"
              placeholder="Default = 0.065"
              value="${this.probability}" 
              @change="${this.updateProbability}"> 
            </vaadin-number-field>

            <vaadin-number-field
              label="Max number of results:"
              id="max-results"
              placeholder="Default: 10"
              value="${this.maxResults}" 
              @change="${this.updateMaxResults}"> 
            </vaadin-number-field>
        </div>

  		</div>
      ${this.suttaData}
    `;
  }

  renderPaliMenu() {
      this.menuItems = html`
                  ${this.insertCollectionMenu("Digha Nikāya","dn")}
                  ${this.insertCollectionMenu("Majjhima Nikāya","mn")}
                  ${this.insertCollectionMenu("Saṃyutta Nikāya","sn")}
                  ${this.insertCollectionMenu("Aṅguttara Nikāya","an")}
                  ${this.insertCollectionMenu("Khuddaka Nikāya","kn")}`;
  }

  renderPaliVinayaMenu() {
    this.vinayaMenuItems = html`${this.insertCollectionMenu("Vinaya","vinaya")}`;
  }

  renderPaliAbhidhammaMenu() {
    this.abhidhammaMenuItems = html`${this.insertCollectionMenu("Abhidhamma","abhidhamma")}`;
  }

  insertCollectionMenu(colName,collection) {
    return html`
      <vaadin-accordion-panel theme="material">
        <div slot="summary">${colName}</div>
        <div>
          ${this.insertSuttaNumbers(collection)}
        </div>
      </vaadin-accordion-panel>`
  }

  insertSuttaNumbers(collection) {
    let suttaNumberList = '';
    const collectionLength = {"sn": 56, "an": 11};
    switch(collection) {
      case ("dn"):
        return html`${this.insertSuttaDropDown(pliMenu[collection])}`
        break;
      case ("mn"):
        return html`${this.insertSuttaDropDown(pliMenu[collection])}`
        break;
      case ("sn"):
        suttaNumberList = '';
        for (let i = 1; i <= collectionLength[collection]; i++) {
          suttaNumberList = html`${suttaNumberList}
            <vaadin-accordion-panel theme="material">
              <div slot="summary">${collection.toUpperCase()} ${i}</div>
              <div>
                ${this.insertSuttaDropDown(pliMenu[collection+i])}
              </div>
            </vaadin-accordion-panel>`
        }
        return suttaNumberList;
        break;
      case ("an"):
        suttaNumberList = '';
        for (let i = 1; i <= collectionLength[collection]; i++) {
          suttaNumberList = html`${suttaNumberList}
            <vaadin-accordion-panel theme="material">
              <div slot="summary">${collection.toUpperCase()} ${i}</div>
              <div>
                ${this.insertSuttaDropDown(pliMenu[collection+i])}
              </div>
            </vaadin-accordion-panel>`
        }
        return suttaNumberList;
        break;
      case ("kn"):
        suttaNumberList = '';
        Object.values(this.knCollection).forEach(item => {
          suttaNumberList = html`${suttaNumberList}
              <vaadin-accordion-panel theme="material">
                <div slot="summary">${item}</div>
                <div>
                  ${this.insertSuttaDropDown(pliMenu[Object.keys(this.knCollection).find(key => this.knCollection[key] === item)])}
                </div>
              </vaadin-accordion-panel>`
        });
        return suttaNumberList;
        break;
      case ("vinaya"):
        suttaNumberList = '';
        Object.values(this.vnCollection).forEach(item => {
          suttaNumberList = html`${suttaNumberList}
              <vaadin-accordion-panel theme="material">
                <div slot="summary">${item}</div>
                <div>
                  ${this.insertSuttaDropDown(pliMenu[Object.keys(this.vnCollection).find(key => this.vnCollection[key] === item)])}
                </div>
              </vaadin-accordion-panel>`
        });
        return suttaNumberList;
        break;
      case ("abhidhamma"):
        suttaNumberList = '';
        Object.values(this.abCollection).forEach(item => {
          suttaNumberList = html`${suttaNumberList}
              <vaadin-accordion-panel theme="material">
                <div slot="summary">${item}</div>
                <div>
                  ${this.insertSuttaDropDown(pliMenu[Object.keys(this.abCollection).find(key => this.abCollection[key] === item)])}
                </div>
              </vaadin-accordion-panel>`
        });
        return suttaNumberList;
        break;
      default:
        return '';
    }
  }

  insertSuttaDropDown(collectiondata) {
    return html`
        <vaadin-select 
          placeholder="Select a sutta" 
          value="${this.task}" 
          @value-changed="${this.updateTask}">
          <template>
            <vaadin-list-box>
              ${collectiondata}
            </vaadin-list-box>
          </template>
        </vaadin-select>
    `
  }

  updateTask(e) {
    this.task = e.target.value;
    const accordionMenu = this.querySelectorAll('.menu-accordion');
    Array.from(accordionMenu, item => item.opened = '10');
    if (this.querySelector('#selected-parallels-window')) {
        this.querySelector('#selected-parallels-window').innerHTML = this.parallelTextWindow;
    };
    if (this.querySelector('#selected-parallel-text-window')) {
        this.querySelector('#selected-parallel-text-window').innerHTML = this.parallelText;
    };
    this.reloadSutta();
  }

  updateProbability(e) {
    store.dispatch(updateProbability(parseFloat(e.target.value)));
    this.task ? this.applyFilter() : '';
  }

  updateMaxResults(e) {
    store.dispatch(updateMaxResults(parseInt(e.target.value)));
    this.task ? this.applyFilter() : '';
  }

  filterChanged(e) {
    store.dispatch(updateFilter(e.target.value));
    switch(this.filter) {
          case (VisibilityFilters.SHOW_SEGMENT):
            this.querySelector('#max-results').disabled = false;
            this.querySelector('#probability-cutoff').disabled = false;
            break;
          case (VisibilityFilters.SHOW_NUMBERS):
            this.querySelector('#max-results').disabled = true;
            this.querySelector('#probability-cutoff').disabled = false;
            break;
          case (VisibilityFilters.SHOW_TEXT):
            this.querySelector('#max-results').disabled = true;
            this.querySelector('#probability-cutoff').disabled = false;
            break;
          case (VisibilityFilters.SHOW_GRAPH):
            this.querySelector('#max-results').disabled = true;
            this.querySelector('#probability-cutoff').disabled = true;
            break;
          default:
            this.querySelector('#max-results').disabled = false;
            this.querySelector('#probability-cutoff').disabled = false;
        }
    this.task ? this.applyFilter() : '';
  }

  reloadSutta() {
    if (!this.task) {
      return;
    }
    let url = `./suttas/${this.task}.json`;
    this.suttaData = `Loading text for ${this.task}...`;
    fetch(url).then(r => r.json()).then(data => {
      this.inputData = data;
      this.applyFilter();
    });
  }

  applyFilter() {
    let sutta = this.task.match(/[a-z-]*/g);
    switch(this.filter) {
          case (VisibilityFilters.SHOW_SEGMENT):
            this.buildTable(this.inputData);
            break;
          case (VisibilityFilters.SHOW_NUMBERS):
            this.buildSegTable(this.inputData);
            break;
          case (VisibilityFilters.SHOW_TEXT):
            this.buildTextView(this.inputData);
            break;
          case (VisibilityFilters.SHOW_GRAPH):
            this.suttaData = html`<iframe src="./network/index.html#${this.task}"></iframe>`;
            break;
          default:
            this.buildTable(this.inputData);
    }
  }

  buildTextView(data) {
    let suttaItem = '';
    let suttaCounter = 0;

    for (let i = 0; i < data.length; i++) { 
      let dataSegment = this.cleanSegments(data[i].segment,1);

      let newNumberCheck = parseInt(data[i].segmentnr.match(/\d+/)[0]);
      if (newNumberCheck !== suttaCounter) {
        suttaItem = html`${suttaItem}</p><p>`
        suttaCounter = newNumberCheck;
      }

      suttaItem = html`${suttaItem} <span @click="${this.displayParallels}" class="sutta-segment" id="${i}">${dataSegment}</span>`
    }

    let windowHeight = window.innerHeight-210;

    this.suttaData = html`
        <vaadin-split-layout class="top-level-split">
          <div style="width: 50%; height: ${windowHeight}px"><p>${suttaItem}</p></div>
          <vaadin-split-layout>
            <div id="selected-parallels-window" style="padding: 0 12px; width: 40%; height: ${windowHeight}px">${this.parallelTextWindow}</div>
            <div id="selected-parallel-text-window" style="padding-left: 12px; width: 20%; height: ${windowHeight}px">${this.parallelText}</div>
          </vaadin-split-layout>
        </vaadin-split-layout>`;
  }

  cleanSegments(text,frame) {
    let dataSegments = text.split(/\//g);
    let dataSegment = dataSegments[0];
    if (dataSegments.length > 1) {
      if (frame == 1) {
        for (let s = 1; s < dataSegments.length; s++) {
          dataSegment = html`${dataSegment}
                  <br>${dataSegments[s]}`;
        }
      } else {
        for (let s = 1; s < dataSegments.length; s++) {
          dataSegment = dataSegment +
                  `<br>${dataSegments[s]}`;
        }
      }
    };
    return dataSegment;
  }

  displayParallels(e) {
    this.querySelector('#selected-parallel-text-window').innerHTML = this.parallelText;
    let allSegments = this.querySelectorAll('.sutta-segment');
    allSegments.forEach(item => {item.classList.remove("selected-segment")});
    let selectedSegment = e.target;
    selectedSegment.classList.add("selected-segment");

    let selectedParallels = this.inputData[selectedSegment.id].parallels;
    let selectedParallelsText = '';

    for (let i = 0; i < selectedParallels.length; i++) { 
      if (selectedParallels[i].probability <= this.probability) {
        let segmentNrText = '';
        segmentNrText = this.cleanSegments(selectedParallels[i].parsegment,2);

        selectedParallelsText = selectedParallelsText + 
              `<p class="selected-parallel"><span class="selected-parallel-nr">
              ${selectedParallels[i].parsegnr}</span><br>
              <span class="probability">${selectedParallels[i].probability}</span><br>
              ${segmentNrText}</p>`;
      }
    }
    if (!selectedParallelsText) {
      selectedParallelsText = this.parallelTextWindow;
    }
    let selectedParallelWindow = this.querySelector('#selected-parallels-window');
    selectedParallelWindow.innerHTML = selectedParallelsText;

    let allParallels = this.querySelectorAll('.selected-parallel');
    allParallels.forEach(item => {item.addEventListener("click", (e) => this.displayParallelsText(e))});
  }

  displayParallelsText(e) {
    let selectedParallelTextWindow = this.querySelector('#selected-parallel-text-window');
    let parallelUrl = e.target.innerText.split(':')[0];
    let selectedSegmentId = e.target.innerText.split(':')[1];
    let url = `./suttas/${parallelUrl}.json`;

    fetch(url).then(r => r.json()).then(data => {
      let suttaItem = '';
      let suttaCounter = 0;

      for (let i = 0; i < data.length; i++) { 
        let dataSegment = this.cleanSegments(data[i].segment,2);

        let newNumberCheck = parseInt(data[i].segmentnr.match(/\d+/)[0]);
        if (newNumberCheck !== suttaCounter) {
          suttaItem = suttaItem + `</p><p>`;
          suttaCounter = newNumberCheck;
        }

        let selectedId = '';
        if (data[i].segmentnr == selectedSegmentId) {
          selectedId = 'selected-segment';
        }

        suttaItem = suttaItem + 
              ` <span class="parallel-sutta-segment ${selectedId}" id="${data[i].segmentnr}">${dataSegment}</span>`
      }

      selectedParallelTextWindow.innerHTML = suttaItem;
      selectedParallelTextWindow.querySelector('.selected-segment').scrollIntoView();
    });
  }

  buildTable(data) {
    let suttaItem = '';

    let headerText = html`<b>Parallel segments for each segment in ${this.task.toUpperCase()}.</b><br>
        The lower the probability number, the better the match. You can change the cutoff for the probability in the box above. Default = 0.065<br>
        When there is a range of parallel segment numbers, only the first one is shown.<br>
        Click on the segment numbers to go to the relevant section in SuttaCentral.`

    suttaItem = html`${suttaItem}
      <tr class="info-row"><td colspan="2">${headerText}</td></tr>
      <tr class="header-row">
          <td class="start-segment segment-header">
            Segment in ${this.task.toUpperCase()}
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
        if (data[i].parallels[p].probability <= this.probability && showCounter < this.maxResults) {      
          let parSegmentRef = data[i].parallels[p].parsegnr;
          let parSegmentName = data[i].parallels[p].parsegmenttext;
          let parSutta = (parSegmentRef ? parSegmentRef.split(':') : []);
          let segmentInputText = html`<a href="https://suttacentral.net/${parSutta[0]}/pli/ms#${parSutta[1]}" target="_blank">${parSegmentRef}</a>`;
          let parallelSegment = this.cleanSegments(data[i].parallels[p].parsegment,1);

          parallelsItems = html`${parallelsItems}
              <tr>
                <td class="parallel-item">
                  ${segmentInputText}<br>
                  <span class="probability">Probability: ${data[i].parallels[p].probability}</span><br>
                  ${parallelSegment}
                </td>
              </tr>
          `
          showCounter += 1;
        }
      }

      let segmentLink = html`<a href="https://suttacentral.net/${this.task}/pli/ms#${data[i].segmentnr}" target="_blank">${data[i].segmentnr}</a>`;
      let segmentText = this.cleanSegments(data[i].segment,1);

      suttaItem = html`${suttaItem}
        <tr>
          <tr>
            <td class="start-segment" rowspan="${rowSpan}">
              ${segmentLink}<br>${segmentText}
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

customElements.define('pali-table-view', PaliTableView);


