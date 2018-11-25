import React, { Component } from 'react';
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../../components/StatusBar';
import Spinner from '../../components/Spinner';

import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            { id: 123, comment: 'Hello', created: 1543142470 },
            { id: 124, comment: 'It\'s me', created: 1543142450 },
        ],
    };

    render() {
        const { posts } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning />
                <StatusBar />
                <Composer />
                {postsJSX}
            </section>
        );
    }
}
