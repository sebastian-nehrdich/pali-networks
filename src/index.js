import './styles.css';
import './views/home-view.js';
import './views/tibetan-table-view.js';
import './views/pali-table-view.js';
import './views/sanskrit-table-view.js';
import './views/visual-view.js';
import './views/test-view.js';
import '@vaadin/vaadin-tabs/theme/material/vaadin-tabs';
import '@vaadin/vaadin-tabs/theme/material/vaadin-tab';
import '@polymer/iron-pages/iron-pages';
import { connect } from 'pwa-helpers';
import { store } from './redux/store.js';
import { updatePage } from './redux/actions.js';

window.addEventListener('click', () => { 
  let selectedPage = document.querySelector('vaadin-tabs').selected;
  if (!selectedPage) { selectedPage = 0 };
  store.dispatch(updatePage(selectedPage));
  document.querySelector('iron-pages').selected = selectedPage;
});
