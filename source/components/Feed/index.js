import React, { Component } from 'react';
import { string } from 'prop-types';
import { getUniqueID } from 'instruments';
import { Composer } from 'components/Composer';
import { Post } from 'components/Post';
import Styles from './styles.m.css';
import StatusBar from 'components/StatusBar';
import Catcher from 'components/Catcher';
import CountsPosts from 'components/CountsPosts';
import { api, TOKEN } from 'config/api';

export class Feed extends Component {

    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    };

    constructor () {
        super();
        this.createPost = ::this._createPost;
        this.fetchPosts = :: this._fetchPosts;
    }

    state = {
        posts: [],
    }

    componentDidMount () {
        this.fetchPosts();
    }



    _fetchPosts () {
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
            })
            .catch(({ message }) => {
                console.error(message);
            });
    }

    _createPost (comment) {
        fetch(api, {
            method: 'POST',
            headers: {
                Authorization: TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment})
        })
            .then((response) => {
                if (response.status != 200) {
                    throw new Error('create post failed!');
                }
                return response.json();
            })
            .then(({ data }) => {
                this.setState(({posts}) => ({
                    posts: [data, ...posts],
                }));
            })
            .catch(({ message }) => {
                console.error(message);
            });
        }

        // if (!comment) {
        //     return;
        // }
        // this.setState(({ posts }) => ({
        //     posts: [{ id: getUniqueID(), comment }, ...posts],
        // }));


    render () {

        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        const { posts } = this.state;

        const renderPosts = posts.map((post) =>

            (<Catcher key = { post.id }>
                <Post
                    {...post}
                />
            </Catcher>)
        );

        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer
                    avatar = { avatar }
                    createPost = { this.createPost }
                    currentUserFirstName = { currentUserFirstName }
                />
                <CountsPosts
                    countsPosts = { posts.length }
                    userName = { `${currentUserFirstName} ${currentUserLastName}` }
                />
                {renderPosts}
            </section>
        );
    }
}
