import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';

const comment = 'Hello';
const avatar = './homer.png';

const initialState = {
    comment: '',
}

const updatedState = {
    comment: comment,
}

const props = {
    _createPost: jest.fn(),
    avatar: avatar,
    currentUserFirstName: 'Homer'
}

const result = mount(<Composer {...props} />);
const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');

describe('Composer component:', () => {
    test('should have 1 "section" element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 "form" element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 "textarea" element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have 1 "img" element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('should have 1 "input" element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('textarea should respond to text change properly', () => {
        result.setState({
            comment,
        });

        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({
            comment: '',
        });

        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea "change" event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment
            }
        });

        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedState);
    });

    test('should handle form "submit" event', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(initialState);
    });

    test('_createPost should be called when submitting form', () => {
        result.find('form').simulate('submit', { preventDefault: jest.fn() });
        
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit class methods should be called when submitting form', () => {
        _submitCommentSpy.mockClear();
        _handleFormSubmitSpy.mockClear();

        result.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });

    test('textarea should contain firstname in the placeholder', () => {
        expect(result.find('textarea').prop('placeholder')).toBe(`What\'s on your mind, Homer?`)
    });

    test('textarea should have avatar used in "img"', () => {
        expect(result.find('img').prop('src')).toBe(avatar);
    });

    test('updateComment should change comment in state', () => {
        const event = {
            target: {
                value: '42'
            }
        };

        result.instance()._updateComment(event);

        expect(result.state('comment')).toBe('42');
    });

    test('should submit when pressing "Enter"', () => {
        _submitCommentSpy.mockClear();

        const event = {
            key: 'Enter',
            preventDefault: jest.fn(),
        };
        result.instance()._submitOnEnter(event);

        expect(_submitCommentSpy).toBeCalledTimes(1);
        expect(event.preventDefault).toBeCalledTimes(1);
    });

    test('should not submit when anything else except "Enter" is pressed', () => {
        _submitCommentSpy.mockClear();

        const event = {
            key: 'Escape',
            preventDefault: jest.fn(),
        };

        result.instance()._submitOnEnter(event);

        expect(_submitCommentSpy).not.toHaveBeenCalled();
    });

    test('should correspond to snapshot', () => {
        expect(result.html()).toMatchSnapshot();
    });
});