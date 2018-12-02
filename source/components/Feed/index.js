import React, { Component } from 'react';
import moment from 'moment';

import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../../components/StatusBar';
import Spinner from '../../components/Spinner';

import Styles from './styles.m.css';
import { getUniqueID, delay } from '../../instruments';

export default class Feed extends Component {
    constructor() {
        super();
        this._createPost = this._createPost.bind(this);
        this._setPostsFetchingState = this._setPostsFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);
        this._deletePost = this._deletePost.bind(this);
    }

    state = {
        isPostsFetching: false,
        posts:           [
            { id: '123', comment: 'Hello', created: 1543142470, likes: [] },
            { id: '124', comment: 'It\'s me', created: 1543142450, likes: [] },
        ],
    };

    _setPostsFetchingState(value) {
        this.setState({
            isPostsFetching: value,
        });
    }

    async _createPost(comment) {
        this._setPostsFetchingState(true);

        const post = {
            id:      getUniqueID(),
            created: moment().unix(),
            comment,
            likes:   [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts: [ post, ...posts ],
        }));
        this._setPostsFetchingState(false);
    }

    async _likePost(id) {
        const { currentUserFirstName, currentUserLastName } = this.props;
        const { posts } = this.state;
        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:           newPosts,
            isPostsFetching: false,
        });
    }

    async _deletePost(id) {
        const { posts } = this.state;

        this._setPostsFetchingState(true);

        await delay(600);

        const newPosts = posts.filter((post) => post.id !== id);
        this.setState({
            posts:           newPosts,
            isPostsFetching: false,
        });
    }

    render() {
        const { posts, isPostsFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                    _deletePost = { this._deletePost }
                    _likePost = { this._likePost }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostsFetching } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}
