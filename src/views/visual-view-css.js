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

    svg text {
      font-size: 16px;
      opacity: 0.7;
    }

    rect {
      opacity: 0.4;
    }

    path {
      opacity: 0.2;
    }

    .highlight {
      opacity: 1;
    }

    text.highlight {
      fill: #0031ca;
    }

</style>`;