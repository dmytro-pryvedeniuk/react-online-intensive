import React, { Component } from 'react';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { fromTo } from 'gsap';

import { withProfile } from '../HOC/withProfile';
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../../components/StatusBar';
import Spinner from '../../components/Spinner';
import Catcher from '../../components/Catcher';
import Postman from '../../components/Postman';
import Counter from '../../components/Counter';


import { api, TOKEN, GROUP_ID } from '../../config/api';
import { socket } from '../../socket/init';
import Styles from './styles.m.css';
import { delay } from '../../instruments';

@withProfile
export default class Feed extends Component {
    state = {
        isPostsFetching: false,
        posts: [],
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
                    posts: [createdPost, ...posts],
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

        socket.on('like', (postJSON) => {
            const { data: updatedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === updatedPost.id ? updatedPost : post),
                }));
            }
        });
    }

    componentWillUnmount() {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify({ comment }),
        });
        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
            isPostsFetching: false,
        }));
    };

    _likePost = async (id) => {
        this._setPostsFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });
        const { data: likedPost } = await response.json();

        this.setState(({ posts }) => ({
            posts: posts.map((post) => post.id === likedPost.id ? likedPost : post),
            isPostsFetching: false,
        }));
    };

    _deletePost = async (id) => {
        this._setPostsFetchingState(true);

        await fetch(`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ posts }) => ({
            posts: posts.filter((post) => post.id != id),
            isPostsFetching: false,
        }));
    };

    _animateComposerEnter(composer) {
        fromTo(composer, 1, { opacity: 0, rotationX: 50 }, { opacity: 1, rotationX: 0 });
    }

    _animatePostmanEnter(postman) {
        var widthPlusRight = 280;

        fromTo(
            postman,
            1,
            { x: widthPlusRight },
            {
                x: 0,
                onComplete: async () => {
                    await delay(4000);
                    fromTo(postman, 1, { x: 0 }, { x: widthPlusRight });
                },
            },
        );
    }

    render() {
        const { posts, isPostsFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <CSSTransition
                    classNames={{
                        enter: Styles.postInStart,
                        enterActive: Styles.postInEnd,
                        exit: Styles.postOutStart,
                        exitActive: Styles.postOutEnd,
                    }}
                    key={post.id}
                    timeout={{
                        enter: 500,
                        exit: 400,
                    }}>
                    <Catcher>
                        <Post
                            {...post}
                            _deletePost={this._deletePost}
                            _likePost={this._likePost}
                        />
                    </Catcher>
                </CSSTransition>
            );
        });

        return (
            <section className={Styles.feed}>
                <Spinner isSpinning={isPostsFetching} />
                <StatusBar />
                <Transition
                    appear
                    in
                    onEnter={this._animateComposerEnter}
                    timeout={1000}>
                    <Composer _createPost={this._createPost} />
                </Transition>
                <Counter count={postsJSX.length} />
                <TransitionGroup>{postsJSX}</TransitionGroup>
                <Transition
                    appear
                    in
                    onEnter={this._animatePostmanEnter}
                    timeout={1000}>
                    <Postman />
                </Transition>
            </section>
        );
    }
}
