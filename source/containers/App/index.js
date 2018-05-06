// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { Feed } from 'components/Feed';
import avatar from 'theme/assets/homer';
import { Provider } from "components/HOC/withProfiler";

const config = {
    avatar,
    currentUserFirstName: 'Denis',
    currentUserLastName:  'Grol',
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Provider value = { config }>
                <Feed { ...config } />
            </Provider>
        );
    }
}
