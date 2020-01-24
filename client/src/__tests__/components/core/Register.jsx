import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Register from '../../../components/core/Register';
import render from '../../../__utils__/renderHelper';
import {useLocation} from 'react-router-dom';

test('renders and snapshots', () => {
  let setAlert = jest.fn();
  let register = jest.fn();
  let isAuthenticated = false;
  let location;
  let {container} = render(() => {
    location = useLocation();
    return (
      <Register
        setAlert={setAlert}
        register={register}
        isAuthenticated={isAuthenticated}
      />
    );
  });
  expect(container).not.toBeNull();
  expect(location.pathname).toEqual('/');
  expect(container).toMatchSnapshot();
});
