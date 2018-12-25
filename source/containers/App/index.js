import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Catcher from '../../components/Catcher';
import StatusBar from '../../components/StatusBar';
import Feed from '../../components/Feed';
import Profile from '../../components/Profile';
import { Provider } from '../../components/HOC/withProfile';

import avatar from 'theme/assets/homer';

var options = {
    currentUserFirstName: 'Дмитрий',
    currentUserLastName:  'Приведенюк',
    avatar,
};

export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar />
                    <Switch>
                        <Route
                            component = { Feed }
                            path = '/feed'
                        />
                        <Route
                            component = { Profile }
                            path = '/profile'
                        />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
