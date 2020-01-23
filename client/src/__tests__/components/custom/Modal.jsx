import React from 'react';
import render from '../../../__utils__/renderHelper';
import Modal from '../../../components/custom/Modal';

test('render and snapshot', () => {
  let {container} = render(() => <Modal />);
  expect(container).toMatchSnapshot();
});
