import React from 'react';
import {render} from '@testing-library/react';
import AddProperty from '../../../../components/custom/assets/AddProperty';

test('render and snapshot', () => {
  let {container} = render(
    <div>
      <AddProperty />
    </div>
  );
  let inputs = container.querySelectorAll('input');

  expect(inputs.length).toEqual(9);
  expect(container).toMatchSnapshot();
});
