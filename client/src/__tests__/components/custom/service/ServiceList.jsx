import React from 'react';
import render from '../../../../__utils__/renderHelper';
import ServiceList from '../../../../components/custom/service/ServiceList';

test('render and snapshot', () => {
  let {container} = render(() => <ServiceList />);
  expect(container).toMatchSnapshot();
});
