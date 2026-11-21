import React from 'react';
import {render, screen} from '@testing-library/react-native';
import App from '../App';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

it('renders the sign-up screen on launch', async () => {
  await render(<App />);
  expect(await screen.findByText('First name')).toBeTruthy();
});
