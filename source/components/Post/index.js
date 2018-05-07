import React, { Component } from 'react';
import moment from 'moment';
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfiler';
import Like from 'components/Like';

@withProfile
export class Post extends Component {

    constructor () {
        super();
        this.handleRemove = ::this._handleRemove;
}
    componentDidMount () {
        // console.log(this.props.id, 'componentDidMount');
    }

    componentWillMount () {
        // console.log(this.props.id, 'componentWillMount');
    }

    // shouldComponentUpdate (nextProps) {
    //     // if (nextProps.avatar == this.props.avatar
    //     //     && nextProps.comment == this.props.comment
    //     //     && nextProps.currentUserFirstName == this.props.currentUserFirstName
    //     //     && nextProps.currentUserLastName == this.props.currentUserLastName
    //     // ) {
    //     //     console.log(this.props);
    //     //     return false;
    //     // }
    //     //
    //     // return true;
    //     // console.log(JSON.stringify(nextProps), ' --> nextProps');
    //     // console.log(JSON.stringify(this.props), ' --> this.props');
    //
    //     if (JSON.stringify(nextProps) === JSON.stringify(this.props)) {
    //         return false;
    //     }
    //
    //     return true;
    //
    // }

    _handleRemove () {
        const { id, removedPost } = this.props;
        removedPost(id);
    }

    _getCross = () => {
        const {
            currentUserFirstName,
            currentUserLastName,
            firstName,
            lastName,
        } = this.props;

       // console.log(this.props);

        return (`${currentUserFirstName} ${currentUserLastName}` ===
        `${firstName} ${lastName}`
        ? <span onClick={ this.handleRemove } className = { Styles.cross } />
        : null)
    }

    render () {
        // console.log(this.props.id, ' ---> render');
        // undefined();
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
                { this._getCross() }
                <img alt = { avatar } src = { avatar } />
                <a>{`${ firstName } ${ lastName }`}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{ comment }</p>
                <Like
                    likePost    = { this.props.likePost }
                    id          = { this.props.id }
                    likes       = { this.props.likes }
                />
            </section>
        );
    }
}
