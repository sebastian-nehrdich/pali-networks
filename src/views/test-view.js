import { html } from 'lit-element';
import { BaseView } from './base-view.js';
import { visualViewCss } from './visual-view-css';
import { pliCollection } from '../suttalists/pli-collection';

class TestView extends BaseView {
  static get properties() {
    return {
      dValue: { type: String },
      showStuff: { type: String },
      offset: { type: Number },
      factor: { type: Number },
      boxwidth: { type: Number },
      svgHeight: { type: Number }
    };
  }

  constructor() {
    super();
      this.dValue = '';
      this.showStuff = '';
      this.offset = 200;
      this.factor = 4;
      this.boxwidth = 10;
      this.svgHeight = 400;
  }

  render() {
    return html`
      <div id="visuals">
        ${visualViewCss}
        ${this.constructSVG()}
        ${this.showStuff}
      </div>
    `;
  }

  constructSVG() {
    this.addEventListener('mouseover', this.addHighlight);
    this.addEventListener('mouseout', this.removeHighlight);
    this.addEventListener('click', this.loadSubDataSet);
    const svgMap = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgMap.setAttribute("width", "100%");
    svgMap.setAttribute("height", this.svgHeight+'px');

    this.getCollectionDivs(pliCollection,"source",svgMap);
    this.getCollectionDivs(pliCollection,"target",svgMap);
    this.getCollectionSvg(pliCollection,pliCollection,svgMap,'layered');
    
    const svgMap2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgMap2.setAttribute("width", "100%");
    svgMap2.setAttribute("height", this.svgHeight+'px');
    svgMap2.setAttribute('y', this.svgHeight+100+'px');

    this.getCollectionDivs(pliCollection,"source",svgMap2);
    this.getCollectionDivs(pliCollection,"target",svgMap2);
    this.getCollectionSvg(pliCollection,pliCollection,svgMap2,'centered');

    this.showStuff = html`${svgMap}${svgMap2}`;
  }

  getCollectionSvg(sourceCollection,targetCollection,svgMap,mapType) {
    let windowWidth = window.innerWidth;
    let posnBx = windowWidth-this.offset;
    let middlePosition = (windowWidth+this.boxwidth-this.offset/2)/2

    Object.values(sourceCollection).forEach(item => {
      Object.keys(item.parallels).forEach(parallel => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        line.setAttribute("stroke", item.color);
        line.setAttribute("fill", "transparent");
        line.setAttribute("stroke-width", item.parallels[parallel][0]/this.factor);
        line.setAttribute("id", `${item.collection}-${parallel}`);

        let posnA = '';
        let posnBy = '';

        if (mapType == 'layered') {
          posnA = item.position/this.factor+(item.parallels[parallel][0]/(this.factor*2))+item.parallels[parallel][1]/this.factor;
          posnBy = (item.parallels[parallel][0]/(this.factor*2))+
                  (targetCollection[parallel].position+targetCollection[parallel].parallels[item.collection][1]) /this.factor;
        } else {
          posnA = item.position/this.factor + (item.parallelstotal/this.factor)/2;
          posnBy = (targetCollection[parallel].position+targetCollection[parallel].parallelstotal/2)/(this.factor);
        }
        const dStr = "M"+ (this.offset/2+this.boxwidth) + " " + posnA + " C " + middlePosition + " " + posnA + " , " + 
                      middlePosition + " " + posnBy + ", " + posnBx + " " + posnBy;

        line.setAttribute("d", dStr);
        svgMap.appendChild(line);
      })
    })
  }

  getCollectionDivs(showCollection,classname,svgMap) {
    let windowWidth = window.innerWidth;

    Object.values(showCollection).forEach(item => {

      let collectionHeight = item.parallelstotal/this.factor;
      let collectionTop = item.position/this.factor;
      const rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rectangle.setAttribute("y", collectionTop);
      rectangle.setAttribute("id", classname+'_'+item.collection);
      rectangle.setAttribute("height", collectionHeight);
      rectangle.setAttribute("width", this.boxwidth);
      rectangle.setAttribute("fill", item.color);
      if (classname == "source") {
        rectangle.setAttribute("x", this.offset/2);
        rectangle.setAttribute("cursor", 'pointer');
      } else {
        rectangle.setAttribute("x", windowWidth-this.offset);
      };

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("y", collectionTop + collectionHeight/2);
      label.appendChild(document.createTextNode(item.name));
      if (classname == "source") {
        label.setAttribute("x", this.offset/10);
        label.setAttribute("cursor", 'pointer');
      } else {
        label.setAttribute("x", windowWidth+this.boxwidth*2-this.offset);
      };
      label.setAttribute("id", classname+'text_'+item.collection);
      
      svgMap.appendChild(rectangle);
      svgMap.appendChild(label);
    });
  }
    
  addHighlight(e) {
    let elementType = e.target.nodeName;
    let elementId = e.target.id;
    let sourceId = '';
    let targetId = '';
    if (elementType == 'path') {
      sourceId = elementId.split('-')[0];
      targetId = elementId.split('-')[1];
      e.target.setAttribute("class", 'highlight');
      this.querySelector(`#source_${sourceId}`).setAttribute("class", 'highlight');
      this.querySelector(`#target_${targetId}`).setAttribute("class", 'highlight');
      this.querySelector(`#sourcetext_${sourceId}`).setAttribute("class", 'highlight');
      this.querySelector(`#targettext_${targetId}`).setAttribute("class", 'highlight');
    }
    if ((elementType == 'text' || elementType == 'rect')) {
      if (elementId.startsWith('source')) {
        sourceId = elementId.split('_')[1];

        e.target.setAttribute("class", 'highlight');
        this.querySelector(`#source_${sourceId}`).setAttribute("class", 'highlight');
        this.querySelector(`#sourcetext_${sourceId}`).setAttribute("class", 'highlight');
        this.querySelectorAll(`path[id^=${sourceId}]`).forEach(item => {
          item.setAttribute("class", 'highlight');
          targetId = item.id.split('-')[1];
          this.querySelector(`#target_${targetId}`).setAttribute("class", 'highlight');
          this.querySelector(`#targettext_${targetId}`).setAttribute("class", 'highlight');
        });
      }
      if (elementId.startsWith('target')) {
        targetId = elementId.split('_')[1];

        e.target.setAttribute("class", 'highlight');
        this.querySelector(`#target_${targetId}`).setAttribute("class", 'highlight');
        this.querySelector(`#targettext_${targetId}`).setAttribute("class", 'highlight');
        this.querySelectorAll(`path[id$=${targetId}]`).forEach(item => {
          item.setAttribute("class", 'highlight');
          sourceId = item.id.split('-')[1];
          this.querySelector(`#target_${sourceId}`).setAttribute("class", 'highlight');
          this.querySelector(`#targettext_${sourceId}`).setAttribute("class", 'highlight');
        });
      }
    }
  }

  removeHighlight(e) {
    this.querySelectorAll('.highlight').forEach(item => {
      item.removeAttribute("class");
    })
  }

  loadSubDataSet(e) {
    let elementType = e.target.nodeName;
    let elementId = e.target.id;
    let newElementId = '';
    if (elementType == 'text' || elementType == 'rect') {
      newElementId = elementId.split('_')[1];
      console.log(newElementId);
    }
  }

}

customElements.define('test-view', TestView);
