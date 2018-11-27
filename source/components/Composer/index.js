import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Consumer } from '../HOC/withProfile';

import Styles from './styles.m.css';

export default class Composer extends Component {
    static propTypes = {
        _createPost: PropTypes.func.isRequired,
    };

    constructor() {
        super();

        this._updateComment = this._updateComment.bind(this);
        this._submitComment = this._submitComment.bind(this);
        this._handleOnKeyPress = this._handleOnKeyPress.bind(this);
        this._handleOnSubmit = this._handleOnSubmit.bind(this);
    }

    state = {
        comment: '',
    };

    _updateComment(event) {
        this.setState({
            comment: event.target.value,
        });
    }

    _handleOnSubmit(event) {
        event.preventDefault();
        this._submitComment();
    }

    _submitComment() {
        const { comment } = this.state;

        if (!comment) {
            return null;
        }

        this.props._createPost(comment);

        this.setState({
            comment: '',
        });
    }

    _handleOnKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this._submitComment();
        }
    }

    render() {
        const { comment } = this.state;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.composer }>
                        <img src = { context.avatar } />
                        <form onSubmit = { this._handleOnSubmit }>
                            <textarea
                                placeholder = { `What\'s on your mind, ${context.userFirstName}?` }
                                value = { comment }
                                onChange = { this._updateComment }
                                onKeyPress = { this._handleOnKeyPress }
                            />
                            <input
                                type = 'submit'
                                value = 'Post'
                            />
                        </form>
                    </section>
                )}
            </Consumer>
        );
    }
}
