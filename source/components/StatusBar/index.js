import React, { Component } from 'react';

import Styles from './styles.m.css';

export default class StatusBar extends Component {
    render() {
        const { avatar, userFirstName, userLastName } = this.props;

        return (
            <section className = { Styles.statusBar }>
                <button>
                    <img src = {avatar} />
                    <span>{userFirstName}</span>
                    &nbsp;
                    <span>{userLastName}</span>
                </button>
            </section>
        );
    }
}
