import React, { Component } from 'react';
import { Consumer } from '../HOC/withProfile';

import Styles from './styles.m.css';

export default class StatusBar extends Component {
    render() {
        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.statusBar }>
                        <button>
                            <img src = { context.avatar } />
                            <span>{context.userFirstName}</span>
                            &nbsp;
                            <span>{context.userLastName}</span>
                        </button>
                    </section>
                )}
            </Consumer>
        );
    }
}
