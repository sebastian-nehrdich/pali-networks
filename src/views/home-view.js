import { html } from 'lit-element';
import { BaseView } from './base-view.js';
import { homeViewCss } from './home-view-css';

class HomeView extends BaseView {
  render() {
    return html`
      ${homeViewCss}
      <div id="home">
	      <h1>About this site</h1>
	      <p>This site shows parallels within Pali and Sanskrit texts on segment basis, based on SIF-weighted averages of word vectors. The Pali text in segmented form have been supplied by SuttaCentral.net and the Sanskrit files come from Gretil (http://gretil.sub.uni-goettingen.de/gretil.htm)</p>
	      <p>There are 3 possible views:</p>
	      <ul>
		      <li>Segment-view shows a table of all segments of the original file that is selected in the leftmost column with on the right the corresponding parallels. Each cell contains the numerical ID of the quoted segment and underneath the score of the match.</li>
		      <li>Numbers-view shows a table with only the numbers of the suttas and their segment number for easy reference.</li>
		      <li>Graph-view shows a visualization with possible links to other suttas</li>
	      </ul>
	      <p>For all the Pali texts, the numerical ID of the segments refer to the ID within SuttaCentral and are a link to that passage in SuttaCentral.</p>
	      <p>There are several filters that can be applied:</p>
	      <ul>
		      <li>Probability-values: a value of 0 means a perfect match, while a higher value indicates less similarity. The default value is at 0.065.</li>
		      <li>Maximum number of results: for Segment-view only; the maximum number of results shown for each segment. The default value is 10. If there are more results, there is the possibility of this being a standard passage that appears everywhere and is not of much value for parallel analysis.</li>
	      </ul>
	      <p>Note that due to the sheer volume of some of the text, loading a page might take some time</p>
	      <p><a href="https://github.com/sebastian-nehrdich/gretil-quotations#board" target="blank">The code and a description of the technical background</a> as well as the <a href="https://github.com/ayya-vimala/pali-networks" target="blank">frontend code</a> can be found on GitHub.</p>
	    </div>
    `;
  }
}

customElements.define('home-view', HomeView);