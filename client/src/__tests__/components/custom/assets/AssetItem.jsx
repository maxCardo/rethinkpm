import React from 'react';
import {render} from '@testing-library/react';
import AssetItem from '../../../../components/custom/assets/AssetItem';

test('render and snapshot', () => {
  let {container} = render(<AssetItem />);
  expect(container).toMatchSnapshot();
});
