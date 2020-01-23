import alert from '../../reducers/alert';
import {SET_ALERT, REMOVE_ALERT} from '../../actions/type';

test('Null type does not change state', () => {
    let result = alert([1, 2, 3, 4], {type: null});
    expect(result).toEqual([1, 2, 3, 4]);
});

test('SET_ALERT adds element', () => {
    let result = alert([1, 2, 3, 4], {type: SET_ALERT, payload: 5});
    expect(result).toEqual([1, 2, 3, 4, 5]);
});

test('REMOVE_ALERT removes element', () => {
    let result = alert([{id: 1}, {id: 2}, {id: 3}, {id: 4}], {
        type: REMOVE_ALERT,
        payload: 2,
    });
    expect(result).toEqual([{id: 1}, {id: 3}, {id: 4}]);
});
