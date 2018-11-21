import React, { Component } from 'react';
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../../components/StatusBar';

import Styles from './styles.m.css';

export default class Feed extends Component {
    render() {
        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer
                    avatar = { this.props.avatar }
                    userFirstName = { this.props.userFirstName }
                />
                <Post { ...this.props } />
            </section>
        );
    }
}
