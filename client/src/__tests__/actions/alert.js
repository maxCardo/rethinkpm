import {setAlert} from '../../actions/alert';
import {SET_ALERT, REMOVE_ALERT} from '../../actions/type';
import {wait} from '@testing-library/react';

test('setAlert is a function', () => {
    expect(typeof setAlert).toEqual('function');
});

test('setAlert returns a function', () => {
    let impl = setAlert();
    expect(typeof impl).toEqual('function');
});

test('setAlert instance calls dispatch immediatly', () => {
    let dispatch = jest.fn();
    let impl = setAlert('test', 'test');
    impl(dispatch);
    expect(dispatch).toHaveBeenCalled();
});

test('setAlert instance calls dispatch after custom timeOut', async () => {
    let dispatch = jest.fn();
    let impl = setAlert('test', 'test', 300);
    impl(dispatch);
    setTimeout(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
    }, 500);
});
