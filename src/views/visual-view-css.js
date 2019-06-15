import { LitElement, html } from 'lit-element';

export const visualViewCss =  html`
<style>
    iframe {
      width: 100%;
      border: 0;
      margin-top: 12px;
    }

    .visual-view-dropdown {
    	margin: 0 24px;
    }

    p.expanation-text {
    	text-align: center;
    }

    #visuals div {
      position: fixed;
      width: 20px;
    }

    path {
      opacity: 0.4;
    }

    path:hover {
      opacity: 1;
    }

    .source {
      text-align: right;
    }

    .target {
      text-align: left;
    }

</style>`;