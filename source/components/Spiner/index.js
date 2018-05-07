import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Styles from './styles.m.css';

const portal = document.getElementById('spinner');


export default class Spiner extends Component {
    render () {
        const { isSpinning } = this.props;
        const component = isSpinning
            ? <div className = { Styles.spinner } />
            : null;

        return createPortal(component, portal);
    }
}