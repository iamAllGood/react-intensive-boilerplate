import React, { Component } from 'react';
import { string } from 'prop-types';
import { Composer } from 'components/Composer';
import { Post } from 'components/Post';
import Styles from './styles.m.css';

export class Feed extends Component {

    static propsTypes = {
        avatar:               string.isRequire,
        currentUserFirstName: string.isRequire,
        currentUserLastName:  string.isRequire,
    };

    render () {

        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className = { Styles.feed }>
                <Composer
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                />
                <Post
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                    currentUserLastName = { currentUserLastName }
                />
            </section>
        );
    }
}
