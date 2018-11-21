import React, { Component } from 'react';
import Feed from '../../components/Feed';

import avatar from 'theme/assets/homer';
import { hot } from 'react-hot-loader';

var options = {
    userFirstName: 'Homer',
    userLastName:  'Simpson',
    avatar,
};

@hot(module)
export default class App extends Component {
    render() {
        return <Feed { ...options } />;
    }
}
