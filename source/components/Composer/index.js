import React, { Component } from 'react';

import Styles from './styles.m.css';

export default class Composer extends Component {
    render() {
        const { userFirstName, avatar } = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form>
                    <textarea placeholder = { `What\'s on your mind, ${userFirstName}?` } />
                    <input
                        type = 'submit'
                        value = 'Post'
                    />
                </form>
            </section>
        );
    }
}
