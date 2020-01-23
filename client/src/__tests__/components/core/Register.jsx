import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Register from '../../../components/core/Register';
import render from '../../../__utils__/renderHelper';

test('it renders', () => {
  let setAlert = jest.fn();
  let register = jest.fn();
  let isAuthenticated = false;
  let {container} = render(() => (
    <Register
      setAlert={setAlert}
      register={register}
      isAuthenticated={isAuthenticated}
    />
  ));
  expect(container).not.toBeNull();
});
