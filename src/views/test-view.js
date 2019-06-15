import { html } from 'lit-element';
import { BaseView } from './base-view.js';
import { visualViewCss } from './visual-view-css';
import { pliCollection } from '../suttalists/pli-collection';

class TestView extends BaseView {
  static get properties() {
    return {
      dValue: { type: String },
      showStuff: { type: String },
    };
  }

  constructor() {
    super();
      this.dValue = '';
      this.showStuff = '';
  }

  render() {
    return html`
      <div id="visuals">
        ${visualViewCss}
        ${this.testSVG()}
        ${this.showStuff}
      </div>
    `;
  }

  testSVG() {
    let topCounter = 150;
    let offset = 100;
    let sourceDivs = this.getCollectionDivs(pliCollection,"source",topCounter,offset);
    let targetDivs = this.getCollectionDivs(pliCollection,"target",topCounter,offset);
    let svgLines = this.getCollectionSvg(pliCollection,pliCollection,topCounter,offset);
    
    this.showStuff = html`${sourceDivs}${targetDivs}${svgLines}`;
  }

  getCollectionSvg(sourceCollection,targetCollection,topCounter,offset) {
    let windowWidth = window.innerWidth;
    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttribute("width", "100%");
    svg1.setAttribute("height", window.innerHeight-topCounter);

    Object.values(sourceCollection).forEach(item => {
      let sourceColor = this.getRandomColor();
      Object.keys(item.parallels).forEach(parallel => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        line.setAttribute("stroke", sourceColor);
        line.setAttribute("fill", "transparent");
        line.setAttribute("stroke-width", item.parallels[parallel][0]/5);
        line.setAttribute("id", `${item.collection}-${parallel}`);

        let posnA = topCounter-(130-item.parallels[parallel][0]/10)+item.parallels[parallel][1]/5;
        let posnBy = 150-(130-item.parallels[parallel][0]/10)+targetCollection[parallel].parallels[item.collection][2]/5;
        let posnBx = windowWidth-offset-50;

        const dStr = "M"+ (offset+2) + " " + posnA + " C " + (windowWidth/4) + " " + posnA + " , " + 
                      (windowWidth*3/4) + " " + posnBy + ", " + posnBx + " " + posnBy;

        line.setAttribute("d", dStr);
        svg1.appendChild(line);
      })
      topCounter += item.parallelstotal/5 + 5;
    })
    return svg1;
  }

  getCollectionDivs(showCollection,classname,topCounter,offset) {
    let windowWidth = window.innerWidth;
    let showDivs = '';

    Object.values(showCollection).forEach(item => {
      let collectionDiv = document.createElement("div");
      let collectionHeight = item.parallelstotal/5;
      let collectionTop = topCounter;
      collectionDiv.id = item.collection;
      collectionDiv.style.height = collectionHeight+"px";
      collectionDiv.style.backgroundColor = this.getRandomColor();
      collectionDiv.style.top = collectionTop+"px";
      (classname == "source") ? collectionDiv.style.left = offset+"px" : collectionDiv.style.right = offset+"px";
      collectionDiv.innerText = item.name;
      collectionDiv.classList.add(classname);

      topCounter += collectionHeight + 5;

      showDivs = html`${showDivs}
                ${collectionDiv}`;
    });
    return showDivs;
  }

    
  testing() {
    console.log("test");
  }


  getRandomColor() {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    return "#" + ("000000" + hex.toString(16)).substr(-6);
  }
}

customElements.define('test-view', TestView);
