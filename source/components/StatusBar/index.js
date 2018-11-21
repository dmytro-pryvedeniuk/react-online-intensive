import React, { Component } from 'react';

import avatar from 'theme/assets/homer';

import Styles from './styles.m.css';

export default class StatusBar extends Component {
    render() {
        return (
            <section className = { Styles.statusBar }>
                <button>
                    <img src = { avatar } />
                    <span>Homer</span>
                    &nbsp;
                    <span>Simpson</span>
                </button>
            </section>
        );
    }
}
