import React, {Component} from 'react';
import moment from 'moment';
import Styles from './styles.m.css';

export class Post extends Component {
    render() {

        const {
            avatar,
            comment,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className={Styles.post}>
                <img alt={currentUserLastName} src={avatar}/>
                <a>{currentUserFirstName} {currentUserLastName}</a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
            </section>
        );
    }
}
