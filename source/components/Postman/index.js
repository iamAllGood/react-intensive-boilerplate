import React, { Component } from 'react';
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfiler';

@withProfile
export class Postman extends Component {

    render() {

        const {
            avatar,
            comment4U,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className={Styles.postman}>
                <img alt={avatar} src={avatar}/>
                <a>{`${ currentUserFirstName } ${ currentUserLastName }`}</a>
                <p>{comment4U}</p>
            </section>
        );
    }
}