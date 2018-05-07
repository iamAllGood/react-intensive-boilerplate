import React, { Component } from 'react';
import { string } from 'prop-types';
import { getUniqueID } from 'instruments';
import Composer from 'components/Composer';
import { Post } from 'components/Post';
import Styles from './styles.m.css';
import StatusBar from 'components/StatusBar';
import Catcher from 'components/Catcher';
import CountsPosts from 'components/CountsPosts';
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from "socket";
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import Spiner from 'components/Spiner';
import { fromTo } from 'gsap';

export class Feed extends Component {

    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    };

    constructor () {
        super();
        this.createPost = ::this._createPost;
        this.fetchPosts = ::this._fetchPosts;
        this.removedPost = ::this._removedPost;
        this.likePost = ::this._likePost;
    }

    state = {
        posts: [],
    }

    componentDidMount () {
        const {
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        this.fetchPosts();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);
            //    console.log(createdPost);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !=
                `${meta.authorFirstName} ${meta.authorLastName}`

            ) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts],
                }));
            }

            socket.on('remove', (postJSON) => {
                const { data: { id }, meta } = JSON.parse(postJSON);
                //       console.log(createdPost);

                if (
                    `${currentUserFirstName} ${currentUserLastName}` !=
                    `${meta.authorFirstName} ${meta.authorLastName}`

                ) {
                    this.setState(({ posts }) => ({
                        posts: posts.filter((post) => post.id !== id),
                    }));
                }
            });
        });

        socket.on('like', (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === likedPost.id ? likedPost : post),
                }));
            }
        });
    }

    _setPostFetchingState = (state) => {
        this.setState(() => ({
            isPostsFetching: state,
        }));
    }

    _fetchPosts () {
        this._setPostFetchingState(true);
        fetch(api)
            .then((response) => {
                if (response.status != 200) {
                    throw new Error('fetch post failed!');
                }

                return response.json();
            })
            .then(({ data }) => {
                console.log(data);
                this.setState(({ posts }) => ({
                    posts: [...data, ...posts],
                }));

                this._setPostFetchingState(false)
            })
            .catch(({ message }) => {
                console.error(message);
                this._setPostFetchingState(false)
            });
    }

    _createPost (comment) {
        this._setPostFetchingState(true)
        fetch(api, {
            method:  'POST',
            headers: {
                Authorization:  TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment }),
        })
            .then((response) => {
                if (response.status != 200) {
                    throw new Error('create post failed!');
                }

                return response.json();
            })
            .then(({ data }) => {
                this.setState(({ posts }) => ({
                    posts: [data, ...posts],
                }));

                this._setPostFetchingState(false);
            })
            .catch(({ message }) => {
                console.error(message);

                this._setPostFetchingState(false);
            });
    }


    // if (!comment) {
    //     return;
    // }
    // this.setState(({ posts }) => ({
    //     posts: [{ id: getUniqueID(), comment }, ...posts],
    // }));

    async _removedPost (id) {
        try {
            const response = await fetch(`${api}/${id}`, {
                method:  'DELETE',
                headers: { Authorization: TOKEN },
            });


            if (response.status !== 204) {
                throw new Error('Deleted post error!');
            }

            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post.id !== id),
            }));
        } catch ({ message }) {
            console.error(message);
        }
    }

    async _likePost (id) {
        try {
            const response = await fetch(`${api}/${id}`, {
                method:  'PUT',
                headers: { Authorization: TOKEN },
            });

            //
            if (response.status !== 200) {
                throw new Error('Liked post error!');
            }

            const { data } = await response.json();

            this.setState(({ posts }) => ({
                posts: posts.map((post) => post.id === id ? data : post),
            }));
        } catch ({ message }) {
            console.error(message);
        }
    }

    _handleComposerApper = (composer) => {
        fromTo(composer, 1, { opacity: 0}, { opacity: 1});
    }

    _handleCounterApper = (counter) => {
        fromTo(counter, 1, { x: 400,  opacity: 1}, { x: 0,  opacity: 1});
    }

    render () {


        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        const { posts } = this.state;
        const { isPostsFetching } = this.state;

        const renderPosts = posts.map((post) =>

            (<CSSTransition
                classNames = { {
                    enter:          Styles.postInStart,
                    enterActive:    Styles.postInEnd,
                    exit:           Styles.postOutStart,
                    exitActive:     Styles.postOutEnd,
                } }
                key = { post.id }
                timeout = { { enter: 500, exit: 400 } }>
                <Catcher>
                    <Post
                        { ...post }
                        currentUserFirstName = { currentUserFirstName }
                        currentUserLastName = { currentUserLastName }
                        likePost = { this.likePost }
                        removedPost = { this.removedPost }
                    />
                </Catcher>
            </CSSTransition>
            )
        );

        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Spiner isSpinning = { isPostsFetching }/>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._handleComposerApper } >
                <Composer
                    avatar = { avatar }
                    createPost = { this.createPost }
                    currentUserFirstName = { currentUserFirstName }
                />
                </Transition>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._handleCounterApper } >
                <CountsPosts
                    countsPosts = { posts.length }
                    userName = { `${currentUserFirstName} ${currentUserLastName}` }
                />
                </Transition>
                <TransitionGroup>
                    {renderPosts}
                </TransitionGroup>
            </section>
        );
    }
}
