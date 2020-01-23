import React from 'react';
import render from '../../../../../__utils__/renderHelper';
import Profile from '../../../../../components/custom/profile/investor/Profile';

test('render and snapshot', () => {
  let {container} = render(() => (
    <div>
      <Profile />
    </div>
  ));
  let inputs = container.querySelectorAll('a');
  expect(inputs.length).toEqual(3);
  expect(container).toMatchSnapshot();
});
