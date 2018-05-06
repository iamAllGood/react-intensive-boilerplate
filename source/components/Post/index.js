import React, { Component } from 'react';
import avatar from 'theme/assets/homer';
import moment from 'moment';
import Styles from './styles.m.css';

export class Post extends Component {
    render () {

        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className = { Styles.post }>
                <p><img alt = { currentUserLastName } src = { avatar } /></p>
                <a>{ currentUserFirstName } { currentUserLastName }</a>
                <p><time>{moment().format('MMMM D h:mm:ss a')}</time></p>
                <p>Time to tea { currentUserFirstName } { currentUserLastName }</p>
            </section>
        );
    }
}
