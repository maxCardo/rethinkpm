import '@testing-library/jest-dom/extend-expect';

test('renders to the dom', () => {
    let root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    require('../index.js');
    expect(root.childNodes).toBeTruthy();
});
