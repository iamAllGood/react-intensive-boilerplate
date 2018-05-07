// Core
import React, { Component } from "react";
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

import { socket } from "socket";

// Components
import { Consumer } from 'components/HOC/withProfiler';

export default class StatusBar extends Component {
     state = {
         online: false,
     };

    componentDidMount () {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });

        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    }

    render () {
        const { online } = this.state;
        // const {
        //     avatar,
        //     currentUserFirstName,
        //     currentUserLastName,
        // } = this.props;


        const statusStyle = cx(Styles.status, {
            [Styles.online]:  online,
            [Styles.offline]: !online,
        });

        const statusMessage = online ? 'Online' : 'Offline';

        return (
            <Consumer>
                {
                    ({
                        avatar,
                        currentUserFirstName,
                        currentUserLastName,
                    } = {}) => (
                        <section className = { Styles.statusBar }>
                            <div className = { statusStyle }>
                                <div>{ statusMessage }</div>
                                <span />
                            </div>
                            <button>
                                <img alt = 'avatar' src = { avatar } />
                                <span>{ currentUserFirstName }</span>
                                &nbsp;
                                <span>{ currentUserLastName }</span>
                            </button>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
