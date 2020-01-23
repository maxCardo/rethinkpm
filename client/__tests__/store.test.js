import store from '../store';
import '@testing-library/jest-dom/extend-expect';

test('exists', () => {
    expect(store).not.toBeNull();
});
