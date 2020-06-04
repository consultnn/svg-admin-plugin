import React from 'react';
import ReactDOM from 'react-dom';
import SVGAdmin from './components/SVGAdmin';

ReactDOM.render(
  <React.StrictMode>
    <SVGAdmin inputSelector={document.getElementById('svg-admin-list').dataset.inputSelector} />
  </React.StrictMode>,
  document.getElementById('svg-admin-list')
);