import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Catcher from '../../components/Catcher';
import StatusBar from '../../components/StatusBar';
import Feed from '../../components/Feed';
import Profile from '../../components/Profile';
import { Provider } from '../../components/HOC/withProfile';

import avatar from 'theme/assets/homer';
import Login from '../../components/Login';

export default class App extends Component {

    state = {
        currentUserFirstName: '',
        currentUserLastName: '',
        avatar,
        authenticated: false
    }

    _logIn = () => {
        this._applyAuthentication(true, 'Дмитрий', 'Приведенюк');
    }

    _logOut = () => {
        this._applyAuthentication(false, '', '');
    }

    _applyAuthentication = (authenticated, currentUserFirstName, currentUserLastName) => {
        this.setState({
            currentUserFirstName: currentUserFirstName,
            currentUserLastName: currentUserLastName,
            authenticated: authenticated,
        });

        localStorage.setItem('authenticated', authenticated);
        localStorage.setItem('currentUserFirstName', currentUserFirstName);
        localStorage.setItem('currentUserLastName', currentUserLastName);
    }

    componentWillMount() {
        const authenticated = localStorage.getItem('authenticated');
        const currentUserFirstName = localStorage.getItem('currentUserFirstName');
        const currentUserLastName = localStorage.getItem('currentUserLastName');

        if (authenticated) {
            this.setState({
                currentUserFirstName: currentUserFirstName,
                currentUserLastName: currentUserLastName,
                authenticated: authenticated === 'true',
            })
        }
    }

    render() {
        const { authenticated } = this.state;

        return (
            <Catcher>
                <Provider value={this.state}>
                    <StatusBar _logOut={this._logOut} authenticated={authenticated} />
                    <Switch>
                        <Route path='/login' render={
                            () => <Login logIn={this._logIn} />
                        } />
                        {authenticated ? <Route component={Feed} path='/feed' /> : <Redirect to='/login' />}
                        {authenticated ? <Route component={Profile} path='/profile' /> : <Redirect to='/login' />}
                        {authenticated ? <Redirect to='/feed' /> : <Redirect to='/profile' />}
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
