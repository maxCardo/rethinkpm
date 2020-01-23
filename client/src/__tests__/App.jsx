import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

it('renders welcome message', () => {
  const {container} = render(<App />);
  expect(container).toBeInTheDocument();
});
