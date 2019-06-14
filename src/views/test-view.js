import { html } from 'lit-element';
import { BaseView } from './base-view.js';
import { visualViewCss } from './visual-view-css';


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

    let windowWidth = window.innerWidth;
    const divA = document.createElement("div");
    let heightA = 30;
    let topA = 150;
    divA.id = "diva";
    divA.style.height = heightA+"px";
    divA.style.backgroundColor = "#ff3333";
    divA.style.top = topA+"px";
    divA.style.left = "20px";

    const divB = document.createElement("div");
    let heightB = 50;
    let topB = 250;
    divB.id = "divb";
    divB.style.height = heightB+"px";
    divB.style.backgroundColor = "#4d0000";
    divB.style.top = topB+"px";
    divB.style.right = "20px";

    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttribute("width", "100%");
    svg1.setAttribute("height", "100%");

    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    line.setAttribute("stroke", "black");
    line.setAttribute("fill", "transparent");
    line.setAttribute("stroke-width", "10");

    let posnA = topA-130+(heightA/2);
    let posnBy = topB-130+(heightB/2);
    let posnBx = windowWidth-55;

    console.log(posnA,posnBy,posnBx);

    const dStr = "M22 " + posnA + " C 320 " + posnA + " , 930 "+ posnBy + ", " + posnBx + " " + posnBy;

    line.setAttribute("d", dStr);

    svg1.appendChild(line);
    console.log(dStr);
    this.showStuff = html`${divA}${divB}${svg1}`;
  }
}

customElements.define('test-view', TestView);
