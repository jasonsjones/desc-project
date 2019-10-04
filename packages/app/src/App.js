import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Layout from './containers/Layout';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import RequestTabs from './components/RequestInbox/RequestTabs';
import RequestCreationPage from './components/RequestCreation/RequestCreationPage';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import { reducer } from './reducers/reducer';

import './App.css';
// import 'materialize-css/dist/css/materialize.css';

const store = createStore(reducer, applyMiddleware(thunk, logger));

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/signin" component={Signin} />
                        <PrivateRoute exact path="/inbox" component={RequestTabs} />
                        <PrivateRoute exact path="/create" component={RequestCreationPage} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
