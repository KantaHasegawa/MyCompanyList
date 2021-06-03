import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";



ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="company.jp.auth0.com"
      clientId="j5emsqplg5NaPg1PHOfhSKFMFqreHMJc"
      redirectUri={window.location.origin}
      audience="https://company.jp.auth0.com/api/v2/"
      scope="read:current_user"
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
