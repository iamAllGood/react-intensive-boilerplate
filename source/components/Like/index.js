import React, { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';

import { withProfile } from 'components/HOC/withProfiler';
import Styles from './styles.m.css';

@withProfile
export default class Like extends Component {
    static propTypes = {
        likePost:   func.isRequired,
        id:         string.isRequired,
        likes:      arrayOf(
            shape({
                firstName:  string.isRequired,
                lastName:   string.isRequired,
            })
        ).isRequired,
    };


    static defaultProps = {
        likes: [],
    }

    constructor () {
        super();
        this.showLikers             =::this._showLikers;
        this.hideLikers             =::this._hideLikers;
        this.likePost               =::this._likePost;
        this.getLikeByMe            =::this._getLikeByMe;
        this.getLikeStyle           =::this._getLikeStyle;
        this.getLikeList            =::this._getLikeList;
        this.getLikesDescription    =::this._getLikesDescription;
    }

    state = {
        showLikers: false,
    }

    _showLikers () {
        this.setState({
            showLikers: true,
        });
    }

    _hideLikers () {
        this.setState({
            showLikers: false,
        });
    }

    _likePost () {
        const { id, likePost } = this.props;
        likePost(id);
    }

    _getLikeByMe () {
        const {
            currentUserFirstName,
            currentUserLastName
        } = this.props;

        return this.props.likes
            .some(({ firstName, lastName }) =>
                `${ firstName } ${ lastName }`
                === `${ currentUserFirstName } ${ currentUserLastName }`
            );
    }

    _getLikeStyle () {
        const likedByMe = this._getLikeByMe();

        return likedByMe
            ? `${ Styles.icon } ${ Styles.liked }`
            : `${ Styles.icon }`;
    }

    _getLikeList () {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({ firstName, lastName, id }) => (
            <li key = { id }> {`${firstName}, ${lastName}`}</li>
        ))

        return showLikers && likes.length
            ? <ul> { likesJSX } </ul>
            : null;
    }

    _getLikesDescription () {
        const {
            likes,
            currentUserFirstName,
            currentUserLastName
        } = this.props;

        const likedByMe = this.getLikeByMe();

        if (likes.length === 1 && likedByMe) {
            return `${currentUserFirstName}, ${currentUserLastName}`;
        } else if (likes.length === 2 && likedByMe) {
            return `You and 1 other`;
        } else if (likedByMe) {
            return `You and ${likes.length - 1} others`;
        }

        return likes.length;
    }

    render () {
        const likers = this.getLikeList();
        const likeStyles = this.getLikeStyle();
        const likersDescription = this.getLikesDescription();

        return (
            <section className={ Styles.like}>
                <span
                    className={ likeStyles }
                    onClick={ this.likePost }>
                    Like
                </span>
                <div>
                    { likers }
                    <span
                        onMouseEnter = { this.showLikers }
                        onMouseLeave = { this.hideLikers }>
                        { likersDescription }
                    </span>
                </div>
            </section>
        );
    }
}