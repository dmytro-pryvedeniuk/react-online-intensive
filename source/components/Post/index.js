import React, { Component } from 'react';

import Styles from './styles.m.css';

import moment from 'moment';

export default class Post extends Component {
    render() {
        const { userFirstName, userLastName, avatar } = this.props;

        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a>
                    {userFirstName} {userLastName}
                </a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>Howdy?</p>
            </section>
        );
    }
}
