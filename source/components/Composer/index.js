import React, {Component} from 'react';
import Styles from './styles.m.css';
import {Consumer} from 'components/HOC/withProfiler';
import {func} from 'prop-types';

export class Composer extends Component {

    state = {
        comment: 'Hello',
    };

    _generateDontCopy = (event) => {
        return event.preventDefault();
    }

    _generateEnterPost = (event) => {
        if (event.keyCode == 13)
        this.handleSubmit(event);
    }

    static propTypes = {
        createPost: func.isRequired,
    }

    constructor() {
        super();
        this.handleTextAreachange = this._handleTextAreachange.bind(this);
        this.handleSubmit = ::this._handleSubmit;
    }

    _handleTextAreachange(e) {
        const {value} = e.target;
        this.setState({
            comment: value,
        })
    }

    _handleSubmit(e) {

        e.preventDefault();
        const {comment} = this.state;
        const {createPost} = this.props;

        createPost(comment);
        this.setState({
            comment: '',
        })
    }

    render() {

        const {comment} = this.state;

        return (
            <Consumer>
                {
                    ({avatar, currentUserFirstName}) => (
                        <section className={Styles.composer}>
                            <form onSubmit={this.handleSubmit}>
                                <img alt='homer' src={avatar}/>
                                <textarea
                                    onCopy={ this._generateDontCopy}
                                    onKeyDown={this._generateEnterPost}
                                    placeholder={`What's in your mind, ${currentUserFirstName}`}
                                    value={comment}
                                    onChange={this.handleTextAreachange}
                                />
                                <input type='submit' value='Post'/>
                            </form>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
