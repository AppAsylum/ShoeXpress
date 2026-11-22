import React from 'react';
import {render, screen} from '@testing-library/react-native';
import App from '../App';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

it('shows the welcome screen on first launch', async () => {
  await render(<App />);
  expect(await screen.findByText('Next')).toBeTruthy();
  expect(screen.getByText(/your best pair/)).toBeTruthy();
  // Branded launch screen is layered on top while it animates.
  expect(screen.getByText('Step into something new')).toBeTruthy();
});
