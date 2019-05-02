import { LitElement, html } from 'lit-element';

export const tableViewCss =  html`
<style>

    vaadin-radio-button, vaadin-text-field, vaadin-select {
      --material-primary-color: #0031ca;
      --material-primary-text-color: rgba(33, 33, 33);
    }

    vaadin-text-field {
      width: 150px;
    }

    vaadin-accordion, .filter-group {
      display: inline-flex;
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

    table {
      margin-top: 12px;
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

    .element-hidden {
      display: none;
    }

    a {
      text-decoration: none;
      color: rgba(0, 0, 0, 0.54);
      font-size: 16px;
      white-space: nowrap;
    }

    .probability {
      font-size: 14px;
    }

    iframe {
      width: 100%;
      border: 0;
      height: 750px;
      margin-top: 12px;
    }
</style>`;