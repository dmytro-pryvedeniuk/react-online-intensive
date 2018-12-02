import React, { Component } from 'react';

import { withProfile } from '../HOC/withProfile';
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../../components/StatusBar';
import Spinner from '../../components/Spinner';
import Catcher from '../../components/Catcher';
import { api, TOKEN, GROUP_ID } from '../../config/api';
import { socket } from '../../socket/init';
import Styles from './styles.m.css';

@withProfile
export default class Feed extends Component {
    state = {
        isPostsFetching: false,
        posts:           [],
    };

    componentDidMount() {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();
        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [ createdPost, ...posts ],
                }));
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removedPost.id),
                }));
            }
        });
    }

    componentWillUnmount() {
        socket.removeListener('create');
        socket.removeListener('remove');
    }

    _setPostsFetchingState = (value) => {
        this.setState({
            isPostsFetching: value,
        });
    };

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isPostsFetching: false,
        });
    };

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ comment }),
        });
        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            posts:           [ post, ...posts ],
            isPostsFetching: false,
        }));
    };

    _likePost = async (id) => {
        this._setPostsFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method:  'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });
        const { data: likedPost } = await response.json();

        this.setState(({ posts }) => ({
            posts:           posts.map((post) => post.id === likedPost.id ? likedPost : post),
            isPostsFetching: false,
        }));
    };

    _deletePost = async (id) => {
        this._setPostsFetchingState(true);

        await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ posts }) => ({
            posts:           posts.filter((post) => post.id != id),
            isPostsFetching: false,
        }));
    };

    render() {
        const { posts, isPostsFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Catcher key = { post.id }>
                    <Post
                        { ...post }
                        _deletePost = { this._deletePost }
                        _likePost = { this._likePost }
                    />
                </Catcher>
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
