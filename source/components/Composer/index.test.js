import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Composer } from './';

configure({ adapter: new Adapter() });

const state = {
    comment: 'Hello',
};

const props = {
    createPost:           jest.fn(),
    avatar:               'some_url',
    currentUserFirstName: "iam",
};

const message = 'Cto-to';
const mutatedState = {
    comment: message,
};

const result    = mount(<Composer { ...props } />);
const spy       = jest.spyOn(Composer.prototype, 'render');

// global.fetch = jest.fn(() => Promise.resolve({
//     status: 200,
//     json:   jest.fn(() => Promise.resolve({ data: ['some fake data']})),
// }));

// global.fetch = Promise.resolve(() => ({
//     status: 200,
//     json:   jest.fn(() => Promise.resolve({ data: [] })),
// }));

console.log(result.debug());

describe('Composer component: ', () => {

    test(`Should have 1 'section' element`, () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test(`Should have 1 'form' element`, () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test(`Should have 1 'img' element`, () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test(`Should have 1 'textarea' element`, () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test(`Should have 1 'input' element`, () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test(`Should have a valid state`, () => {
        expect(result.state()).toEqual(state);
    });

    test(`textarea value be empty initialy`, () => {
        expect(result.find('textarea').text()).toBe(state.comment);
    });

    test(`Should respond to state change properly`, () => {
        result.setState(() => ({
            comment: message,
        }));

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toBe(message);

        result.setState(() => ({
            comment: 'Hello',
        }));

        expect(result.state()).toEqual(state);
        expect(result.find('textarea').text()).toBe(state.comment);
    });

    test(`component state and texterea value should reflect according changes`, () => {
        result.find('textarea').simulate('change', {
            target: {
                value: message,
            },
        });

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toBe(message);
    });

    test('component state and textarea value reflect according form submit', () => {
        result.find('form').simulate('submit');
        expect(result.state()).toEqual( { comment: '' } );
    });

    test('createPost method should be invoked once after form submitted', () => {
        console.log(spy.mock);
        expect(props.createPost.mock.calls).toHaveLength(1);
    });
});
