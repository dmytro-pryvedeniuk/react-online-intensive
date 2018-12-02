import React, { Component } from 'react';
import Feed from '../../components/Feed';
import { Provider } from '../../components/HOC/withProfile';

import avatar from 'theme/assets/homer';
import { hot } from 'react-hot-loader';

var options = {
    currentUserFirstName: 'Homer',
    currentUserLastName:  'Simpson',
    avatar,
};

@hot(module)
export default class App extends Component {
    render() {
        return (
            <Provider value = { options }>
                <Feed />
            </Provider>
        );
    }
}
