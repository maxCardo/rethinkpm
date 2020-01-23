import React from 'react';
import render from '../../../../__utils__/renderHelper';
import ServiceReq from '../../../../components/custom/service/ServiceReq';

test('render and snapshot', () => {
  let {container} = render(() => <ServiceReq />);
  expect(container).toMatchSnapshot();
});
