import { LitElement, html } from 'lit-element';

export const tableViewCss =  html`
<style>

    vaadin-radio-button, vaadin-text-field, vaadin-select, vaadin-split-layout {
      --material-primary-color: #0031ca;
      --material-primary-text-color: rgba(33, 33, 33);
      --_material-split-layout-splitter-background-color: #0031ca;
    }

    vaadin-text-field {
      width: 150px;
    }

    vaadin-accordion, .filter-group {
      display: inline-flex;
    }

    .filter-group {
      margin-left: 10px;
    }

    .start-segment {
      padding-right: 10px;
      width: 30%;
      max-width: 300px;
    }

    .start-segment.nr {
      width: 10%;
    }

    .segment-header {
      font-weight: bold;
    }

    table, .top-level-split {
      margin-top: 12px;
    }

    .selected-segment {
      background-color: #db960a;
    }

    td {
      vertical-align: top;
      padding: 10px;
      border: 3px solid white;
      font-family: Roboto, sans-serif;
      border-radius: 10px;
      background-color: rgb(244, 243, 242);
    }

    td.parallel-item {          
      border: 2px solid white;
    }

    .element-hidden {
      display: none;
    }

    .selected-parallel {
      background-color: rgb(244, 243, 242);
      margin-top: 0;
      margin-bottom: 8px;
      padding: 10px;
      font-family: Roboto, sans-serif;
      border-radius: 10px;
    }

    td a, .selected-parallel-nr {
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