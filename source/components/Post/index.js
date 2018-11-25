import React, { Component } from 'react';
import { Consumer } from '../HOC/withProfile';
import { PropTypes } from 'prop-types';

import Styles from './styles.m.css';

import moment from 'moment';

export default class Post extends Component {
    static propTypes = {
        comment: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
    };

    render() {
        const { comment, created } = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <img src = { context.avatar } />
                        <a>
                            {context.userFirstName} {context.userLastName}
                        </a>
                        <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                        <p>{comment}</p>
                    </section>
                )}
            </Consumer>
        );
    }
}
