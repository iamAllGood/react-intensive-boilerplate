import React, { Component, createContext } from 'react';

const { Provider, Consumer } = createContext();

const withProfile = (Enhanced) =>
    class WithConsumer extends Component {
        render () {
            return (
                <Consumer>
                    { (context) => <Enhanced { ...context } { ...this.props } /> }
                </Consumer>
            );
        }
    };

export { Provider, Consumer, withProfile };
