import React, { Component } from 'react';
import { func, string } from 'prop-types';

import { withProfile } from '../HOC/withProfile';

import Styles from './styles.m.css';

export class Composer extends Component {
    static propTypes = {
        _createPost:          func.isRequired,
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
    };

    state = {
        comment: '',
    };

    _updateComment = (event) => {
        this.setState({
            comment: event.target.value,
        });
    };

    _handleFormSubmit = (event) => {
        event.preventDefault();
        this._submitComment();
    };

    _submitComment = () => {
        const { comment } = this.state;
        const { _createPost } = this.props;
        if (!comment) {
            return null;
        }

        _createPost(comment);

        this.setState({
            comment: '',
        });
    };

    _submitOnEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this._submitComment();
        }
    };

    render() {
        const { comment } = this.state;
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form onSubmit = { this._handleFormSubmit }>
                    <textarea
                        placeholder = { `What\'s on your mind, ${currentUserFirstName}?` }
                        value = { comment }
                        onChange = { this._updateComment }
                        onKeyPress = { this._submitOnEnter }
                    />
                    <input
                        type = 'submit'
                        value = 'Post'
                    />
                </form>
            </section>
        );
    }
}

export default withProfile(Composer);
