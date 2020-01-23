import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../../../components/core/Login';
import render from '../../../__utils__/renderHelper';

test('it renders', () => {
  let login = jest.fn();
  let loadUser = jest.fn();
  let isAuthenticated = false;
  let {container} = render(() => (
    <Login
      login={login}
      loadUser={loadUser}
      isAuthenticated={isAuthenticated}
    />
  ));
  expect(container).not.toBeNull();
});
