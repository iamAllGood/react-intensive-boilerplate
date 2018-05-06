import React, {Component} from 'react';
import {string} from 'prop-types';
import {getUniqueID} from 'instruments';
import {Composer} from 'components/Composer';
import {Post} from 'components/Post';
import Styles from './styles.m.css';
import StatusBar from 'components/StatusBar';

export class Feed extends Component {

    static propTypes = {
        avatar: string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName: string.isRequired,
    };

    constructor() {
        super();
        this.createPost = ::this._createPost;
    }

    state = {
        posts: [],
    }

    _createPost(comment) {
        if (!comment) return;
        this.setState(({posts}) => ({
            posts: [{id: getUniqueID(), comment}, ...posts],
        }));
    }

    render() {

        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        const {posts} = this.state;

        const renderPosts = posts.map(({id, comment}) =>
            (<Post
                avatar={avatar}
                comment={comment}
                currentUserFirstName={currentUserFirstName}
                currentUserLastName={currentUserLastName}
                key={id}
            />)
        );

        return (
            <section className={Styles.feed}>
                <StatusBar/>
                <Composer
                    avatar={avatar}
                    createPost={this.createPost}
                    currentUserFirstName={currentUserFirstName}
                />
                {renderPosts}
            </section>
        );
    }
}
