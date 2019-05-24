import './styles.css';
import './views/home-view.js';
import { Router } from '@vaadin/router';

window.addEventListener('load', () => { 
  initRouter();
});

function initRouter() {
  const router = new Router(document.querySelector('main')); 
  router.setRoutes([
    {
      path: '/',
      component: 'home-view',
    },
    {
      path: '/pali',
      component: 'table-view',
      action: () =>
        import(/* webpackChunkName: "pali" */ './views/table-view') // 
    },
    {
      path: '/sanskrit',
      component: 'table-view',
      action: () =>
        import(/* webpackChunkName: "sanskrit" */ './views/table-view') // 
    },
    {
      path: '(.*)', 
      component: 'not-found-view',
      action: () =>
        import(/* webpackChunkName: "not-found-view" */ './views/not-found-view')
    }
  ]);
}