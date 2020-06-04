import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SVGAdmin from './SVGAdmin';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <SVGAdmin inputSelector={document.getElementById('svg-admin-list').dataset.inputSelector} />
  </React.StrictMode>,
  document.getElementById('svg-admin-list')
);

serviceWorker.unregister();
