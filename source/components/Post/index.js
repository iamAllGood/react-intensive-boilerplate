import React, { Component } from 'react';
import moment from 'moment';
import Styles from './styles.m.css';

export class Post extends Component {

    componentDidMount () {
        // console.log(this.props.id, 'componentDidMount');
    }

    componentWillMount () {
        // console.log(this.props.id, 'componentWillMount');
    }

    shouldComponentUpdate (nextProps) {
        // if (nextProps.avatar == this.props.avatar
        //     && nextProps.comment == this.props.comment
        //     && nextProps.currentUserFirstName == this.props.currentUserFirstName
        //     && nextProps.currentUserLastName == this.props.currentUserLastName
        // ) {
        //     console.log(this.props);
        //     return false;
        // }
        //
        // return true;
        // console.log(JSON.stringify(nextProps), ' --> nextProps');
        // console.log(JSON.stringify(this.props), ' --> this.props');

        if (JSON.stringify(nextProps) === JSON.stringify(this.props)) {
            return false;
        }

        return true;

    }

    render () {
        // console.log(this.props.id, ' ---> render');
        //   undefined();
        const {
            avatar,
            comment,
            currentUserFirstName,
            currentUserLastName,
            created,
            firstName,
            lastName,
        } = this.props;

        return (
            <section className = { Styles.post }>
                <img alt = { avatar } src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
            </section>
        );
    }
}
