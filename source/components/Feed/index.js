import React, { Component } from 'react';
import Composer from '../Composer';
import Post from '../Post';

export default class Feed extends Component {
    render() {
        return (
            <section>
                <Composer />
                <Post />
            </section>
        );
    }
}
