import React, { Component } from 'react';
import Styles from './styles.m.css';
import { Consumer } from 'components/HOC/withProfiler';

export class Composer extends Component {
    render () {
        return (
            <Consumer>
                {
                    ({ avatar, currentUserFirstName }) => (
                        <section className = { Styles.composer }>
                            <img alt = 'homer' src = { avatar } />
                            <textarea
                                placeholder = { `What's in your mind, ${currentUserFirstName}` }
                            />
                            <input type = 'submit' value = 'Post' />
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
