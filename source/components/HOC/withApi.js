import React, { Component } from "react";
import { socket } from "socket";
import { api, TOKEN, GROUP_ID } from 'config/api';

export const withApi = (Enchanced) =>

    class withApi extends Component {

        constructor () {

            super();

            this.fetchPosts     = ::this._fetchPosts;
            this.createPost     = ::this._createPost;
            this.removedPost    = ::this._removedPost;
            this.likePost       = ::this._likePost;
            //   this.isPostsFetching    = ::this.isPostsFetching;
        }

    state = {
        posts:           [],
        isPostsFetching: false,
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

        async _fetchPosts () {
            this._setPostFetchingState(true);
            try {
                const response = await fetch(api);

                if (response.status !== 200) {
                    throw new Error('fetch posts failed');
                }

                const { data } = await response.json();

                this.setState(({ posts }) => ({
                    posts: [...data, ...posts],
                }));

            } catch ({ message }) {
                console.error(message);
            } finally {
                this._setPostFetchingState(false);
            }
        }

        async _createPost (comment) {
            this._setPostFetchingState(true);
            try {
                const response = await fetch(api, {
                    method:  'POST',
                    headers: {
                        Authorization:  TOKEN,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ comment }),
                });

                if (response.status !== 200) {
                    throw new Error('create posts failed');
                }

                const { data } = await response.json();
                console.log(data);
                this.setState(({ posts }) => ({
                    posts: [data, ...posts],
                }));

            } catch ({ message }) {
                console.error(message);
            } finally {
                this._setPostFetchingState(false);
            }
        }

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

        render () {
            return (
                <Enchanced
                    { ...this.state }
                    { ...this.props }
                    createPost  = { this.createPost }
                    fetchPosts  = { this.fetchPosts }
                    removedPost = { this.removedPost }
                    likePost    = { this.likePost }
                    //   isPostsFetching = { this.isPostsFetching }
                />
            );
        }
    };
