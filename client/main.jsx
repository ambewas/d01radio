import React from 'react';
import { render } from 'react-dom';

// import some default styles
import 'react-toolbox/lib/commons.scss';
import styles from './scss/main.scss';

// importing all modules
import LandingContainer from './modules/Landing/index.js';

// redux setup with routing
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import appReducers from './redux/reducers';
import Header from './header.jsx';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

function configureStore(initialState) {
  const store = createStoreWithMiddleware(appReducers);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./redux/reducers', () => {
      const nextAppReducers = require('./redux/reducers/index');
      store.replaceReducer(nextAppReducers);
    });
  }

  return store;
}

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

//initializing app
let App = React.createClass({
  displayName: 'App',

  propTypes: {},

  render: function() {

    return (
      <div className="app-container">
        <Provider store={store}>
          <Header>
            <Router history={history}>
              <Route path="/" component={LandingContainer} />
            </Router>
          </Header>
        </Provider>
      </div>
    );
  }
});

render(<App />, document.getElementById('js-main'));
