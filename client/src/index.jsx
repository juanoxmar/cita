import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';
import config from './config';
import 'bootstrap/dist/css/bootstrap.min.css';

const {
  audeience,
  clientId,
  domain,
  scope,
} = config();

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    audience={audeience}
    scope={scope}
    redirectUri={window.location.origin}
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById('root'),
);
