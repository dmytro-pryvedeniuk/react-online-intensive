import React, { Component } from 'react';
import avatar from 'theme/assets/homer';
import moment from 'moment';

export default class Post extends Component {
    render() {
        return (
            <section>
                <img src = { avatar } />
                <a>Homer Simpson</a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>Howdy?</p>
            </section>
        );
    }
}
