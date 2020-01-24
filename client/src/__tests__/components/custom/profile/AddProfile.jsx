import React from 'react';
import {render} from '@testing-library/react';
import AddProfile from '../../../../components/custom/profile/AddProfile';

test('render and snapshot', () => {
  let {container} = render(<AddProfile />);
  let inputs = container.querySelectorAll('input');
  expect(inputs.length).toEqual(7);
  expect(container).toMatchSnapshot();
});
