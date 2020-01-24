import Widget from '../../../../components/custom/dashboard/Widget';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';

test('reander and snapshot', () => {
  let {container} = render(<Widget />);
  expect(container).not.toBeNull();
  expect(container).toMatchSnapshot();
});
