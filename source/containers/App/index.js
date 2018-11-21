import React, { Component } from 'react';
import Feed from '../../components/Feed';

import { hot } from 'react-hot-loader';

@hot(module)
export default class App extends Component {
    render() {
        return <Feed />;
    }
}
