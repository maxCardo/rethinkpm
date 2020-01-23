import React from 'react';
import render from '../../../../__utils__/renderHelper';
import ServiceTicket from '../../../../components/custom/service/ServiceTicket';

test('render and snapshot', () => {
  let {container} = render(() => <ServiceTicket />);
  expect(container).toMatchSnapshot();
});
